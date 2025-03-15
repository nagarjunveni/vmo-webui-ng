import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Position } from '../../models/position.model';
import { PositionService } from '../../services/position.service';
import { PopupService } from '../../services/popup.service';
import { CreateEditPositionComponent } from '../../popups/create-edit-position/create-edit-position.component';

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    FormsModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss'
})
export class PositionsComponent implements OnInit {
  positions: Position[] = [];
  loading = false;

  constructor(
    private positionService: PositionService,
    private popupService: PopupService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadPositions();
  }

  loadPositions() {
    this.loading = true;
    this.positionService.getAllPositions().subscribe({
      next: (data) => {
        this.positions = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading positions', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load positions'
        });
        this.loading = false;
      }
    });
  }

  openCreatePositionDialog() {
    const ref = this.popupService.openPopup(CreateEditPositionComponent, {
      mode: 'create'
    }, 'Create Position');

    ref.onClose.subscribe((result) => {
      if (result) {
        this.loadPositions();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Position created successfully'
        });
      }
    });
  }

  openEditPositionDialog(position: Position) {
    const ref = this.popupService.openPopup(CreateEditPositionComponent, {
      mode: 'edit',
      position: position
    }, 'Edit Position');

    ref.onClose.subscribe((result) => {
      if (result) {
        this.loadPositions();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Position updated successfully'
        });
      }
    });
  }

  confirmDelete(position: Position) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete position ${position.title}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (position.id) {
          this.positionService.deletePosition(position.id).subscribe({
            next: () => {
              this.loadPositions();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Position deleted successfully'
              });
            },
            error: (error) => {
              console.error('Error deleting position', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete position'
              });
            }
          });
        }
      }
    });
  }

  getStatusSeverity(status: boolean): 'success' | 'danger' {
    return status ? 'success' : 'danger';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }
}
