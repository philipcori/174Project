import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-incomplete-modal',
  templateUrl: './incomplete-modal.component.html',
  styleUrls: ['./incomplete-modal.component.css']
})
export class IncompleteModalComponent {

  constructor(
    public dialogRef: MatDialogRef<IncompleteModalComponent>) {}

  onOkClick(): void {
    console.log("Okay clicked")
    this.dialogRef.close();
  }
}
