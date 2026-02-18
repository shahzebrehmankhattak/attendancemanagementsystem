import React from "react";
import { Button, Card, Flex, Form, Input, message,Select,Switch } from "antd";
import { useCreateEmployeeMutation, useUpdateEmployeeMutation,useGetEmployeeByIdQuery } from "../../../../redux/apis/employeeApis";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetDepartmentsQuery } from "../../../../redux/apis/departmentApis";

import {
  ArrowLeftOutlined
} from "@ant-design/icons";

const EmployeeForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id)

  const [createEmployee, { isLoading: creating }] = useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: updating }] = useUpdateEmployeeMutation();
  const {data:getDepartment , isLoading: departmentLoading} = useGetDepartmentsQuery({})
  const { data: employeeData, isLoading: loadingEmployee } = useGetEmployeeByIdQuery(id, {
    skip: !isEdit,
  });

  React.useEffect(() => {
    if (employeeData) {
      form.setFieldsValue(employeeData);
    }
  }, [employeeData, form]);

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        await updateEmployee({ id, ...values }).unwrap();
        message.success("Employee Updated Successfully!");
      } else {
        await createEmployee(values).unwrap();
        message.success("Employee Created Successfully!");
      }
      navigate(-1);
    } catch (error) {
      console.log(error);
      message.error(error?.data?.message || "Operation failed");
    }
  };

  const optionsSource =
  getDepartment?.map((dept) => ({
    label: dept,
    value: dept,
  })) || [];

  const onChange = checked => {
    console.log(`switch to ${checked}`);
  };


  return (
    <Card>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">{isEdit ? 'Edit Employee':'Add Employee'}</h2>
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
        onFinish={handleSubmit}
        layout="vertical"
        form={form}
        name="employee_form"
      >
        <Form.Item
          name="deviceUserId"
          label="Device User Id"
          rules={[
            {
              required: true,
              message: "Please enter User Id should like 1003 ..",
            },
          ]}
        >
          <Input placeholder="User-Id" />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name Employee"
          rules={[{ required: true, message: "Please enter Employee Name" }]}
        >
          <Input placeholder="Employee-name" />
        </Form.Item>
        <Form.Item
          name="department"
          label="Department"
          rules={[{ required: true, message: "Please enter Department" }]}
        >
         <Select allowClear style={{ width: '100%' }} placeholder="Please select" loading={departmentLoading} options={optionsSource} />
        </Form.Item>
        <Form.Item
          name="active"
          label="Active"
          rules={[{ required: true, message: "Please enter Department" }]}
        >
         <Switch  onChange={onChange} />
        </Form.Item>
        <Flex gap='small'>
          <Button
            htmlType="submit"
            type="primary"
            className="bg-[#3e89a4]! text-white!"
            loading={creating || updating}
          >
            {isEdit ? 'Update' : 'Save'}
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
  );
};

export default EmployeeForm;
