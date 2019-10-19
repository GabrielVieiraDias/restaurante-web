import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-confirm-dialog',
  templateUrl: './modal-confirm-dialog.component.html',
  styleUrls: ['./modal-confirm-dialog.component.css']
})
export class ModalConfirmDialogComponent {

  public clickyes = false;
  public clickno = false;

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onCloseConfirm() {
      this.dialogRef.close(true);
    }
    onCloseCancel() {
      this.dialogRef.close(false);
    }

}
