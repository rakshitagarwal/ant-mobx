import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class InputStore {
  todos = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(firstName, lastName, designation, graduate, gender, workPlace) {
    this.todos.push({
      firstName,
      lastName,
      designation,
      graduate,
      gender,
      workPlace,
    });
  }
}

export const inputStore = new InputStore();
export const inputStoreContext = createContext(inputStore);

class Students {
  students = [];

  constructor() {
    makeAutoObservable(this);
  }

  addStudent(student) {
    this.students.push(student);
  }
  deleteStudent(id) {
    this.students = this.students.filter((student) => student.id !== id);
  }
  editStudent(editingStudent) {
    this.students = this.students.map((student) =>
      student.id === editingStudent.id ? editingStudent : student
    );
  }
}

export const inputStudent = new Students();
export const StudentsContext = createContext(inputStudent);

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
