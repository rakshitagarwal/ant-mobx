import React, { useState } from "react";
import { Button, Drawer, Input, Modal, Space, Table } from "antd";
import AddData from "./AddData";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import tempStudents from "../initialDB";

const Research = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState(tempStudents);

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

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onAddFinish = (obj) => {
    const newStudent = {
      id: dataSource.length + 1,
      name: obj.name,
      email: obj.email,
      address: obj.address,
    };
    setDataSource((prev) => [...prev, newStudent]);
  }
  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Add a new Student
        </Button>
      </Space>
      <Drawer
        title="Add a new Student"
        placement={"top"}
        width={500}
        onClose={onClose}
        open={open}
      >
        <AddData onAddRow={onAddFinish} closeDrawer={onClose}/>
      </Drawer>
      
      {/* code for table*/}
      <div style={{marginLeft:"40px"}}>
      <Table columns={columns} dataSource={dataSource}></Table>
      <Modal
        title="Edit Student"
        open={isEditing}
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
    </>
  );
};

export default Research;
