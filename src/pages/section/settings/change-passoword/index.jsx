import React from "react";
import { Card, Button, Form, Input, Flex } from "antd";
import {
  ArrowLeftOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleChangePassword = () => {};
  return (
    <>
      <Card>
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Change Password</h2>
          <Button
            className="bg-[#3e89a4]! text-white! text-base! font-medium! px-3! py-3!"
            onClick={() => {
              navigate(-1);
            }}
          >
         <ArrowLeftOutlined />   Go Back
          </Button>
        </div>
        <Form
          onFinish={handleChangePassword}
          layout="vertical"
          form={form}
          name="change_password_form"
        >
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter new password" },
              { min: 8, message: "Password must be at least 8 characters" },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[^\s]+$/,
                message:
                  "Password must contain letters, numbers, special characters and no spaces",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="New Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input placeholder="Confirm Password" />
          </Form.Item>

          <Flex gap="small">
            <Button
              htmlType="submit"
              type="primary"
              className="bg-[#3e89a4]! text-white!"
            >
              Save
            </Button>
            <Button
              htmlType="reset"
              danger
              onClick={() => {
                form.resetFields();
                navigate(-1);
              }}
            >
              Cancel
            </Button>
          </Flex>
        </Form>
      </Card>
    </>
  );
};

export default ChangePassword;
