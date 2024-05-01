import { Button, Form, Input, Steps } from "antd";
import {
  LoginOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import React, { useState } from "react";

const AddData = ({ onAddRow, closeDrawer }) => {
  const [current, setCurrent] = useState(0);
  const [loginDetails, setLoginDetails] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);

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
    onAddRow({ ...loginDetails, ...profileDetails });
    setCurrent(0);
    closeDrawer();
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
  return (
    <Form onFinish={onFinish} initialValues={initialValues}>
      <Form.Item
        label="email"
        name={"email"}
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

const ProfileForm = ({ onPrev, onFinish, initialValues }) => {
  return (
    <Form onFinish={onFinish} initialValues={initialValues}>
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
            message: "Please enter your last name",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button onClick={()=> onPrev()}>
          Prev
        </Button>&nbsp;&nbsp;
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

const Finish = ({ onPrev, onAdd }) => {
  const finish = () => {
    onAdd();
  };
  return (
    <>
      <h1>You are all set</h1>
      <Button onClick={()=> onPrev()}>
          Prev
        </Button>&nbsp;&nbsp;
      <Button type="primary" onClick={finish}>
        Add Student
      </Button>
    </>
  );
};

export default AddData;
