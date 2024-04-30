import { Button, Form, Input } from "antd";

const ProfileForm = ({ onFinish, initialValues }) => {
  return (
    <Form onFinish={onFinish} initialValues={initialValues}>
      <Form.Item
        label="First Name"
        name="firstName"
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
        label="Last Name"
        name="lastName"
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
        <Button type="primary" htmlType="submit">
          Continue
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
