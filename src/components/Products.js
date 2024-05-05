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
    form.resetFields();
    alert("Form submission successful");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: "100%",
        marginRight: "90px",
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row>
        <Col span={12}>
          <>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input your First Name!",
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
                  message: "Please input your Designation!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
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
          </>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Work Place"
            name="workPlace"
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
            label="Graduate"
            name="graduate"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
            }}
          >
            <Checkbox></Checkbox>
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
        </Col>
      </Row>
    </Form>
  );
};
export default InputForm;
