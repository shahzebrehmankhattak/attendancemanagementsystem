import React from "react";
import { Button, Input, Form, Flex, message } from "antd";
import logo from "../../../assets/mus-logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const DUMMY_EMAIL = "admin@example.com";
  const DUMMY_PASSWORD = "password";

  const handleLogin = (values) => {
    const { userEmail, userPassword } = values;

    if (
      userEmail === DUMMY_EMAIL &&
      userPassword === DUMMY_PASSWORD
    ) {
      message.success("Login successful!");
      navigate("/");
    } else {
      message.error("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 border shadow-2xl bg-gradient-to-r from-[#39444b] via-[#3b616f] to-[#3e89a4]">
      <div className="w-full max-w-md rounded-lg login-form-style">
        <h1 className="mb-6 text-center text-4xl flex justify-center items-center gap-2 ">
          Login <img src={logo} alt="" className="w-20" />
        </h1>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
        >
          <Form.Item
            name="userEmail"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="userPassword"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter password",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Flex gap="small" justify="center">
            <Button
              htmlType="submit"
              className="bg-[#3e89a4]! text-white!"
            >
              Login
            </Button>

            <Button
              htmlType="reset"
              danger
              onClick={() => form.resetFields()}
            >
              Cancel
            </Button>
          </Flex>
        </Form>
      </div>
    </div>
  );
};

export default Login;
