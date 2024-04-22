import { observer } from "mobx-react-lite";
import { Card } from "antd";
import { useContext } from "react";
import { TodoStoreContext } from "../store2";

const VisibleCards = observer(() => {
  const store = useContext(TodoStoreContext);

  return (
    <ul>
      {store.todos.map((todo, i) => (
        <Card key={i} hoverable style={{ width: 240 }}>
          <p><b>First Name:</b> {todo.firstName}</p>
          <p><b>Last Name:</b> {todo.lastName}</p>
          <p><b>Designation:</b> {todo.designation}</p>
        </Card>
      ))}
    </ul>
  );
});

export default VisibleCards;
