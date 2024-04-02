import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoreDTO } from '../models/Store';
import { selectAllToDoItemsLength } from '../store/toDo.selectors';

@Component({
  selector: 'app-to-do-counter',
  templateUrl: './to-do-counter.component.html',
  styleUrls: ['./to-do-counter.component.scss'],
  standalone: true,
  imports: [AsyncPipe]
})
export class ToDoCounterComponent {
  toDoCounter$: Observable<number>;
  constructor(private readonly store: Store<StoreDTO>) {
    this.toDoCounter$ = this.store.select(selectAllToDoItemsLength)
  }
}
