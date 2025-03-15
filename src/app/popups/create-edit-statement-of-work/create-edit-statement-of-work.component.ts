import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
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
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';

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
    CalendarModule,
    DropdownModule,
    ToastModule,
    SelectModule
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
  authorizedSignaturesOptions: AuthorizedSignature[] = [];
  lineManagersOptions: LineManager[] = [];
  csxEscalationManagersOptions: LineManager[] = [];
  compnovaEscalationManagersOptions: LineManager[] = [];

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

  private formBuilder: FormBuilder = inject(FormBuilder);
  private workOrdersService = inject(WorkOrdersService);
  private authorizedSignatureService = inject(AuthorizedSignatureService);
  private lineManagerService = inject(LineManagerService);
  private messageService = inject(MessageService);
  private dialogRef = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit() {
    this.initForm();

    if (this.config.data) {
      this.isEditMode = this.config.data.mode === 'edit';

      if (this.isEditMode && this.config.data.statementOfWork) {
        this.statementOfWork = this.config.data.statementOfWork;
        this.populateForm(this.statementOfWork);
      }
    }

    this.loadAuthorizedSignatures();
    this.loadLineManagers();
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
    });
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
      lineManagerId: statementOfWork.lineManagerId,
      escalationManagerId: statementOfWork.csxEscalationManagerId,
      compnovaEscalationManagerId: statementOfWork.compnovaEscalationManagerId,
      authorizedSignatureId: statementOfWork.authorizedSignatureId,
    });
  }

  loadAuthorizedSignatures() {
    this.authorizedSignatureService.getAllSignatures().subscribe(
      (authorizedSignatures: AuthorizedSignature[]) => {
        this.authorizedSignaturesOptions = authorizedSignatures;
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
        this.lineManagersOptions = lineManagers.filter(
          (manager) => manager.type === LineManagerType.CSX_LINE_MANAGER
        );
        this.csxEscalationManagersOptions = lineManagers.filter(
          (manager) => manager.type === LineManagerType.CSX_ESCALATION_MANAGER
        );
        this.compnovaEscalationManagersOptions = lineManagers.filter(
          (manager) =>
            manager.type === LineManagerType.COMPNOVA_ESCALATION_MANAGER
        );
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
    };

    if (this.isEditMode && this.statementOfWork?.id) {
      this.workOrdersService
        .updateWorkOrder(this.statementOfWork.id, statementOfWorkData)
        .subscribe({
          next: (result) => {
            this.loading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Statement of Work updated successfully.',
            });
            this.dialogRef.close(result);
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
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Statement of Work created successfully.',
          });
          this.dialogRef.close(result);
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

  onCancel() {
    this.dialogRef.close();
  }
}
