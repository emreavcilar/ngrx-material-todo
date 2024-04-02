import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'delete-dialog',
  template: `
    <h2 mat-dialog-title>Delete</h2>
    <mat-dialog-content>Would you like to delete selected tasks?</mat-dialog-content>
    <mat-dialog-actions>
       <button mat-button mat-dialog-close>No</button>
       <button mat-button mat-dialog-close cdkFocusInitial (click)="yesClick()">Yes</button>
    </mat-dialog-actions>
  `,
  imports: [MatButtonModule, MatDialogModule],
  standalone: true
})

export class DeleteDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  yesClick() {
    this.dialogRef.close(true);
  }

}
