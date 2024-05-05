import React, { useContext, useState } from "react";
import { Button, Drawer, Modal, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DataDrawer from "./DataDrawer";
import { StudentsContext } from "../store";
import { toJS } from "mobx";
import { observer } from "mobx-react";

const Research = observer(() => {
  const store = useContext(StudentsContext);

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ email: "", expertise: [] });
  const [profileDetails, setProfileDetails] = useState({ name: "", address: ""});
  const [editingStudent, setEditingStudent] = useState({ ...loginDetails, ...profileDetails, id: 0 });

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
      title: "Skills",
      dataIndex: "expertise",
    },
    {
      key: "6",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                editDrawer(record);
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

  // delete student
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

  const addDrawer = () => {
    setOpen(true);
  };
  const onFinishClosed = () => {
    setOpen(false);
  };

  const resetStudent = () => {
    setLoginDetails({ email: "", expertise: [] });
    setProfileDetails({ name: "", address: "" });
    setEditingStudent({
      email: "",
      expertise: [],
      name: "",
      address: "",
      id: 0,
    });
  };

  // object values to be added
  const onAddFinish = (obj) => {
    const newStudent = {
      id: obj.id,
      name: obj.name,
      email: obj.email,
      address: obj.address,
      expertise: [...obj.expertise],
    };
    store.addStudent(newStudent);
  };

  // close drawer of add
  const onCloseAdd = () => {
    Modal.confirm({
      title: "Are you sure, you want to close add student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setOpen(false);
        resetStudent();
      },
    });
  };

  // close drawer of edit
  const onCloseEdit = () => {
    Modal.confirm({
      title: "Are you sure, you want to close edit student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setIsEditing(false);
        resetStudent();
      },
    });
  };

  // edit with initial values
  const editDrawer = (record) => {
    setIsEditing(true);
    setLoginDetails({ email: record.email, expertise: record.expertise });
    setProfileDetails({ name: record.name, address: record.address });
    setEditingStudent({ ...record });
  };

  // edit with updated values
  const onEditFinish = (editingStudent) => {
    store.editStudent(editingStudent);
    resetStudent();
    setIsEditing(false);
  };

  return (
    <>
      <Space>
        <Button
          style={{ marginLeft: "40px", marginBottom: "20px" }}
          type="primary"
          onClick={addDrawer}
        >
          Add a new Student
        </Button>
      </Space>
      <Drawer
        title={isEditing ? "Edit Student" : "Add a new Student"}
        placement={"top"}
        width={500}
        height={"100%"}
        onClose={isEditing ? onCloseEdit : onCloseAdd}
        destroyOnClose={true}
        open={isEditing ? isEditing : open}
      >
        <DataDrawer
          studentId={isEditing ? editingStudent.id : toJS(store.students).length + 1}
          loginDetails={loginDetails}
          profileDetails={profileDetails}
          setLoginDetails={setLoginDetails}
          setProfileDetails={setProfileDetails}
          onRowModify={isEditing ? onEditFinish : onAddFinish}
          closeDrawer={onFinishClosed}
          mode={isEditing}
        />
      </Drawer>

      <div style={{ marginLeft: "40px" }}>
        <Table columns={columns} dataSource={toJS(store.students)}></Table>
      </div>
    </>
  );
});

export default Research;
