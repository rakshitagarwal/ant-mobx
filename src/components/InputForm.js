import React, { useContext, useState } from "react";
import { Button, Form, Input } from "antd";
import { TodoStoreContext } from "../store2";

const InputForm = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [designation, setdesignation] = useState("");

  const store = useContext(TodoStoreContext);

  const onFinish = (values) => {
    console.log("Success:", values);
      store.addTodo(values.firstName, values.lastName, values.designation);
      setfirstName("");
      setlastName("");
      setdesignation("");
    
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Designation"
        name="designation"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default InputForm;
