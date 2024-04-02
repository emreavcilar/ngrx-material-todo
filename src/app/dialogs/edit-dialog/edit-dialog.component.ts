import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TodoItem } from 'src/app/models/TodoItem';
import { Store } from '@ngrx/store';
import { StoreDTO } from 'src/app/models/Store';
import { map, Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { editToDoItem, editToDoItemAttempted } from 'src/app/store/toDo.action';

@Component({
  selector: 'edit-dialog',
  template: `
   <h2 mat-dialog-title>Edit</h2>
  <mat-dialog-content>
    <mat-form-field class="example-form-field">
     <mat-label>Description</mat-label>
     <input matInput type="text" [(ngModel)]="editedTodo.task">
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
export class EditDialogComponent implements OnInit {

  @Input() selectedTodo: TodoItem;
  editedTodo: TodoItem;

  constructor(private store: Store<StoreDTO>) { }

  ngOnInit() {
    this.editedTodo = { ...this.selectedTodo };
  }

  saveClick() {
    this.store.dispatch(editToDoItemAttempted({ value: this.editedTodo }));
  }

}
