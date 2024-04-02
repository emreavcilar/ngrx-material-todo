import { createReducer, on } from "@ngrx/store";
import { TodoItem } from "../models/TodoItem";
import { editToDoItem, deleteSelectedToDosByIds, setLoading, setTodoList, addToDoItem, updateSelectedToDos, deleteToDoById } from "./toDo.action";

const todoListState: TodoItem[] = [];
const selectedToDoListState: TodoItem[] = [];
const editToDoState: TodoItem = null;
const loadingState = false;

export const toDoListItemsReducer = createReducer(
    todoListState,
    on(setTodoList, (_, action) => action.value),
    on(deleteSelectedToDosByIds, (state, action) => state.filter(item => !action.value.includes(item.id))),
    on(deleteToDoById, (state, action) => state.filter(item => action.value !== item.id)),
    on(editToDoItem, (state, action) => {
        const foundIndex = state.findIndex(item => item.id === action.value.id);
        return [...state.slice(0, foundIndex), action.value, ...state.slice(foundIndex + 1)];
    }),
    on(addToDoItem, (state, action) => [...state, action.value])
)

export const selectedToDoListReducer = createReducer(
    selectedToDoListState,
    on(updateSelectedToDos, (_, action) => action.value),
    on(deleteSelectedToDosByIds, (state, action) => state.filter(item => !action.value.includes(item.id))),
    on(deleteToDoById, (state, action) => state.filter(item => action.value !== item.id))
)

export const editToDoStateReducer = createReducer(
    editToDoState,
    on(editToDoItem, (_, action) => action.value)
)

export const loadingStateReducer = createReducer(
    loadingState,
    on(setLoading, (_, action) => action.value)
)
