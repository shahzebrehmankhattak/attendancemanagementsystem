import { Button, Card,message,Table } from 'antd'
import React,{useState} from 'react'
import {
  CloseOutlined,CheckOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const LeavesRequest = () => {
  const navigate = useNavigate();
   const [dataSource, setDataSource] = useState([
      { key: "1", name: "Shahzeb Rehman Khattak", subject: "Application For Leave", messge:"Testing" },
    ]);
    const columns = [
      { title: "Employee Name", dataIndex: "name", key: "name" },
      { title: "Subject", dataIndex: "subject", key: "subject" },
      { title: "Message", dataIndex: "messge", key: "messge" },
      { title: "Action", dataIndex: "totalLeaves", key: "totalLeaves", render: (_, record) =>(

        <div className="flex gap-1 items-center">
<Button className="!bg-[#39444b] !text-white" 
onClick={()=> {
  message.success("Leave Approved")
}}
> <CheckOutlined /> Approved</Button>
<Button danger> <CloseOutlined />Rejected</Button>

        </div>
        ), 
      },
    ];
  return (
    <>
    <Card>
              <h2 className="text-2xl font-semibold">Request</h2>
              <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered
          className="bg-white rounded-2xl"
        />
    </Card>
    
    
    </>
  )
}

export default LeavesRequest