import { observer } from "mobx-react-lite";
import { Card } from "antd";
import { useContext } from "react";
import { inputStoreContext } from "../store";

const VisibleCards = observer(() => {
  const store = useContext(inputStoreContext);
  return (
    <ul>
      {store.todos.map((todo, i) => (
        <Card key={i} hoverable style={{ width: 240 }}>
          <p><b>First Name:</b> {todo.firstName}</p>
          <p><b>Last Name:</b> {todo.lastName}</p>
          <p><b>Designation:</b> {todo.designation}</p>
          <p><b>Graduate:</b> {todo.graduate? "Graduate": "Not Graduate"}</p>
          <p><b>Work Place:</b> {todo.workPlace}</p>
          <p><b>Gender:</b> {todo.gender}</p>
        </Card>
      ))}
    </ul>
  );
});

export default VisibleCards;
