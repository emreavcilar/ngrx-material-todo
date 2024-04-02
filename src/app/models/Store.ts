import { TodoItem } from "./TodoItem";

export interface StoreDTO {
    toDoListItems: TodoItem[],
    selectedToDoItems: TodoItem[],
    editToDoItem: TodoItem,
    loading: boolean
}