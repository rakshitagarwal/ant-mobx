import { useContext } from "react";
import { observer } from "mobx-react";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";
import { TodoStoreContext } from "./store2";

const App = observer(() => {
  const store = useContext(TodoStoreContext);
  return (
    <div style={{ margin: "20px" }}>
      <h1>Todo App using MobX+React</h1>
      <CreateTodo />
      <TodoItem />
    </div>
  );
});

export default App;
