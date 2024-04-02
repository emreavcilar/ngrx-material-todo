import { Injectable } from '@angular/core';
import { delay, map, of, tap } from 'rxjs';
import { TodoItem } from '../models/TodoItem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  taskList = [
    { id: 1, task: "Go for a run", completed: false },
    { id: 2, task: "Read a book", completed: false },
    { id: 3, task: "Buy groceries", completed: false },
    { id: 4, task: "Finish homework", completed: false },
    { id: 5, task: "Call mom", completed: false },
    { id: 6, task: "Clean the house", completed: false },
    { id: 7, task: "Attend meeting", completed: false },
    { id: 8, task: "Write report", completed: false },
    { id: 9, task: "Practice guitar", completed: false },
    { id: 10, task: "Pay bills", completed: false }
  ];

  constructor() { }

  getTasks() {
    return of(this.taskList).pipe(delay(1000))
  }

  deleteTasks(idsToDelete: number[]) {
    return of(true).pipe(delay(1000))
  }

  deleteTask(idToDelete: number) {
    return of(true).pipe(delay(1000));
  }

  editTask(toDoItem: TodoItem) {
    return of(true).pipe(delay(1000));
  }

  addTask(toDoItem: { task: string }) {
    return of(true).pipe(delay(1000), tap(() => { 
      this.taskList = [...this.taskList, {
        ...toDoItem,
        id: this.taskList[this.taskList.length - 1].id + 1,
        completed: false
      }]
    })).pipe(map(() => this.taskList[this.taskList.length - 1]));
  }

}
