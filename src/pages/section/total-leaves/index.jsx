import React, { useState } from "react";
import { Table, Input, Button, Card, Tag } from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";

const TotalLeaves = () => {
  const [dataSource, setDataSource] = useState([
    { key: "1", name: "Casual Leave Per Year", totalLeaves: "24" },
    { key: "2", name: "Half Leave Per Month", totalLeaves: "4" },
    { key: "3", name: "Short Leaves Per Month", totalLeaves: "2" },
    { key: "4", name: "Sick Leaves Per Year", totalLeaves: "10" },
  ]);
  const columns = [
    { title: "Leave Name", dataIndex: "name", key: "name" },
    { title: "Total Leave", dataIndex: "totalLeaves", key: "totalLeaves" },
  ];
  return (
    <>
      <Card className=" bg-gray-200">

        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered
          className="bg-white rounded-2xl"
        />
      </Card>
    </>
  );
};

export default TotalLeaves;
