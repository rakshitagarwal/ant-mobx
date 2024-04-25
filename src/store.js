// import { v4 as uuidv4 } from "uuid";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class InputForm {
  firstName = "";
  lastName = "";
  designation = "";
  graduate = false;
  gender = "";
  workPlace = "";

  constructor(firstName, lastName, designation, graduate, gender, workPlace) {
    makeAutoObservable(this);
    this.firstName = firstName;
    this.lastName = lastName;
    this.designation = designation;
    this.graduate = graduate;
    this.gender = gender;
    this.workPlace = workPlace;
  }
}

class InputStore {
  todos = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(firstName, lastName, designation, graduate, gender, workPlace) {
    this.todos.push(
      new InputForm(firstName, lastName, designation, graduate, gender, workPlace)
    );
  }

}

export const inputStore = new InputStore();
export const inputStoreContext = createContext(inputStore);

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
