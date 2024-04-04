/*
As I mentioned in effects I am not familiar with selectors but it is used for 
memoization that means they only recompute when input slices of state that they
depend on have changed. 

In React we use useState and useReducer hooks for these kind of change triggers. 
Also useSelector hook selecting state from the redux store becomes effective 
and directly within the component. 

This usage also makes difference in the component side. For example instead of calling
API call action directly in the component, the selector is used for it.
*/


import { createSelector } from "@ngrx/store";
import { StoreDTO } from "../../models/Store";

export const selectLoading = (store: StoreDTO) => store.loading;

export const selectSelectedToDoItems = (store: StoreDTO) => store.selectedToDoItems;

export const selectAllToDoItems = (store: StoreDTO) => store.toDoListItems;

export const selectSelectedToDoItemsIds = createSelector(selectSelectedToDoItems, (state) => state.map(item => item.id));

export const selectSelectedToDoItemsLength = createSelector(selectSelectedToDoItems, (state) => state.length);

export const selectAllToDoItemsLength = createSelector(selectAllToDoItems, (state) => state.length)


