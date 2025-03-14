import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizedSignature } from '../../models/authorized-signature.model';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthorizedSignatureService } from '../../services/authorized-signature.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-create-edit-authorized-signature',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    FileUploadModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './create-edit-authorized-signature.component.html',
  styleUrl: './create-edit-authorized-signature.component.scss'
})
export class CreateEditAuthorizedSignatureComponent {
  authorizedSignatureForm: FormGroup;
  isEditMode = false;
  loading = false;
  authorizedSignature?: AuthorizedSignature;
  file: any;

  private formBuilder: FormBuilder = inject(FormBuilder);
  private authorizedSignatureService = inject(AuthorizedSignatureService);
  private messageService = inject(MessageService);
  private dialogRef = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit() {
    this.initForm();

    if (this.config.data) {
      this.isEditMode = this.config.data.mode === 'edit';

      if (this.isEditMode && this.config.data.authorizedSignature) {
        this.authorizedSignature = this.config.data.authorizedSignature;
        this.populateForm(this.authorizedSignature);
      }
    }
  }

  initForm() {
    this.authorizedSignatureForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required]],
    });
  }

  populateForm(authorizedSignature: AuthorizedSignature) {
    this.authorizedSignatureForm.patchValue({
      firstName: authorizedSignature.firstName,
      middleName: authorizedSignature.middleName,
      lastName: authorizedSignature.lastName,
      email: authorizedSignature.email,
      contactNumber: authorizedSignature.contactNumber
    });
  }

  onSubmit() {
    if (this.authorizedSignatureForm.invalid || !this.file) {
      return;
    }

    const authorizedSignatureValues = this.authorizedSignatureForm.value;

    const authorizedSignature: AuthorizedSignature = {
      id: this.isEditMode ? this.authorizedSignature?.id : null,
      firstName: authorizedSignatureValues.firstName,
      middleName: authorizedSignatureValues.middleName,
      lastName: authorizedSignatureValues.lastName,
      email: authorizedSignatureValues.email,
      contactNumber: authorizedSignatureValues.contactNumber,
      digitalSignature: this.file,
    };

    const formData = new FormData();


    formData.append('firstName', authorizedSignatureValues.firstName);
    formData.append('middleName', authorizedSignatureValues.middleName || ''); // Handle potential null/undefined
    formData.append('lastName', authorizedSignatureValues.lastName);
    formData.append('email', authorizedSignatureValues.email);
    formData.append('contactNumber', authorizedSignatureValues.contactNumber);
    formData.append('digitalSignature', this.file);

    this.loading = true;

    if (this.isEditMode) {
      formData.append('id', this.authorizedSignature?.id?.toString() || ''); // Handle potential null/undefined
      this.authorizedSignatureService.updateSignature(this.authorizedSignature.id, formData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Authorized Signature updated successfully' });
          this.dialogRef.close(true);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update Authorized Signature' });
          this.loading = false;
        }
      });
    } else {
      this.authorizedSignatureService.createSignature(formData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Authorized Signature created successfully' });
          this.dialogRef.close(true);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create Authorized Signature' });
          this.loading = false;
        }
      });
    }
  }

  onUpload(event: any) {
    // Access the uploaded files
    const files = event.files;
    console.log('Uploaded files:', files);

    this.file = files[0];
  }

  onCancel() {
    this.dialogRef.close();
  }
}
