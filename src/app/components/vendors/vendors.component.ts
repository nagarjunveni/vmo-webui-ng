import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Vendor } from '../../models/vendor.model';
import { CreateEditVendorComponent } from '../../popups/create-edit-vendor/create-edit-vendor.component';
import { PopupService } from '../../services/popup.service';
import { VendorService } from '../../services/vendor.service';


@Component({
  selector: 'app-vendors',
  standalone: true,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.scss'
})
export class VendorsComponent implements OnInit {
  vendors: Vendor[] = [];
  loading = false;

  constructor(
    private vendorService: VendorService,
    private popupService: PopupService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadVendors();
  }

  loadVendors() {
    this.loading = true;
    this.vendorService.getAllVendors().subscribe({
      next: (data) => {
        this.vendors = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading vendors', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load vendors'
        });
        this.loading = false;
      }
    });
  }

  openCreateVendorDialog() {
    const ref = this.popupService.openPopup(CreateEditVendorComponent, {
      mode: 'create'
    }, 'Create Vendor');

    ref.onClose.subscribe((result) => {
      if (result) {
        this.loadVendors();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Vendor created successfully'
        });
      }
    });
  }

  openEditVendorDialog(vendor: Vendor) {
    const ref = this.popupService.openPopup(CreateEditVendorComponent, {
      mode: 'edit',
      vendor: vendor
    }, 'Edit Vendor');

    ref.onClose.subscribe((result) => {
      if (result) {
        this.loadVendors();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Vendor updated successfully'
        });
      }
    });
  }

  confirmDelete(vendor: Vendor) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete vendor ${vendor.companyName}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (vendor.id) {
          this.vendorService.deleteVendor(vendor.id).subscribe({
            next: () => {
              this.loadVendors();
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

  getStatusSeverity(status: boolean): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | undefined {
    return status ? 'success' : 'danger';
  }

  getStatusLabel(status: boolean): string {
    return status ? 'Active' : 'Inactive';
  }
}
