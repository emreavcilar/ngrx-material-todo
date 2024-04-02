import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoButtonsComponent } from './to-do-buttons/to-do-buttons.component';
import { ToDoCounterComponent } from './to-do-counter/to-do-counter.component';
import { ToDoSelectedCounterComponent } from './to-do-selected-counter/to-do-selected-counter.component';
import { LoadingToggleComponent } from './loading-toggle/loading-toggle.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ToDoListComponent, ToDoButtonsComponent, ToDoCounterComponent, ToDoSelectedCounterComponent, LoadingToggleComponent],
})
export class AppComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {

  }

}
