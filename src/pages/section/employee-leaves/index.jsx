import React, { useState } from "react";
import { Table, Input, Button, Card,Tag } from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";

const EmplpoyeeLeave = () => {
    const [editingRow, setEditingRow] = useState(null);
    const [inputValue, setInputValue] = useState("");
  
    const handleAddRemark = (key) => {
      if (!inputValue) return;
  
      setDataSource((prev) =>
        prev.map((row) => {
          if (row.key === key) {
            return { ...row, remarks: [...row.remarks, inputValue] };
          }
          return row;
        })
      );
  
      setInputValue("");
      setEditingRow(null);
    };
  
    const [dataSource, setDataSource] = useState([
      { key: "4", 
        name: "Muhammad Usama",
        fromDate:"22-Dec-2025",
        toDate:"02-Jan-2026",
        reason:"Marriage Leave",
        remarks: [] 
      },
    ]);

const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "From Date", dataIndex: "fromDate", key: "fromDate" },
    { title: "To Date", dataIndex: "toDate", key: "toDate" },
    { title: "Reason", dataIndex: "reason", key: "reason", render: (_, record) => {
      let color;
      let reasonText = record.reason?.toLowerCase() || "absent";
      if (reasonText === "Marriage Leave") {
        color = "cyan";
      } else if (reasonText === "Sick") {
        color = "blue"; 
      } else {
        color = "red"; 
      }
      return(
      <Tag color={color} className="capitalize">
    {record.reason}
    </Tag>
      );
      }
     },
    {
      title: "Remarks",
      key: "remarks",
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          {record.remarks.map((remark, index) => (
            <span
              key={index}
              className="bg-gray-100 px-2 py-1 rounded flex items-center justify-between"
            >
              {remark}
            </span>
          ))}

          {editingRow === record.key ? (
            <div className="flex gap-2">
              <Input
                size="small"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add remark"
              />
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={() => handleAddRemark(record.key)}
              />
            </div>
          ) : (
            <Button
              size="large"
              onClick={() => setEditingRow(record.key)}
              className="!bg-[#39444b] !p-2 !text-white !text-[14px] !font-semibold"
            >
              <PlusOutlined className="!text-white" /> Add
            </Button>
          )}
        </div>
      ),
    },
  ];


  return (
    <div>
          <Card className="w-full bg-gray-200">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={true}
              bordered
              className="bg-white rounded-2xl"
            />
          </Card>
        </div>
  )
}

export default EmplpoyeeLeave