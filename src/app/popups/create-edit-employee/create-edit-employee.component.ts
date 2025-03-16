import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Employee, EmploymentStatus, EmploymentType, Gender, WorkLocation } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-create-edit-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    InputSwitchModule,
    FileUploadModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './create-edit-employee.component.html',
  styleUrl: './create-edit-employee.component.scss'
})
export class CreateEditEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  loading = false;
  profileImagePreview: string | null = null;
  profileImageFile: File | null = null;
  maxDate: Date = new Date();

  genderOptions = [
    { label: 'Male', value: Gender.MALE },
    { label: 'Female', value: Gender.FEMALE },
  ];

  workLocationOptions = [
    { label: 'Onsite', value: WorkLocation.ONSITE },
    { label: 'Offshore', value: WorkLocation.OFFSHORE },
    { label: 'Near to Shore', value: WorkLocation.NEAR_TO_SHORE }
  ];

  employmentTypeOptions = [
    { label: 'Full Time', value: EmploymentType.FULL_TIME },
    { label: 'Contractor', value: EmploymentType.CONTRACTOR }
  ];

  employmentStatusOptions = [
    { label: 'Active', value: EmploymentStatus.ACTIVE },
    { label: 'On Hold', value: EmploymentStatus.ON_HOLD },
    { label: 'Bench', value: EmploymentStatus.BENCH },
    { label: 'Terminated', value: EmploymentStatus.TERMINATED },
    { label: 'Resigned', value: EmploymentStatus.RESIGNED }
  ];

  vendorOptions = [
    { label: 'Vendor 1', value: 1 },
    { label: 'Vendor 2', value: 2 },
    { label: 'Vendor 3', value: 3 }
  ];

  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);
  private employeeService = inject(EmployeeService);
  private messageService = inject(MessageService);

  ngOnInit() {
    this.initForm();

    const employee = this.config.data?.employee;
    if (employee) {
      this.isEditMode = true;
      this.populateForm(employee);
    }
  }

  initForm() {
    this.employeeForm = this.formBuilder.group({
      id: [0],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      middleName: ['', Validators.maxLength(50)],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-()]{10,15}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      vendorId: [null],
      profileImage: [''],
      dateOfBirth: [null, Validators.required],
      gender: [Gender.MALE, Validators.required],
      workLocation: [WorkLocation.ONSITE, Validators.required],
      employmentType: [EmploymentType.FULL_TIME, Validators.required],
      isFreelancer: [false],
      department: [''],
      employmentStatus: [EmploymentStatus.ACTIVE, Validators.required],
      startDate: [null, Validators.required],
      location: [''],
      status: [true]
    });
  }

  populateForm(employee: Employee) {
    this.employeeForm.patchValue({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      middleName: employee.middleName,
      contactNumber: employee.contactNumber,
      email: employee.email,
      vendorId: employee.vendorId,
      profileImage: employee.profileImage,
      dateOfBirth: new Date(employee.dateOfBirth),
      gender: employee.gender,
      workLocation: employee.workLocation,
      employmentType: employee.employmentType,
      isFreelancer: employee.isFreelancer,
      department: employee.department,
      employmentStatus: employee.employmentStatus,
      startDate: new Date(employee.startDate),
      location: employee.location,
      status: employee.status
    });

    this.profileImagePreview = employee.profileImage || null;
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue = { ...this.employeeForm.value };

    // Format dates to ISO string (yyyy-MM-dd)
    if (formValue.dateOfBirth) {
      formValue.dateOfBirth = this.formatDate(formValue.dateOfBirth);
    }

    if (formValue.startDate) {
      formValue.startDate = this.formatDate(formValue.startDate);
    }

    if (this.isEditMode) {
      this.updateEmployee(formValue);
    } else {
      this.createEmployee(formValue);
    }
  }

  createEmployee(employee: Employee) {
    this.employeeService.createEmployee(employee).subscribe({
      next: (result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee created successfully'
        });
        this.loading = false;
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error('Error creating employee:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create employee.'
        });
        this.loading = false;
      }
    });
  }

  updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe({
      next: (result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee updated successfully'
        });
        this.loading = false;
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error('Error updating employee:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update employee.'
        });
        this.loading = false;
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      this.profileImageFile = file;
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImagePreview = reader.result as string;
      this.employeeForm.patchValue({
        profileImage: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  clearProfilePicture() {
    this.profileImagePreview = null;
    this.profileImageFile = null;
    this.employeeForm.patchValue({
      profileImage: ''
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
