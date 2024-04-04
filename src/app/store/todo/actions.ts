/*
As a difference between React-Redux and Angular-NgRx in React there is no effects
class for. APIs are called in actions class and action creators are triggered.

Triggered action is detected by reducer in switch case and state is set

If I coded this class in React

import { TodoItem } from "../../models/TodoItem";

// enums should be defined in enums folder. it is neede in reducers class too
export enum TodoActionTypes {
  INIT_TODO_LIST = '[TodoList] InitToDoList',
  SET_TODO_LIST = '[TodoList] SetToDoList',
  DELETE_LIST_ATTEMPT = '[TodoList] DeleteAttempt',
  DELETE_BY_ID_ATTEMPT = '[TodoList] DeleteToDoByIdAttempt',
  DELETE_SELECTED_TODOS_BY_IDS = '[TodoList] DeleteSelectedToDosByIds',
  DELETE_TODO_BY_ID = '[TodoList] DeleteToDoById',
  SET_LOADING = '[Loading] SetLoading',
  EDIT_TODO_ITEM_ATTEMPTED = '[TodDoList] EditToDoItemAttempted',
  EDIT_TODO_ITEM = '[TodDoList] EditToDoItem',
  ADD_TODO_ITEM_ATTEMPTED = '[ToDoList] AddToDoItemAttempted',
  ADD_TODO_ITEM = '[ToDoList] AddToDoItem',
  UPDATE_SELECTED_TODOS = '[ToDoList] UpdateSelectedToDos'
}

// These are action creator. Triggered in an action.
export const setTodoList = (todos: TodoItem[]) => ({
  type: TodoActionTypes.SET_TODO_LIST,
  payload: todos,
});

export const deleteToDoById = (id: number) => ({
  type: TodoActionTypes.DELETE_TODO_BY_ID,
  payload: id,
});

export const setLoading = (isLoading: boolean) => ({
  type: TodoActionTypes.SET_LOADING,
  payload: isLoading,
});

export const addToDoItem = (todo: TodoItem) => ({
  type: TodoActionTypes.ADD_TODO_ITEM,
  payload: todo,
});

//Example of an asynchronous action using Thunk to load todo list
export const loadTodoList = () => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch('https://the-url-you-used-for-api/todos');
      const todos = await response.json();
      dispatch(setTodoList(todos));
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

*/


import { createAction, props } from "@ngrx/store";
import { TodoItem } from "../../models/TodoItem";

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
