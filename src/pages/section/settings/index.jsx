import React from 'react'
import { Card, Col, Row,Flex } from 'antd'
import {
  EyeInvisibleOutlined,ClearOutlined,UserAddOutlined
} from "@ant-design/icons";
import { Link } from 'react-router-dom';

const Setting = () => {
  return (
    <>
    <Row gutter={[15,15]}>
      <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
      <Link to='/settings/change-password'>
      <Card hoverable className='!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] main-box-shadow'>
      <Flex justify="space-around" align="center" gap="small">
                <div className="border border-[#fff] rounded p-3 box-shadow">
                  <EyeInvisibleOutlined className="text-lg md:text-5xl !text-[#fff]" />
                </div>
                <Flex align="flex-start" justify="space-between">
                  <h3 className="text-white text-lg sm:text-3xl">Change Password</h3>
                </Flex>
              </Flex>
      </Card>
      </Link>
      </Col>
      <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
      <Link to='/settings/leaves-panel'>
      <Card hoverable className='!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] main-box-shadow'>
      <Flex justify="space-around" align="center" gap="small">
                <div className="border border-[#fff] rounded p-3 box-shadow">
                  <ClearOutlined className="text-lg md:text-5xl !text-[#fff]" />
                </div>
                <Flex align="flex-start" justify="space-between">
                  <h3 className="text-white text-lg sm:text-3xl">Leaves Panel</h3>
                </Flex>
              </Flex>
      </Card>
      </Link>
      </Col>
  
    </Row>
    
    
    </>
  )
}

export default Setting