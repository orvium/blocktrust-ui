import { Component, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss']
})
export class CustomDialogComponent {

  title?: string;
  content?: string;
  template!: TemplateRef<any> | null;
  showActionButtons = false;
  //ACTION BUTTONS - CONFIRM OR CANCEL (CLOSE)
  icon?: string;
  cancelMessage? = 'Cancel';
  acceptMessage? = 'Confirm';

  constructor(private dialogRef: MatDialogRef<CustomDialogComponent, boolean>) {
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
