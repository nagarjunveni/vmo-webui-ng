import { inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private dialogService = inject(DialogService);

  constructor() { }

  openDataDialog(component: any, data: any, options: any = {}): DynamicDialogRef {
    const defaultOptions = {
      data: data,
      header: options.header || 'Dialog',
      width: options.width || '70%',
      contentStyle: options.contentStyle || { 'max-height': '80vh', overflow: 'auto' },
      baseZIndex: options.baseZIndex || 10000,
      dismissableMask: options.dismissableMask !== undefined ? options.dismissableMask : true,
      closeOnEscape: options.closeOnEscape !== undefined ? options.closeOnEscape : true
    };

    console.log(component)

    return this.dialogService.open(component, defaultOptions);
  }

  openPopup(component: any, data: any = {}, title: string = 'Dialog'): DynamicDialogRef {
    return this.openDataDialog(component, data, {
      header: title
    });
  }
}
