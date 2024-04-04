import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AddDialogComponent } from '../dialogs/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { StoreDTO } from '../models/Store';
import { deleteListAttempt, selectSelectedToDoItemsLength } from '../store';

@Component({
  selector: 'app-to-do-buttons',
  templateUrl: './to-do-buttons.component.html',
  styleUrls: ['./to-do-buttons.component.scss'],
  standalone: true,
  imports: [MatIconModule, NgIf, AsyncPipe]
})

export class ToDoButtonsComponent {

  isDeleteActive$: Observable<boolean>;

  constructor(private store: Store<StoreDTO>, public readonly dialog: MatDialog) {
    this.isDeleteActive$ = store.select(selectSelectedToDoItemsLength).pipe(
      map(length => length > 0)
    );
  }

  deleteTasks() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { width: '250px' });
    dialogRef.afterClosed().subscribe((isYesClicked: boolean) => {
      if (isYesClicked) {
        this.store.dispatch(deleteListAttempt());
      }
    });

  }

  addTask() {
    this.dialog.open(AddDialogComponent, {
      width: '250px'
    })
  }

}
