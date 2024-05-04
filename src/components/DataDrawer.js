import React, { useState } from "react";
import { Button, Form, Input, Steps, Select, Space } from "antd";
import {
  LoginOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const DataDrawer = ({
  studentId,
  loginDetails,
  profileDetails,
  setLoginDetails,
  setProfileDetails,
  onRowModify,
  closeDrawer,
}) => {
  const [current, setCurrent] = useState(0);

  const prevStep = () => {
    setCurrent((current) => current - 1);
  };

  const onFinishLoginForm = (values) => {
    setLoginDetails(values);
    setCurrent(1);
  };
  const onFinishProfileForm = (values) => {
    setProfileDetails(values);
    setCurrent(2);
  };

  const onFinishForm = () => {
    onRowModify({ ...loginDetails, ...profileDetails, id: studentId });
    setCurrent(0);
    closeDrawer();
    setLoginDetails(null);
    setProfileDetails(null);
  };

  const isStepDisabled = (stepNumber) => {
    if (stepNumber === 0) {
      return false;
    }
    if (stepNumber === 1) {
      return loginDetails === null;
    }
    if (stepNumber === 2) {
      return loginDetails === null || profileDetails === null;
    }
  };

  const forms = [
    <LoginForm onFinish={onFinishLoginForm} initialValues={loginDetails} />,
    <ProfileForm
      onPrev={prevStep}
      onFinish={onFinishProfileForm}
      initialValues={profileDetails}
    />,
    <Finish onPrev={prevStep} onAdd={onFinishForm} />,
  ];
  return (
    <div>
      <Steps
        style={{ padding: "32px 16px" }}
        onChange={setCurrent}
        current={current}
      >
        <Steps.Step
          disabled={isStepDisabled(0)}
          title="Login"
          icon={<LoginOutlined />}
        />
        <Steps.Step
          disabled={isStepDisabled(1)}
          title="Profile"
          icon={<ProfileOutlined />}
        />
        <Steps.Step
          disabled={isStepDisabled(2)}
          title="Finish"
          icon={<CheckCircleOutlined />}
        />
      </Steps>
      {forms[current]}
    </div>
  );
};

const LoginForm = ({ onFinish, initialValues }) => {
  const [multipleSelected, setMultipleSelected] = useState(
    initialValues ? [...initialValues.expertise] : []
  );

  const onFormSubmit = (values) => {
    values.expertise = multipleSelected;
    onFinish({ ...values });
  };

  const handleChange = (values) => {
    setMultipleSelected([...values]);
  };

  const options = [
    { label: "frontend", value: "frontend " },
    { label: "backend", value: "backend " },
    { label: "fullstack", value: "fullstack " },
    { label: "database", value: "database " },
  ];

  return (
    <div style={{ width: "40rem", marginLeft: "25rem" }}>
      <Form
        layout={"vertical"}
        onFinish={onFormSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          label="email"
          name="email"
          initialValue={""}
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Skills" name="expertise">
          <MultiSelect
            initialValues={initialValues ? initialValues.expertise : []}
            options={options}
            handleSubmit={handleChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const MultiSelect = ({ options, handleSubmit, initialValues }) => {
  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Select
        mode="multiple"
        allowClear
        defaultValue={initialValues}
        placeholder="Please select"
        onChange={handleSubmit}
        options={options}
      />
    </Space>
  );
};

const ProfileForm = ({ onPrev, onFinish, initialValues }) => {
  return (
    <div style={{ width: "40rem", marginLeft: "25rem" }}>
      <Form
        layout={"vertical"}
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your first name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please enter your address",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button onClick={() => onPrev()}>Prev</Button>&nbsp;&nbsp;
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const Finish = ({ onPrev, onAdd }) => {
  const finish = () => {
    onAdd();
  };
  return (
    <div style={{ width: "40rem", marginLeft: "25rem" }}>
      <h1>You are all set</h1>
      <Button onClick={() => onPrev()}>Prev</Button>&nbsp;&nbsp;
      <Button type="primary" onClick={finish}>
        Submit
      </Button>
    </div>
  );
};

export default DataDrawer;
