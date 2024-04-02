import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../models/TodoItem';
import { AsyncPipe, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteByIdAttempt, initTodoList, updateSelectedToDos } from '../store/toDo.action';
import { Observable, tap } from 'rxjs';
import { StoreDTO } from '../models/Store';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { EditDialogComponent } from 'src/app/dialogs/edit-dialog/edit-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToDoButtonsComponent } from '../to-do-buttons/to-do-buttons.component';
import { FormsModule } from '@angular/forms';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { selectAllToDoItems } from '../store/toDo.selectors';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, FormsModule, MatCheckboxModule, NgFor, AsyncPipe, ToDoButtonsComponent, MatIconModule, MatDialogModule]
})
export class ToDoListComponent implements OnInit {
  toDoListItems: TodoItem[] = [];
  selectedIdToDoPairs: { [key: number]: boolean } = {}
  clonedSelectedIdToDoPairs: { [key: number]: boolean } = {}
  todoItems$: Observable<TodoItem[]>;

  constructor(private readonly store: Store<StoreDTO>, private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.todoItems$ = this.store.select(selectAllToDoItems).pipe(tap((toDoListItems) => {
      this.toDoListItems = toDoListItems;
      this.clonedSelectedIdToDoPairs = this.selectedIdToDoPairs;
      if (Object.keys(this.clonedSelectedIdToDoPairs).length === 0) {
        toDoListItems.forEach(item => this.selectedIdToDoPairs[item.id] = false);
        return;
      }
      this.selectedIdToDoPairs = this.clonedSelectedIdToDoPairs;
    }));
    this.store.dispatch(initTodoList());
  }

  editToDoItem(item: TodoItem) {
    const dialogRef = this.dialog.open(EditDialogComponent, { width: '250px' });
    dialogRef.componentInstance.selectedTodo = item;
  }

  deleteToDoItem(item: TodoItem) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { width: '250px' });
    dialogRef.afterClosed().subscribe((isYesClicked: boolean) => {
      if (isYesClicked) {
        this.store.dispatch(deleteByIdAttempt({ value: item.id }));
      }
    });
  }

  onCheckboxChange() {
    const filteredToDoList = this.toDoListItems.filter(item => this.selectedIdToDoPairs[item.id]);
    this.store.dispatch(updateSelectedToDos({ value: filteredToDoList }));
  }

}
