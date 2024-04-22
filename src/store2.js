// import { v4 as uuidv4 } from "uuid";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class Todo {
  firstName = "";
  lastName = "";
  designation = "";

  constructor(firstName, lastName, designation) {
    makeAutoObservable(this);
    this.firstName = firstName;
    this.lastName = lastName;
    this.designation = designation;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

class TodoStore {
  todos = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(firstName, lastName, designation) {
    this.todos.push(new Todo(firstName, lastName, designation));
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}

export const todoStore = new TodoStore();
export const TodoStoreContext = createContext(todoStore);

class Collapse {
    open = true;
  
    constructor(open) {
      makeAutoObservable(this);
      this.open = open;
    }
  
    toggleCollapse() {
      this.open = !this.open;
    }
  }
  
  export const collapseStore = new Collapse();
  export const CollapseStoreContext = createContext(collapseStore);