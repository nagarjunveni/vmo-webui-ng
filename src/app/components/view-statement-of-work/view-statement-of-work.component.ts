import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { StatementOfWork } from '../../models/statement-of-work.model';
import { WorkOrdersService } from '../../services/work-orders.service';
import { StatementOfWorkPositionService } from '../../services/statement-of-work-position.service';
import { PositionService } from '../../services/position.service';
import { Position } from '../../models/position.model';
import { StatementOfWorkPosition, PositionType } from '../../models/statement-of-work-position.model';

@Component({
  selector: 'app-view-statement-of-work',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    TableModule,
    ToastModule,
    DialogModule,
    SelectModule,
    ConfirmDialogModule,
    DividerModule,
    TagModule,
    InputTextModule,
    TooltipModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './view-statement-of-work.component.html',
  styleUrl: './view-statement-of-work.component.scss'
})
export class ViewStatementOfWorkComponent implements OnInit {
  statementOfWork: StatementOfWork | null = null;
  positions: StatementOfWorkPosition[] = [];
  loading = true;
  displayAddPositionDialog = false;
  addPositionForm!: FormGroup;
  availablePositions: Position[] = [];

  positionTypeOptions = [
    { label: 'Onsite', value: PositionType.ONSITE },
    { label: 'Offshore', value: PositionType.OFFSHORE },
  ];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private workOrdersService = inject(WorkOrdersService);
  private sowPositionService = inject(StatementOfWorkPositionService);
  private positionService = inject(PositionService);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.initAddPositionForm();
    this.loadData();
  }

  initAddPositionForm() {
    this.addPositionForm = this.formBuilder.group({
      positionId: ['', Validators.required],
      type: [PositionType.ONSITE, Validators.required]
    });
  }

  loadData() {
    this.loading = true;

    // Get the SOW ID from the route parameters
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadStatementOfWork(+id);
        this.loadAvailablePositions();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Statement of Work ID not found in route parameters.'
        });
        this.router.navigate(['/work-orders']);
      }
    });
  }

  loadStatementOfWork(id: number) {
    this.workOrdersService.getWorkOrderById(id).subscribe({
      next: (data) => {
        this.statementOfWork = data;
        this.positions = data.positions || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading statement of work:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load statement of work details.'
        });
        this.loading = false;
      }
    });
  }

  loadAvailablePositions() {
    this.positionService.getAllPositions().subscribe({
      next: (positions) => {
        // Filter only active positions
        this.availablePositions = positions.filter(p => p.status !== false);
      },
      error: (error) => {
        console.error('Error loading positions:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load available positions.'
        });
      }
    });
  }

  openAddPositionDialog() {
    this.addPositionForm.reset({
      positionId: '',
      type: PositionType.ONSITE
    });
    this.displayAddPositionDialog = true;
  }

  closeAddPositionDialog() {
    this.displayAddPositionDialog = false;
  }

  addPosition() {
    if (this.addPositionForm.invalid) {
      this.addPositionForm.markAllAsTouched();
      return;
    }

    if (!this.statementOfWork?.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Statement of Work ID is missing.'
      });
      return;
    }

    const formValue = this.addPositionForm.value;
    const newPosition: StatementOfWorkPosition = {
      statementOfWorkId: this.statementOfWork.id,
      positionId: formValue.positionId,
      type: formValue.type,
      status: true
    };

    this.sowPositionService.createStatementOfWorkPosition(newPosition).subscribe({
      next: (result) => {
        // Find the position details to add to the local array
        const positionDetails = this.availablePositions.find(p => p.id === formValue.positionId);
        if (positionDetails) {
          const newPositionWithDetails: StatementOfWorkPosition = {
            ...result,
            position: positionDetails
          };
          this.positions.push(newPositionWithDetails);
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Position added successfully.'
        });
        this.closeAddPositionDialog();
      },
      error: (error) => {
        console.error('Error adding position:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add position.'
        });
      }
    });
  }

  confirmDeletePosition(position: StatementOfWorkPosition) {
    if (!position.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Position ID is missing.'
      });
      return;
    }

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this position?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletePosition(position.id!);
      }
    });
  }

  deletePosition(id: number) {
    this.sowPositionService.deleteStatementOfWorkPosition(id).subscribe({
      next: () => {
        this.positions = this.positions.filter(p => p.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Position deleted successfully.'
        });
      },
      error: (error) => {
        console.error('Error deleting position:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete position.'
        });
      }
    });
  }

  navigateBack() {
    this.router.navigate(['/work-orders']);
  }

  // Helper method to get the full name of a person
  getFullName(person: any): string {
    if (!person) return 'N/A';

    const parts = [
      person.firstName || '',
      person.middleName || '',
      person.lastName || ''
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(' ') : 'N/A';
  }

  // Helper method to format currency
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  // Helper method to get skills as an array
  getSkillsArray(skills: string): string[] {
    if (!skills) return [];
    return skills.split(',').map(skill => skill.trim()).filter(Boolean);
  }
}
