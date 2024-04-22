import { observer } from "mobx-react-lite";
import { Card } from "antd";
import { useContext } from "react";
import { TodoStoreContext } from "./store2";

const TodoItem = observer(({ todo }) => {
  const store = useContext(TodoStoreContext);

  return (
    <ul>
      {store.todos.map((todo) => (
        <Card hoverable style={{ width: 240 }}>
          <h4>First Name: {todo.firstName}</h4>
          <h4>Last Name: {todo.lastName}</h4>
          <h4>Designation: {todo.designation}</h4>
        </Card>
      ))}
    </ul>
  );
});

export default TodoItem;
