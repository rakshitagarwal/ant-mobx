import { Button, Table, Modal, Input } from "antd";
import { useContext, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { StudentsContext } from "../store";

import { toJS } from "mobx";

const DataTable = observer(() => {
  const store = useContext(StudentsContext);

  const columns = [
    {
      key: "1",
      title: "id",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "address",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [addingStudent, setAddingStudent] = useState({
    name: "",
    email: "",
    address: "",
  });

  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        store.deleteStudent(record.id);
      },
    });
  };

  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  const resetAdding = () => {
    setIsAdding(false);
    setAddingStudent({ name: "", email: "", address: "" });
  };

  const handleAddStudent = () => {
    setIsAdding(true);
  };

  const handleSaveAddingStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newStudent = {
      id: randomNumber,
      name: addingStudent.name,
      email: addingStudent.email,
      address: addingStudent.address,
    };
    store.addStudent(newStudent);
    resetAdding();
  };

  return (
    <div style={{ marginLeft: "40px" }}>
      <Button onClick={handleAddStudent}>Add a new Student</Button>
      <Table columns={columns} dataSource={toJS(store.students)}></Table>
      <Modal
        title="Add Student"
        visible={isAdding}
        okText="Save"
        onCancel={resetAdding}
        onOk={handleSaveAddingStudent}
      >
        <Input
          value={addingStudent.name}
          placeholder="Name"
          onChange={(e) =>
            setAddingStudent((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <Input
          value={addingStudent.email}
          placeholder="Email"
          onChange={(e) =>
            setAddingStudent((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <Input
          value={addingStudent.address}
          placeholder="Address"
          onChange={(e) =>
            setAddingStudent((prev) => ({ ...prev, address: e.target.value }))
          }
        />
      </Modal>
      <Modal
        title="Edit Student"
        visible={isEditing}
        okText="Save"
        onCancel={resetEditing}
        onOk={() => {
          store.editStudent(editingStudent);
          resetEditing();
        }}
      >
        <Input
          value={editingStudent?.name}
          onChange={(e) =>
            setEditingStudent((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
        <Input
          value={editingStudent?.email}
          onChange={(e) =>
            setEditingStudent((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <Input
          value={editingStudent?.address}
          onChange={(e) =>
            setEditingStudent((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
        />
      </Modal>
    </div>
  );
});

export default DataTable;
