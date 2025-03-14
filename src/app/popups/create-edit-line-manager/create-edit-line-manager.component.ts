import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LineManager, LineManagerType } from '../../models/line-manager.model';
import { LineManagerService } from '../../services/line-manager.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-create-edit-line-manager',
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
  templateUrl: './create-edit-line-manager.component.html',
  styleUrl: './create-edit-line-manager.component.scss'
})
export class CreateEditLineManagerComponent {
  lineManagerForm: FormGroup;
  isEditMode = false;
  loading = false;
  lineManager?: LineManager;
  lineManagerTypesOptions = [];

  private formBuilder: FormBuilder = inject(FormBuilder);
  private lineManagerService = inject(LineManagerService);
  private messageService = inject(MessageService);
  private dialogRef = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit() {
    this.lineManagerTypesOptions = [
      { label: 'CSX Line Manager', value: LineManagerType.CSX_LINE_MANAGER },
      { label: 'CSX Escalation Manager', value: LineManagerType.CSX_ESCALATION_MANAGER },
      { label: 'Compnova Escalation Manager', value: LineManagerType.COMPNOVA_ESCALATION_MANAGER },
    ]
    this.initForm();

    if (this.config.data) {
      this.isEditMode = this.config.data.mode === 'edit';

      if (this.isEditMode && this.config.data.lineManager) {
        this.lineManager = this.config.data.lineManager;
        this.populateForm(this.lineManager);
      }
    }
  }

  initForm() {
    this.lineManagerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: [''],
      type: [{}, [Validators.required]],
      department: ['', Validators.required],
    });
  }

  populateForm(lineManager: LineManager) {
    this.lineManagerForm.patchValue({
      firstName: lineManager.firstName,
      middleName: lineManager.middleName,
      lastName: lineManager.lastName,
      email: lineManager.email,
      contactNumber: lineManager.contactNumber,
      type: lineManager.type,
      department: lineManager.department,
    });
  }

  onSubmit() {
    if (this.lineManagerForm.invalid) {
      return;
    }

    this.loading = true;

    const lineManagerData: LineManager = {
      ...this.lineManager,
      ...this.lineManagerForm.value,
      type: this.lineManagerForm.value.type.value,
    };

    if (this.isEditMode) {
      this.updateLineManager(lineManagerData);
    } else {
      this.createLineManager(lineManagerData);
    }
  }

  createLineManager(lineManager: LineManager) {
    this.lineManagerService.createLineManager(lineManager).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Line Manager created successfully' });
        this.dialogRef.close(true);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        this.loading = false;
      }
    );
  }

  updateLineManager(lineManager: LineManager) {
    if (!this.lineManager?.id) {
      this.loading = false;
      return;
    }

    this.lineManagerService.updateLineManager(this.lineManager.id, lineManager).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Line Manager updated successfully' });
        this.dialogRef.close(true);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        this.loading = false;
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
