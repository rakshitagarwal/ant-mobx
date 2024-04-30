import { Steps } from "antd";
import {
  LoginOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import React, { useState } from "react";
import LoginForm from "./steps/FirstStep";
import ProfileForm from "./steps/SecondStep";
import Finish from "./steps/ThirdStep";

const Step = () => {
  const [current, setCurrent] = useState(0);
  const [loginDetails, setLoginDetails] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);

  const onFinishLoginForm = (values) => {
    setLoginDetails(values);
    setCurrent(1);
  };
  const onFinishProfileForm = (values) => {
    setProfileDetails(values);
    setCurrent(2);
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
      onFinish={onFinishProfileForm}
      initialValues={profileDetails}
    />,
    <Finish />,
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

export default Step;
