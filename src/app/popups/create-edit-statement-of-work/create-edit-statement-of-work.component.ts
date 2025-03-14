import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { StatementOfWork } from '../../models/statement-of-work.model';
import { AuthorizedSignature } from '../../models/authorized-signature.model';
import { LineManager } from '../../models/line-manager.model';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthorizedSignatureService } from '../../services/authorized-signature.service';
import { WorkOrdersService } from '../../services/work-orders.service';
import { LineManagerService } from '../../services/line-manager.service';

@Component({
  selector: 'app-create-edit-statement-of-work',
  imports: [
    ToastModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    SelectModule
  ],
  providers: [MessageService],
  templateUrl: './create-edit-statement-of-work.component.html',
  styleUrl: './create-edit-statement-of-work.component.scss'
})
export class CreateEditStatementOfWorkComponent {
  StatementOfWorkForm: FormGroup;
  isEditMode = false;
  loading = false;
  statementOfWork?: StatementOfWork;
  authorizedSignaturesOptions: AuthorizedSignature[] = [];
  lineManagersOptions: LineManager[] = [];
  csxEscalationManagersOptions: LineManager[] = [];
  compnovaEscalationManagersOptions: LineManager[] = [];

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
    // this.loadLineManagers();
  }

  initForm() {
    this.StatementOfWorkForm = this.formBuilder.group({
      name: [''],
      description: [''],
      startDate: [''],
      endDate: [''],
      type: [''],
      projectState: [''],
      fixedBidAmount: [''],
      lineManagerId: [''],
      escalationManagerId: [''],
      compnovaEscalationManagerId: [''],
      authorizedSignatureId: ['']
    });
  }
  populateForm(statementOfWork: StatementOfWork) {
    this.StatementOfWorkForm.patchValue({
      name: statementOfWork.name,
      description: statementOfWork.description,
      startDate: statementOfWork.startDate,
      endDate: statementOfWork.endDate,
      type: statementOfWork.type,
      projectState: statementOfWork.projectState,
      fixedBidAmount: statementOfWork.fixedBidAmount,
      lineManagerId: statementOfWork.lineManagerId,
      escalationManagerId: statementOfWork.escalationManagerId,
      compnovaEscalationManagerId: statementOfWork.compnovaEscalationManagerId,
      authorizedSignatureId: statementOfWork.authorizedSignatureId
    });
  }
  loadAuthorizedSignatures() {
    this.authorizedSignatureService.getAllSignatures().subscribe(
      (authorizedSignatures: AuthorizedSignature[]) => {
        this.authorizedSignaturesOptions = authorizedSignatures;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load authorized signatures.' });
      }
    );
  }
}
