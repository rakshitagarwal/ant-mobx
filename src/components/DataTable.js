import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function DataTable() {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [addingStudent, setAddingStudent] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      address: "John Address",
    },
    {
      id: 2,
      name: "David",
      email: "david@gmail.com",
      address: "David Address",
    },
    {
      id: 3,
      name: "James",
      email: "james@gmail.com",
      address: "James Address",
    },
    {
      id: 4,
      name: "Sam",
      email: "sam@gmail.com",
      address: "Sam Address",
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Actions",
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

  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((prev) => {
          return prev.filter((student) => student.id !== record.id);
        });
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
    setDataSource((prev) => [...prev, newStudent]);
    resetAdding();
  };

  return (
    <div style={{marginLeft:"40px"}}>
      <Button onClick={handleAddStudent}>Add a new Student</Button>
      <Table columns={columns} dataSource={dataSource}></Table>
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
          setDataSource((prev) =>
            prev.map((student) =>
              student.id === editingStudent.id ? editingStudent : student
            )
          );
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
}

export default DataTable;
