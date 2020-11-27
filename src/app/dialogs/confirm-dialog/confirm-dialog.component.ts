import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  confirmQuestion = '';
  yesButtonText = '';
  noButtonText = '';
  constructor(private dialog: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    if (dialogData) {
      this.confirmQuestion = dialogData.confirmQuestion;
      this.yesButtonText = dialogData.yesButtonText;
      this.noButtonText = dialogData.noButtonText;
    }
  }

  confirm(): void {
    this.dialog.close(true);
  }

  deny(): void {
    this.dialog.close(false);
  }

}
