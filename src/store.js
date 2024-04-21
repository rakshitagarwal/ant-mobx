import { makeAutoObservable } from "mobx";
import { createContext } from "react";

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
