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
import { StatementOfWorkPositionService } from '../../services/statement-of-work-position.service';

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
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Pending Approval', value: 'PENDING_APPROVAL' },
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
  private sowPositionService = inject(StatementOfWorkPositionService);
  private messageService = inject(MessageService);
  private dialogRef = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit() {
    this.initForm();
    this.loadAuthorizedSignatures();
    this.loadLineManagers();
    this.loadPositions();

    if (this.config.data) {
      this.isEditMode = this.config.data.mode === 'edit';

      if (this.isEditMode && this.config.data.statementOfWork) {
        this.statementOfWork = this.config.data.statementOfWork;
        this.populateForm(this.statementOfWork);
        this.loadStatementOfWorkPositions(this.statementOfWork.id!);
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
      positions: this.formBuilder.array([]),
    });
  }

  // Getter for positions FormArray
  get positions(): FormArray {
    return this.StatementOfWorkForm.get('positions') as FormArray;
  }

  // Add a new position to the FormArray
  addPosition() {
    const positionForm = this.formBuilder.group({
      id: [null],
      positionId: ['', Validators.required],
      type: [PositionType.ONSITE, Validators.required],
      status: [true],
    });
    this.positions.push(positionForm);
  }

  // Remove a position from the FormArray
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

  populateForm(statementOfWork: StatementOfWork) {
    this.StatementOfWorkForm.patchValue({
      name: statementOfWork.name,
      description: statementOfWork.description,
      startDate: new Date(statementOfWork.startDate),
      endDate: new Date(statementOfWork.endDate),
      type: statementOfWork.type,
      projectState: statementOfWork.projectState,
      fixedBidAmount: statementOfWork.fixedBidAmount,
      lineManagerId: statementOfWork.lineManager?.id,
      escalationManagerId: statementOfWork.csxEscalationManager?.id,
      compnovaEscalationManagerId:
        statementOfWork.compnovaEscalationManager?.id,
      authorizedSignatureId: statementOfWork.authorizedSignature?.id,
    });
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

  loadStatementOfWorkPositions(statementOfWorkId: number) {
    this.sowPositionService
      .getPositionsByStatementOfWorkId(statementOfWorkId)
      .subscribe(
        (sowPositions: StatementOfWorkPosition[]) => {
          this.sowPositions = sowPositions;

          // Clear existing positions
          while (this.positions.length) {
            this.positions.removeAt(0);
          }

          // Add positions to form array
          sowPositions.forEach((sowPosition) => {
            const positionForm = this.formBuilder.group({
              id: [sowPosition.id],
              positionId: [sowPosition.positionId, Validators.required],
              type: [sowPosition.type, Validators.required],
              status: [sowPosition.status !== false],
            });
            this.positions.push(positionForm);
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load statement of work positions.',
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
      fixedBidAmount: formData.fixedBidAmount,
      lineManagerId: formData.lineManagerId,
      csxEscalationManagerId: formData.escalationManagerId,
      compnovaEscalationManagerId: formData.compnovaEscalationManagerId,
      authorizedSignatureId: formData.authorizedSignatureId,
      positions: formData.positions, // Positions will be handled separately
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
