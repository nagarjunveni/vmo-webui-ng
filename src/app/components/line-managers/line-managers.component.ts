import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { LineManager } from '../../models/line-manager.model';
import { LineManagerService } from '../../services/line-manager.service';
import { PopupService } from '../../services/popup.service';
import { CreateEditLineManagerComponent } from '../../popups/create-edit-line-manager/create-edit-line-manager.component';

@Component({
  selector: 'app-line-managers',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    RatingModule,
    FormsModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './line-managers.component.html',
  styleUrl: './line-managers.component.scss'
})
export class LineManagersComponent {
  lineManagers: LineManager[] = [];
  loading = false;

  private confirmationService: ConfirmationService = inject(ConfirmationService);
  private messageService: MessageService = inject(MessageService);
  private lineManagerService: LineManagerService = inject(LineManagerService);
  private popupService: PopupService = inject(PopupService);

  ngOnInit() {
    this.loadLineManagers();
  }

  loadLineManagers() {
    this.loading = true;
    this.lineManagerService.getAllLineManagers().subscribe({
      next: (data) => {
        this.lineManagers = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching line managers:', error);
        this.loading = false;
      }
    });
  }

  openCreateLineManagerPopup() {
    const ref = this.popupService.openPopup(CreateEditLineManagerComponent, {
      mode: 'create'
    }, 'Create Line Manager');

    ref.onClose.subscribe((result) => {
      if (result) {
        this.loadLineManagers();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Line Manager created successfully'
        });
      }
    });
  }

  openEditLineManagerPopup(lineManager: LineManager) {
    const ref = this.popupService.openPopup(CreateEditLineManagerComponent, {
      mode: 'edit',
      lineManager
    }, 'Edit Line Manager');

    ref.onClose.subscribe((result) => {
      if (result) {
        this.loadLineManagers();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Vendor updated successfully'
        });
      }
    });
  }

  confirmDelete(lineManager: LineManager) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete Line Manager?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (lineManager.id) {
          this.lineManagerService.deleteLineManager(lineManager.id).subscribe({
            next: () => {
              this.loadLineManagers();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Vendor deleted successfully'
              });
            },
            error: (error) => {
              console.error('Error deleting vendor', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete vendor'
              });
            }
          });
        }
      }
    });
  }
}
