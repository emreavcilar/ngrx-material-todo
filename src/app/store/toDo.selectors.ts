import { createSelector } from "@ngrx/store";
import { StoreDTO } from "../models/Store";

export const selectLoading = (store: StoreDTO) => store.loading;

export const selectSelectedToDoItems = (store: StoreDTO) => store.selectedToDoItems;

export const selectAllToDoItems = (store: StoreDTO) => store.toDoListItems;

export const selectSelectedToDoItemsIds = createSelector(selectSelectedToDoItems, (state) => state.map(item => item.id));

export const selectSelectedToDoItemsLength = createSelector(selectSelectedToDoItems, (state) => state.length);

export const selectAllToDoItemsLength = createSelector(selectAllToDoItems, (state) => state.length)


