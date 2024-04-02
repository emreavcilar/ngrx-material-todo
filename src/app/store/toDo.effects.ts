import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, tap, withLatestFrom } from "rxjs";
import { StoreDTO } from "../models/Store";
import { ApiService } from "../services/api.service";
import {
    addToDoItem,
    addToDoItemAttempted,
    deleteListAttempt,
    deleteSelectedToDosByIds,
    deleteToDoById,
    deleteByIdAttempt,
    editToDoItem,
    editToDoItemAttempted,
    initTodoList,
    setLoading,
    setTodoList,
    updateSelectedToDos
} from "./toDo.action";
import { selectSelectedToDoItemsIds } from "./toDo.selectors";

@Injectable()
export class ToDoListEffects {

    loadingToggleEffect = createEffect(() => this.actions$.pipe(
        ofType(addToDoItemAttempted, deleteListAttempt, deleteByIdAttempt, initTodoList, editToDoItemAttempted),
        map(() => setLoading({ value: true }))
    ))

    deleteListAttemptEffect = createEffect(() => this.actions$.pipe(
        ofType(deleteListAttempt),
        withLatestFrom(this.store.select(selectSelectedToDoItemsIds)),
        switchMap(([_, ids]) => this.apiService.deleteTasks(ids).pipe(
            tap(() => {
                this.store.dispatch(updateSelectedToDos({ value: [] }));
                this.store.dispatch(deleteSelectedToDosByIds({ value: ids }));
                this.store.dispatch(setLoading({ value: false }));
            }),
        ))
    ), { dispatch: false });

    deleteToDoItemEffect = createEffect(() => this.actions$.pipe(
        ofType(deleteByIdAttempt),
        switchMap((action) => this.apiService.deleteTask(action.value).pipe(
            tap(() => {
                this.store.dispatch(deleteToDoById({ value: action.value }));
                this.store.dispatch(setLoading({ value: false }));
            }),
        ))
    ), { dispatch: false });

    setToDoItemsEffect = createEffect(() => this.actions$.pipe(
        ofType(initTodoList),
        switchMap(() => this.apiService.getTasks().pipe(
            tap((result) => {
                this.store.dispatch(deleteSelectedToDosByIds({ value: [] }));
                this.store.dispatch(setTodoList({ value: result }));
            }),
            map(() => setLoading({ value: false }))
        )),
    ));

    editToDoItemAttemptedEffect = createEffect(() => this.actions$.pipe(
        ofType(editToDoItemAttempted),
        switchMap((action) => this.apiService.editTask(action.value).pipe(tap(() => {
            this.store.dispatch(editToDoItem({ value: action.value }));
            this.store.dispatch(setLoading({ value: false }));
        })))
    ), { dispatch: false });

    addToDoItemAttemptedEffect = createEffect(() => this.actions$.pipe(
        ofType(addToDoItemAttempted),
        switchMap((action) => this.apiService.addTask(action.value).pipe(tap((result) => {
            this.store.dispatch(addToDoItem({ value: result }));
            this.store.dispatch(setLoading({ value: false }));
        })))
    ), { dispatch: false });

    constructor(private readonly actions$: Actions, private readonly apiService: ApiService, private readonly store: Store<StoreDTO>) { }
}