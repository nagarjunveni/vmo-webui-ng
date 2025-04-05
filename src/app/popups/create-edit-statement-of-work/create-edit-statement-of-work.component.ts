import { CommonModule } from '@angular/common';
import {
  Component,
  NO_ERRORS_SCHEMA,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { StatementOfWork } from '../../models/statement-of-work.model';
import { AuthorizedSignature } from '../../models/authorized-signature.model';
import { LineManager, LineManagerType } from '../../models/line-manager.model';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthorizedSignatureService } from '../../services/authorized-signature.service';
import { WorkOrdersService } from '../../services/work-orders.service';
import { LineManagerService } from '../../services/line-manager.service';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { Position } from '../../models/position.model';
import { PositionService } from '../../services/position.service';
import {
  StatementOfWorkPosition,
  PositionType,
} from '../../models/statement-of-work-position.model';
import { ActivitiesAndDeliverables } from '../../models/activities-and-deliverables.model';
import { Milepost } from '../../models/milepost.model';

interface DropdownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-create-edit-statement-of-work',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    DatePickerModule,
    SelectModule,
    ToastModule,
    TableModule,
    CheckboxModule,
  ],
  providers: [MessageService],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './create-edit-statement-of-work.component.html',
  styleUrl: './create-edit-statement-of-work.component.scss',
})
export class CreateEditStatementOfWorkComponent implements OnInit {
  StatementOfWorkForm!: FormGroup;
  isEditMode = false;
  loading = false;
  statementOfWork?: StatementOfWork;
  authorizedSignaturesOptions = signal<AuthorizedSignature[]>([]);
  lineManagersOptions = signal<LineManager[]>([]);
  csxEscalationManagersOptions = signal<LineManager[]>([]);
  compnovaEscalationManagersOptions = signal<LineManager[]>([]);
  positionsOptions = signal<Position[]>([]);
  sowPositions: StatementOfWorkPosition[] = [];

  // Dropdown options
  typeOptions: DropdownOption[] = [
    { label: 'Fixed Bid', value: 'FIXED_BID' },
    { label: 'Time & Material', value: 'TIME_MATERIAL' },
  ];

  projectStateOptions: DropdownOption[] = [
    { label: 'New', value: 'NEW' },
    { label: 'Approved', value: 'APPROVED' },
    { label: 'Rejected', value: 'REJECTED' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Cancelled', value: 'CANCELLED' },
  ];

  positionTypeOptions = [
    { label: 'Onsite', value: PositionType.ONSITE },
    { label: 'Offshore', value: PositionType.OFFSHORE },
  ];

  // Dropdown configuration
  overlayAppendTo = 'body'; // Append dropdown overlay to body to avoid positioning issues

  private formBuilder: FormBuilder = inject(FormBuilder);
  private workOrdersService = inject(WorkOrdersService);
  private authorizedSignatureService = inject(AuthorizedSignatureService);
  private lineManagerService = inject(LineManagerService);
  private positionService = inject(PositionService);
  private messageService = inject(MessageService);
  private dialogRef = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit() {
    this.initForm();
    this.loadAuthorizedSignatures();
    this.loadLineManagers();
    this.loadPositions();

    if (this.config.data) {
      debugger
      this.isEditMode = this.config.data.mode === 'edit';

      if (this.isEditMode && this.config.data.statementOfWork) {
        this.workOrdersService
          .getWorkOrderById(this.config.data.statementOfWork.id!)
          .subscribe((data) => {
            this.statementOfWork = data;
            this.populateForm(this.statementOfWork);
          });
      }
    }
  }

  initForm() {
    this.StatementOfWorkForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      type: ['', Validators.required],
      projectState: ['', Validators.required],
      fixedBidAmount: ['', Validators.required],
      lineManagerId: ['', Validators.required],
      escalationManagerId: ['', Validators.required],
      compnovaEscalationManagerId: ['', Validators.required],
      authorizedSignatureId: ['', Validators.required],
      projectScope: ['', Validators.required],
      teamsAndConditions: ['', Validators.required],
      assumptionsAndDependencies: ['', Validators.required],
      positions: this.formBuilder.array([]),
      mileposts: this.formBuilder.array([]),
      activities: this.formBuilder.array([]),
    });
  }

  // Getter for positions FormArray
  get positions(): FormArray {
    return this.StatementOfWorkForm.get('positions') as FormArray;
  }

  get mileposts(): FormArray {
    return this.StatementOfWorkForm.get('mileposts') as FormArray;
  }

  get activities(): FormArray {
    return this.StatementOfWorkForm.get('activities') as FormArray;
  }

  addPosition(position: StatementOfWorkPosition | null = null) {
    const positionForm = this.formBuilder.group({
      id: [position ? position.id : null],
      positionId: [position ? position.positionId : '', Validators.required],
      type: [position ? position.type : '', Validators.required],
      status: [true],
    });
    this.positions.push(positionForm);
  }

  removePosition(index: number) {
    const position = this.positions.at(index);
    if (position) {
      if (position.value.id) {
        position.patchValue({ status: false });
      } else {
        this.positions.removeAt(index);
      }
    }
  }

  addMilepost(milepost: Milepost | null = null) {
    const milepostForm = this.formBuilder.group({
      id: [milepost ? milepost.id : null],
      name: [milepost ? milepost.name : '', Validators.required],
      description: [milepost ? milepost.description : '', Validators.required],
      dueDate: [milepost ? milepost.dueDate : '', Validators.required],
      amount: [milepost ? milepost.amount : 0, [Validators.required, Validators.min(0)]],
      status: [true],
    });
    this.mileposts.push(milepostForm);
  }

  removeMilepost(index: number) {
    const milepost = this.mileposts.at(index);
    if (milepost) {
      if (milepost.value.id) {
        milepost.patchValue({ status: false });
      } else {
        this.mileposts.removeAt(index);
      }
    }
  }

  addActivity(activity: ActivitiesAndDeliverables | null = null) {
    const activityForm = this.formBuilder.group({
      id: [activity ? activity.id : null],
      name: [activity ? activity.name : '', Validators.required],
      phase: [activity ? activity.phase : '', Validators.required],
      deliverable: [activity ? activity.deliverable : '', Validators.required],
      startDate: [activity ? activity.startDate : '', Validators.required],
      endDate: [activity ? activity.endDate : '', Validators.required],
      status: [true],
    });
    this.activities.push(activityForm);
  }

  removeActivity(index: number) {
    const activity = this.activities.at(index);
    if (activity) {
      if (activity.value.id) {
        activity.patchValue({ status: false });
      } else {
        this.activities.removeAt(index);
      }
    }
  }

  populateForm(statementOfWork: StatementOfWork) {
    this.StatementOfWorkForm.patchValue({
      name: statementOfWork.name,
      description: statementOfWork.description,
      startDate: new Date(statementOfWork.startDate),
      endDate: new Date(statementOfWork.endDate),
      type: statementOfWork.type,
      projectScope: statementOfWork.projectScope,
      teamsAndConditions: statementOfWork.teamsAndConditions,
      assumptionsAndDependencies: statementOfWork.assumptionsAndDependencies,
      projectState: statementOfWork.projectState,
      fixedBidAmount: statementOfWork.fixedBidAmount,
      lineManagerId: statementOfWork.lineManager?.id,
      escalationManagerId: statementOfWork.csxEscalationManager?.id,
      compnovaEscalationManagerId:
        statementOfWork.compnovaEscalationManager?.id,
      authorizedSignatureId: statementOfWork.authorizedSignature?.id,
      positions: [],
      mileposts: [],
      activities: [],
    });

    // Populate Positions
    this.positions.clear();
    statementOfWork.positions?.forEach((sowPosition) => {
      this.addPosition(sowPosition);
    })

    this.mileposts.clear();
    statementOfWork.mileposts?.forEach((milepost) => {
      this.addMilepost(milepost);
    })

    this.activities.clear();
    statementOfWork.activities?.forEach((activity) => {
      this.addActivity(activity);
    })

  }

  loadAuthorizedSignatures() {
    this.authorizedSignatureService.getAllSignatures().subscribe(
      (authorizedSignatures: AuthorizedSignature[]) => {
        this.authorizedSignaturesOptions.set(authorizedSignatures);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load authorized signatures.',
        });
      }
    );
  }

  loadLineManagers() {
    this.lineManagerService.getAllLineManagers().subscribe(
      (lineManagers: LineManager[]) => {
        // Filter line managers by type
        const csxLineManagers = lineManagers.filter(
          (lm) => lm.type === LineManagerType.CSX_LINE_MANAGER
        );
        const csxEscalationManagers = lineManagers.filter(
          (lm) => lm.type === LineManagerType.CSX_ESCALATION_MANAGER
        );
        const compnovaEscalationManagers = lineManagers.filter(
          (lm) => lm.type === LineManagerType.COMPNOVA_ESCALATION_MANAGER
        );

        this.lineManagersOptions.set(csxLineManagers);
        this.csxEscalationManagersOptions.set(csxEscalationManagers);
        this.compnovaEscalationManagersOptions.set(compnovaEscalationManagers);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load line managers.',
        });
      }
    );
  }

  loadPositions() {
    this.positionService.getAllPositions().subscribe(
      (positions: Position[]) => {
        // Filter only active positions
        const activePositions = positions.filter((p) => p.status !== false);
        this.positionsOptions.set(activePositions);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load positions.',
        });
      }
    );
  }

  getPositionTitle(positionId: number): string {
    const position = this.positionsOptions().find((p) => p.id === positionId);
    return position ? position.title : 'Unknown Position';
  }

  onSubmit() {
    if (this.StatementOfWorkForm.invalid) {
      this.StatementOfWorkForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formData = this.StatementOfWorkForm.value;

    // Format dates to YYYY-MM-DD
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const positionsData = this.positions.value.map((position: any) => {
      return {
        id: position.id || null,
        positionId: position.positionId,
        type: position.type,
        status: position.status,
      } as StatementOfWorkPosition;
    });

    // Convert form data to StatementOfWork object
    const statementOfWorkData: StatementOfWork = {
      name: formData.name,
      description: formData.description,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
      type: formData.type,
      projectState: formData.projectState,
      projectScope: formData.projectScope,
      assumptionsAndDependencies: formData.assumptionsAndDependencies,
      teamsAndConditions: formData.teamsAndConditions,
      fixedBidAmount: formData.fixedBidAmount,
      lineManagerId: formData.lineManagerId,
      csxEscalationManagerId: formData.escalationManagerId,
      compnovaEscalationManagerId: formData.compnovaEscalationManagerId,
      authorizedSignatureId: formData.authorizedSignatureId,
      positions: formData.positions, // Positions will be handled separately
      mileposts: formData.mileposts.map((milepost) => {
        return { ...milepost, dueDate: formatDate(new Date(milepost.dueDate)) };
      }),
      activities: formData.activities.map((activity) => {
        return {
          ...activity,
          startDate: formatDate(new Date(activity.startDate)),
          endDate: formatDate(new Date(activity.endDate)),
        };
      }),
    };

    if (this.isEditMode && this.statementOfWork?.id) {
      this.workOrdersService
        .updateWorkOrder(this.statementOfWork.id, statementOfWorkData)
        .subscribe({
          next: (result) => {
            this.completeOperation();
          },
          error: (error) => {
            this.loading = false;
            console.error('Error updating statement of work', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update statement of work.',
            });
          },
        });
    } else {
      this.workOrdersService.createWorkOrder(statementOfWorkData).subscribe({
        next: (result) => {
          this.completeOperation();
        },
        error: (error) => {
          this.loading = false;
          console.error('Error creating statement of work', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create statement of work.',
          });
        },
      });
    }
  }

  completeOperation() {
    this.loading = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Statement of Work ${
        this.isEditMode ? 'updated' : 'created'
      } successfully.`,
    });
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
