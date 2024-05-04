import React, { useContext } from "react";
import { Button, Checkbox, Form, Input, Radio, Select, Col, Row } from "antd";
import { inputStoreContext } from "../store";
const { Option } = Select;

const InputForm = () => {
  const store = useContext(inputStoreContext);

  const [form] = Form.useForm();

  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({
          note: "Hi, man!",
        });
        break;
      case "female":
        form.setFieldsValue({
          note: "Hi, lady!",
        });
        break;
      case "other":
        form.setFieldsValue({
          note: "Hi there!",
        });
        break;
      default:
    }
  };

  const onFinish = (values) => {
    store.addTodo(
      values.firstName,
      values.lastName,
      values.designation,
      values.graduate,
      values.gender,
      values.workPlace
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col span={4}></Col>
      <Col span={20}>
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
            name="workPlace"
            label="Work Place"
            rules={[
              {
                required: true,
                message: "Please select your work place!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="office">In Office</Radio>
              <Radio value="home">Work from home</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Your gender"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="graduate"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Graduate</Checkbox>
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
      </Col>
    </Row>
  );
};
export default InputForm;
