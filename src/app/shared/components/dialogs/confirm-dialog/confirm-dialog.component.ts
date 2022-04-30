import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {

  title?: string;
  content?: string;
  icon?: string;
  cancelMessage = 'Cancel';
  acceptMessage = 'Confirm';

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent, boolean>) {
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

}
