import { createAction, props } from "@ngrx/store";
import { TodoItem } from "../models/TodoItem";

export const initTodoList = createAction(
    '[TodoList] InitToDoList',
)

export const setTodoList = createAction(
    '[TodoList] SetToDoList',
    props<{ value: TodoItem[] }>()
)

export const deleteListAttempt = createAction(
    '[TodoList] DeleteAttempt',
)

export const deleteByIdAttempt = createAction(
    '[TodoList] DeleteToDoByIdAttempt',
    props<{ value: number }>()
)

export const deleteSelectedToDosByIds = createAction(
    '[TodoList] DeleteSelectedToDosByIds',
    props<{ value: number[] }>()
)

export const deleteToDoById = createAction(
    '[TodoList] DeleteToDoById',
    props<{ value: number }>()
)

export const setLoading = createAction(
    '[Loading] SetLoading',
    props<{ value: boolean }>()
)

export const editToDoItemAttempted = createAction(
    '[TodDoList] EditToDoItemAttempted',
    props<{ value: TodoItem }>()
)

export const editToDoItem = createAction(
    '[TodDoList] EditToDoItem',
    props<{ value: TodoItem }>()
)

export const addToDoItemAttempted = createAction(
    '[ToDoList] AddToDoItemAttempted',
    props<{ value: { task: string } }>()
)

export const addToDoItem = createAction(
    '[ToDoList] AddToDoItem',
    props<{ value: TodoItem }>()
)

export const updateSelectedToDos = createAction(
    '[ToDoList] UpdateSelectedToDos',
    props<{ value: TodoItem[] }>()
)
