import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { WorkOrdersService } from '../../services/work-orders.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PopupService } from '../../services/popup.service';
import { StatementOfWork } from '../../models/statement-of-work.model';
import { CreateEditStatementOfWorkComponent } from '../../popups/create-edit-statement-of-work/create-edit-statement-of-work.component';

@Component({
  selector: 'app-work-orders',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, TagModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './work-orders.component.html',
  styleUrl: './work-orders.component.scss',
})
export class WorkOrdersComponent {
  workOrders: StatementOfWork[] = [];
  loading = false;

  private confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private messageService: MessageService = inject(MessageService);
  private workOrdersService: WorkOrdersService = inject(WorkOrdersService);
  private popupService: PopupService = inject(PopupService);

  ngOnInit() {
    this.loadWorkOrders();
  }

  loadWorkOrders() {
    this.loading = true;
    this.workOrdersService.getWorkOrders().subscribe({
      next: (data) => {
        this.workOrders = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching work orders:', error);
        this.loading = false;
      },
    });
  }

  openCreateWorkOrderPopup() {
    const ref = this.popupService.openPopup(
      CreateEditStatementOfWorkComponent,
      {
        mode: 'create',
        workOrder: null,
      },
      'Create Work Order'
    );

    ref.onClose.subscribe((result) => {
      if (result) {
        this.loadWorkOrders();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Work order created successfully',
        });
      }
    });
  }

  openEditWorkOrderPopup(statementOfWork: StatementOfWork) {
    const ref = this.popupService.openPopup(
      CreateEditStatementOfWorkComponent,
      {
        mode: 'edit',
        statementOfWork,
      },
      'Edit Work Order'
    );

    ref.onClose.subscribe((result) => {
      if (result) {
        this.loadWorkOrders();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Work order updated successfully',
        });
      }
    });
  }

  confirmDelete(statementOfWork: StatementOfWork) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete Statement Of Work?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (statementOfWork.id) {
          this.workOrdersService.deleteWorkOrder(statementOfWork.id).subscribe({
            next: () => {
              this.loadWorkOrders();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Statement of work deleted successfully'
              });
            },
            error: (error) => {
              console.error('Error deleting Statement of work', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete Statement of work'
              });
            }
          });
        }
      }
    });
  }

  downloadWorkOrder(workOrder: StatementOfWork) {
    try {
      const blob = this.workOrdersService.generateWorkOrderPDF(workOrder);
      const fileName = `SOW_${workOrder.statementOfWorkId || workOrder.id}_${new Date().getTime()}.pdf`;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Document generated and downloaded successfully'
      });
    } catch (error) {
      console.error('Error generating document:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to generate document'
      });
    }
  }

  getStatusSeverity(
    status: string
  ):
    | 'success'
    | 'info'
    | 'warn'
    | 'danger'
    | 'secondary'
    | 'contrast'
    | undefined {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Closing':
        return 'warn';
      case 'Completed':
        return 'info';
      default:
        return 'info';
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
}
