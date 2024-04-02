/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { editToDoStateReducer, loadingStateReducer, selectedToDoListReducer, toDoListItemsReducer } from './app/store/toDo.reducer';
import { ToDoListEffects } from './app/store/toDo.effects';

bootstrapApplication(AppComponent, {
    providers: [
        provideStore(
            {
                selectedToDoItems: selectedToDoListReducer,
                toDoListItems: toDoListItemsReducer,
                editToDoItem: editToDoStateReducer,
                loading: loadingStateReducer
            }),
        provideEffects([ToDoListEffects]),
        provideAnimations()]
});
