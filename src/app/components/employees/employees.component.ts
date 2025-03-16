import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Employee, EmploymentStatus, EmploymentType, Gender, WorkLocation } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { PopupService } from '../../services/popup.service';
import { CreateEditEmployeeComponent } from '../../popups/create-edit-employee/create-edit-employee.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    TagModule,
    TooltipModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  loading = false;

  private employeeService = inject(EmployeeService);
  private popupService = inject(PopupService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load employees.'
        });
        this.loading = false;
      }
    });
  }

  openCreateEmployeePopup() {
    const ref = this.popupService.openPopup(CreateEditEmployeeComponent, {
      header: 'Create Employee',
      width: '70%',
      data: { employee: null }
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        this.loadEmployees();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee created successfully.'
        });
      }
    });
  }

  openEditEmployeePopup(employee: Employee) {
    const ref = this.popupService.openPopup(CreateEditEmployeeComponent, {
      header: 'Edit Employee',
      width: '70%',
      data: { employee }
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        this.loadEmployees();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee updated successfully.'
        });
      }
    });
  }

  confirmDelete(employee: Employee) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteEmployee(employee.id!);
      }
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.employees = this.employees.filter(e => e.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee deleted successfully.'
        });
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete employee.'
        });
      }
    });
  }

  viewEmployeeDetails(employee: Employee) {
  }

  getStatusSeverity(status: boolean): string {
    return status ? 'success' : 'danger';
  }

  getEmploymentStatusSeverity(status: EmploymentStatus): string {
    switch (status) {
      case EmploymentStatus.ACTIVE:
        return 'success';
      case EmploymentStatus.ON_HOLD || EmploymentStatus.BENCH:
        return 'warning';
      case EmploymentStatus.TERMINATED:
        return 'danger';
      case EmploymentStatus.RESIGNED:
        return 'info';
      default:
        return 'info';
    }
  }

  getWorkLocationIcon(location: WorkLocation): string {
    switch (location) {
      case WorkLocation.ONSITE:
        return 'pi pi-building';
      case WorkLocation.OFFSHORE:
        return 'pi pi-home';
      case WorkLocation.NEAR_TO_SHORE:
        return 'pi pi-sync';
      default:
        return 'pi pi-question';
    }
  }

  getEmploymentTypeIcon(type: EmploymentType): string {
    switch (type) {
      case EmploymentType.FULL_TIME:
        return 'pi pi-clock';
      case EmploymentType.CONTRACTOR:
        return 'pi pi-file-contract';
      default:
        return 'pi pi-question';
    }
  }

  getGenderIcon(gender: Gender): string {
    switch (gender) {
      case Gender.MALE:
        return 'pi pi-user';
      case Gender.FEMALE:
        return 'pi pi-user-plus';
      default:
        return 'pi pi-question';
    }
  }

  getGenderLabel(gender: Gender): string {
    switch (gender) {
      case Gender.MALE:
        return 'Male';
      case Gender.FEMALE:
        return 'Female';
      default:
        return 'Unknown';
    }
  }

  getWorkLocationLabel(workLocation: WorkLocation): string {
    switch (workLocation) {
      case WorkLocation.ONSITE:
        return 'Onsite';
      case WorkLocation.OFFSHORE:
        return 'Offshore';
      case WorkLocation.NEAR_TO_SHORE:
        return 'Near to Shore';
      default:
        return 'Unknown';
    }
  }

  getEmploymentTypeLabel(employmentType: EmploymentType): string {
    switch (employmentType) {
      case EmploymentType.FULL_TIME:
        return 'Full Time';
      case EmploymentType.CONTRACTOR:
        return 'Contractor';
      default:
        return 'Unknown';
    }
  }

  getEmploymentStatusLabel(employmentStatus: EmploymentStatus): string {
    switch (employmentStatus) {
      case EmploymentStatus.ACTIVE:
        return 'Active';
      case EmploymentStatus.ON_HOLD:
        return 'On Hold';
      case EmploymentStatus.BENCH:
        return 'Bench';
      case EmploymentStatus.TERMINATED:
        return 'Terminated';
      case EmploymentStatus.RESIGNED:
        return 'Resigned';
      default:
        return 'Unknown';
    }
  }
}
