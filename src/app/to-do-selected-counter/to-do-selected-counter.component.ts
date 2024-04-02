import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { StoreDTO } from '../models/Store';
import { selectSelectedToDoItemsLength } from '../store/toDo.selectors';

@Component({
  selector: 'app-to-do-selected-counter',
  templateUrl: './to-do-selected-counter.component.html',
  styleUrls: ['./to-do-selected-counter.component.css'],
  imports: [AsyncPipe, NgIf],
  standalone: true
})
export class ToDoSelectedCounterComponent implements OnInit {
  count$: Observable<number>;

  constructor(private store: Store<StoreDTO>) {
    this.count$ = store.select(selectSelectedToDoItemsLength);
  }

  ngOnInit() {
  }

}
