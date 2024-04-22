import { useState, useContext } from "react";
import { TodoStoreContext } from "./store2";
import { observer } from "mobx-react";

const CreateTodo = observer(() => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [designation, setdesignation] = useState("");

  const store = useContext(TodoStoreContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim() && designation.trim()) {
      store.addTodo(firstName.trim(), lastName.trim(), designation.trim());
      setfirstName("");
      setlastName("");
      setdesignation("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setfirstName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="last name"
        value={lastName}
        onChange={(e) => setlastName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setdesignation(e.target.value)}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
});

export default CreateTodo;
