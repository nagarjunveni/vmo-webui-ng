import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { VendorService } from '../../services/vendor.service';
import { Vendor } from '../../models/vendor.model';

@Component({
  selector: 'app-create-edit-vendor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    RatingModule,
    ToastModule
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './create-edit-vendor.component.html',
  styleUrl: './create-edit-vendor.component.scss'
})
export class CreateEditVendorComponent implements OnInit {
  vendorForm!: FormGroup;
  isEditMode = false;
  loading = false;
  vendor?: Vendor;

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initForm();

    if (this.config.data) {
      this.isEditMode = this.config.data.mode === 'edit';

      if (this.isEditMode && this.config.data.vendor) {
        this.vendor = this.config.data.vendor;
        this.populateForm(this.vendor);
      }
    }
  }

  initForm() {
    this.vendorForm = this.fb.group({
      employeeIdentificationNumber: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required]],
      location: ['', [Validators.required]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      commission: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  populateForm(vendor: Vendor) {
    this.vendorForm.patchValue({
      employeeIdentificationNumber: vendor.employeeIdentificationNumber,
      companyName: vendor.companyName,
      firstName: vendor.firstName,
      middleName: vendor.middleName,
      lastName: vendor.lastName,
      email: vendor.email,
      contactNumber: vendor.contactNumber,
      location: vendor.location,
      rating: vendor.rating,
      commission: vendor.commission
    });
  }

  onSubmit() {
    if (this.vendorForm.invalid) {
      this.vendorForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const vendorData: Vendor = this.vendorForm.value;

    if (this.isEditMode && this.vendor?.id) {
      this.vendorService.updateVendor(this.vendor.id, vendorData).subscribe({
        next: (result) => {
          this.loading = false;
          this.dialogRef.close(result);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error updating vendor', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update vendor'
          });
        }
      });
    } else {
      this.vendorService.createVendor(vendorData).subscribe({
        next: (result) => {
          this.loading = false;
          this.dialogRef.close(result);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error creating vendor', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create vendor'
          });
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
