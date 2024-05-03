import React, { useState } from "react";
import { Button, Drawer, Modal, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import tempStudents from "../initialDB";
import DataDrawer from "./DataDrawer";

const Research = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dataSource, setDataSource] = useState(tempStudents);
  const [loginDetails, setLoginDetails] = useState({ email: '', expertise: []});
  const [profileDetails, setProfileDetails] = useState({ name: '', address: ''});
  const [editingStudent, setEditingStudent] = useState({ ...loginDetails, ...profileDetails, id: 0});

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
    setLoginDetails({ email: record.email, expertise: record.expertise});
    setProfileDetails({ name: record.name, address: record.address});
    setEditingStudent({ ...record });
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onFinishClosed = () => {
    setOpen(false);
  };

  const onCloseAdd = () => {
    Modal.confirm({
      title: "Are you sure, you want to close add student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setOpen(false);
        setLoginDetails({ email: '', expertise: []});
        setProfileDetails({ name: '', address: ''});
      },
    });
  };

  const onCloseEdit = () => {
    Modal.confirm({
      title: "Are you sure, you want to close edit student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setIsEditing(false);
        setLoginDetails({ email: '', expertise: []});
        setProfileDetails({ name: '', address: ''});
        setEditingStudent({ email: '', expertise: [], name: '', address: '', id: 0});
      },
    });
  };

  const onAddFinish = (obj) => {
    const newStudent = {
      id: obj.id,
      name: obj.name,
      email: obj.email,
      address: obj.address,
      expertise: [...obj.expertise],
    };
    setDataSource((prev) => [...prev, newStudent]);
  };

  const onEditFinish = (editingStudent) => {
    setDataSource((prev) =>
      prev.map((student) =>
        student.id === editingStudent.id ? editingStudent : student
      )
    );
    setIsEditing(false);
  };
  return (
    <>
      <Space>
        <Button
          style={{ marginLeft: "40px", marginBottom: "20px" }}
          type="primary"
          onClick={showDrawer}
        >
          Add a new Student
        </Button>
      </Space>
      <Drawer
        title="Add a new Student"
        placement={"top"}
        width={500}
        height={"100%"}
        onClose={onCloseAdd}
        destroyOnClose={true}
        open={open}
      >
        <DataDrawer
          studentId={dataSource.length + 1}
          loginDetails={loginDetails}
          profileDetails={profileDetails}
          setLoginDetails={setLoginDetails}
          setProfileDetails={setProfileDetails}
          onRowModify={onAddFinish}
          closeDrawer={onFinishClosed}
        />
      </Drawer>

      {isEditing && (
        <Drawer
          title="Edit Student"
          placement={"top"}
          width={500}
          height={"100%"}
          onClose={onCloseEdit}
          open={isEditing}
        >
          <DataDrawer
            studentId={editingStudent.id}
            loginDetails={loginDetails}
            profileDetails={profileDetails}
            setLoginDetails={setLoginDetails}
            setProfileDetails={setProfileDetails}
            onRowModify={onEditFinish}
            closeDrawer={onFinishClosed}
          />
        </Drawer>
      )}

      <div style={{ marginLeft: "40px" }}>
        <Table columns={columns} dataSource={dataSource}></Table>
      </div>
    </>
  );
};

export default Research;
