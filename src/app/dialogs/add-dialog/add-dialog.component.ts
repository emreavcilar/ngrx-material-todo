import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { StoreDTO } from 'src/app/models/Store';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { addToDoItemAttempted } from 'src/app/store/toDo.action';

@Component({
  selector: 'edit-dialog',
  template: `
   <h2 mat-dialog-title>Add</h2>
  <mat-dialog-content>
    <mat-form-field class="example-form-field">
     <mat-label>Description</mat-label>
     <input matInput type="text" [(ngModel)]="addedToDo.task">
    </mat-form-field>
   </mat-dialog-content>
    <mat-dialog-actions>
       <button mat-button mat-dialog-close>No</button>
       <button mat-button mat-dialog-close cdkFocusInitial (click)="saveClick()">Save</button>
    </mat-dialog-actions>  
  `,
  imports: [MatButtonModule, MatDialogModule, MatInputModule, FormsModule],
  standalone: true
})
export class AddDialogComponent {

  addedToDo = {
    task: ''
  }

  constructor(private store: Store<StoreDTO>) { }

  saveClick() {
    this.store.dispatch(addToDoItemAttempted({ value: this.addedToDo }));
  }

}
