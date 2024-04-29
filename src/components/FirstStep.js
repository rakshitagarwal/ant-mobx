import { Button, Form, Input } from "antd";

const LoginForm = ({ onFinish, initialValues }) => {
    return (
      <Form onFinish={onFinish} initialValues={initialValues}>
        <Form.Item
          label="email"
          name={"emailAddress"}
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
  
        <Form.Item
          label="Password"
          name={"password"}
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Continue
          </Button>
        </Form.Item>
      </Form>
    );
  };

  export default LoginForm;