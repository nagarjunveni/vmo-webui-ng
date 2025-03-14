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
import { PopupService } from '../../services/popup.service';
import { AuthorizedSignature } from '../../models/authorized-signature.model';
import { AuthorizedSignatureService } from '../../services/authorized-signature.service';
import { CreateEditAuthorizedSignatureComponent } from '../../popups/create-edit-authorized-signature/create-edit-authorized-signature.component';

@Component({
  selector: 'app-authorized-signatures',
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
  templateUrl: './authorized-signatures.component.html',
  styleUrl: './authorized-signatures.component.scss'
})
export class AuthorizedSignaturesComponent {
  authorizedSignatures: AuthorizedSignature[] = [];
  loading = false;

  private confirmationService: ConfirmationService = inject(ConfirmationService);
  private messageService: MessageService = inject(MessageService);
  private authorizedSignatureService: AuthorizedSignatureService = inject(AuthorizedSignatureService);
  private popupService: PopupService = inject(PopupService);

  ngOnInit() {
    this.loadAuthorizedSignatures();
  }

  loadAuthorizedSignatures() {
    this.loading = true;
    this.authorizedSignatureService.getAllSignatures().subscribe({
      next: (data) => {
        this.authorizedSignatures = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching authorized signatures:', error);
        this.loading = false;
      }
    });
  }

  openCreateAuthorizedSignaturePopup() {
    const popupRef = this.popupService.openPopup(CreateEditAuthorizedSignatureComponent, {
      mode: 'create'
    }, 'Create Authorized Signature');
    popupRef.onClose.subscribe((result) => {
      if (result) {
        this.loadAuthorizedSignatures();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Authorized Signature created successfully'
        });
      }
    });
  }

  openEditAuthorizedSignaturePopup(signature: AuthorizedSignature) {
    const popupRef = this.popupService.openPopup(CreateEditAuthorizedSignatureComponent, {
      mode: 'edit',
      data: signature
    }, 'Edit Authorized Signature');
    popupRef.onClose.subscribe((result) => {
      if (result) {
        this.loadAuthorizedSignatures();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Authorized Signature updated successfully'
        });
      }
    });
  }

  deleteAuthorizedSignature(signature: AuthorizedSignature) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete Authorized Signature?`,
      accept: () => {
        this.authorizedSignatureService.deleteSignature(signature.id).subscribe({
          next: () => {
            this.loadAuthorizedSignatures();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Authorized Signature deleted successfully'
            });
          },
          error: (error) => {
            console.error('Error deleting authorized signature:', error);
          }
        });
      }
    });
  }
}
