/* 
In React it's common use to use one state instead of using multiple states
but as I've learned using multiple states is a common use in Angular NgRx. 
As you may see there are syntax differences between ecosystems. 
So I learned a new thing :) Thanks!

If I coded in React I create the reducer like below

import { TodoItem } from "../../models/TodoItem";

// enums should be defined in enums folder. it is neede in actions class too
enum TodoActionTypes {
  SET_TODO_LIST = '[TodoList] SetToDoList',
  DELETE_SELECTED_TODOS_BY_IDS = '[TodoList] DeleteSelectedToDosByIds',
  DELETE_TODO_BY_ID = '[TodoList] DeleteToDoById',
  EDIT_TODO_ITEM = '[TodDoList] EditToDoItem',
  ADD_TODO_ITEM = '[ToDoList] AddToDoItem',
}

export interface ITodoState {
    readonly todoList: TodoItem[],
    readonly selectedTodoList: TodoItem[],
    readonly editToDo: TodoItem,
    readonly loadingState: Boolean
}

const initialState: ITodoState = {
    todoList: [],
    selectedTodoList:[],
    editToDo: null,
    loadingState:false
}

interface SetTodoListAction {
  type: TodoActionTypes.SET_TODO_LIST;
  payload: TodoItem[];
}

interface DeleteSelectedTodosByIdsAction {
  type: TodoActionTypes.DELETE_SELECTED_TODOS_BY_IDS;
  payload: number[];
}

interface DeleteTodoByIdAction {
  type: TodoActionTypes.DELETE_TODO_BY_ID;
  payload: number;
}

interface EditTodoItemAction {
  type: TodoActionTypes.EDIT_TODO_ITEM;
  payload: TodoItem;
}

interface AddTodoItemAction {
  type: TodoActionTypes.ADD_TODO_ITEM;
  payload: TodoItem;
}

interface UpdateSelectedTodosAction {
  type: TodoActionTypes.UPDATE_SELECTED_TODOS;
  payload: TodoItem[];
}

interface SetLoadingAction {
  type: TodoActionTypes.SET_LOADING;
  payload: boolean;
}

type TodoActions =
  | SetTodoListAction
  | DeleteSelectedTodosByIdsAction
  | DeleteTodoByIdAction
  | EditTodoItemAction
  | AddTodoItemAction
  | UpdateSelectedTodosAction
  | SetLoadingAction;


const todoReducer = (
  state = initialState,
  action: TodoActions
): ITodoState => {
  switch (action.type) {
    case TodoActionTypes.SET_TODO_LIST:
      return {
        ...state,
        todoList: action.payload,
      };
    case TodoActionTypes.DELETE_SELECTED_TODOS_BY_IDS:
      return {
        ...state,
        todoList: state.todoList.filter(todo => !action.payload.includes(todo.id)),
        selectedTodoList: state.selectedTodoList.filter(todo => !action.payload.includes(todo.id)),
      };
    case TodoActionTypes.DELETE_TODO_BY_ID:
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== action.payload),
        selectedTodoList: state.selectedTodoList.filter(todo => todo.id !== action.payload),
      };
    case TodoActionTypes.EDIT_TODO_ITEM:
      const index = state.todoList.findIndex(todo => todo.id === action.payload.id);
      const updatedTodos = [...state.todoList];
      if (index !== -1) updatedTodos[index] = action.payload;
      return {
        ...state,
        todoList: updatedTodos,
        editToDo: action.payload,
      };
    case TodoActionTypes.ADD_TODO_ITEM:
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    case TodoActionTypes.UPDATE_SELECTED_TODOS:
      return {
        ...state,
        selectedTodoList: action.payload,
      };
    case TodoActionTypes.SET_LOADING:
      return {
        ...state,
        loadingState: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;

*/

import { createReducer, on } from "@ngrx/store";
import { TodoItem } from "../../models/TodoItem";
import { editToDoItem, deleteSelectedToDosByIds, setLoading, setTodoList, addToDoItem, updateSelectedToDos, deleteToDoById } from "./actions";

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
