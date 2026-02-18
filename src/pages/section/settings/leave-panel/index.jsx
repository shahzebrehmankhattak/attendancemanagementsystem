import React from 'react'
import { Card, Button, Form, Input, Flex } from "antd";
import {
  ArrowLeftOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const LeavesPanel = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleAddLeave = () => {};
  return (
    <>
      <Card>
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Leaves Panel</h2>
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
          onFinish={handleAddLeave}
          layout="vertical"
          form={form}
          name="leaves_form"
        >
          <Form.Item
            name="name"
            label="Leaves Name"
            rules={[
              { required: true, message: "Please Enter Leave Name" },
            ]}
          >
            <Input placeholder="Leave Name" />
          </Form.Item>
          <Form.Item
            name="numberOfLeaves"
            label="Number Of Leaves"
            rules={[
              { required: true, message: "Please Enter Total Number of Leaves" },
              { min: 2, message:"Please Enter Minimum 2 Leaves" },
            ]}
          >
            <Input placeholder="Number Of Leaves" />
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
  )
}

export default LeavesPanel