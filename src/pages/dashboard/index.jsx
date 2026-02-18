import { Card, Col, Divider, Flex, Row } from "antd";
import React from "react";
import {
  UserOutlined,
  CheckOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  UserDeleteOutlined,
  PullRequestOutlined,
  VerticalRightOutlined,DollarOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import TotalLeaves from "../section/total-leaves";
import LineChartComponent from "../../components/charts/lineChart";

const MainDashboard = () => {
  return (
    <Card>
      <Row gutter={[15, 15]}>
        <Col xl={18} lg={18} md={24} xs={24}>
          <div className="bg-gradient-to-r from-[#39444b] via-[#3b616f] to-[#3e89a4] main-box-shadow p-2 mb-4 rounded-lg">
            <div className="flex justify-center md:justify-between items-center flex-wrap">
              <h1  className="text-2xl text-center md:text-start capitalize text-white "
              style={{ marginBottom: "0px" }}>Dashboard</h1>
            <h2
              className="text-2xl text-center md:text-start capitalize text-white "
              style={{ marginBottom: "0px" }}
            >
              Have A Good Friday
            </h2>
            </div>
          </div>
          <Row gutter={[15, 15]}>
            <Col xl={8} lg={8} md={12} xs={24}>
              <Link to="/employees">
                <Card
                  hoverable
                  className="!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] main-box-shadow"
                >
                  <Flex justify="space-around" align="center" gap="small">
                    <div className="border border-[#fff] rounded p-3 box-shadow">
                      <UserOutlined className="text-lg lg:text-5xl !text-[#fff]" />
                    </div>
                    <Flex align="flex-start" justify="space-between">
                      <h3 className="text-white text-lg lg:text-3xl">
                        Employees
                      </h3>
                    </Flex>
                  </Flex>
                </Card>
              </Link>
            </Col>
            <Col xl={8} lg={8} md={12} xs={24}>
              <Link to="/attendance">
                <Card
                  hoverable
                  className="!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] main-box-shadow"
                >
                  <Flex justify="space-around" align="center" gap="small">
                    <div className="border border-[#fff] rounded p-3 box-shadow">
                      <CheckOutlined className="text-lg lg:text-5xl !text-[#fff]" />
                    </div>
                    <Flex align="flex-start" justify="space-between">
                      <h3 className="text-white text-lg lg:text-3xl">
                        Attendance
                      </h3>
                    </Flex>
                  </Flex>
                </Card>
              </Link>
            </Col>
            <Col xl={8} lg={8} md={12} xs={24}>
              <Link to="/full-month-sheet">
                <Card
                  hoverable
                  className="!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] main-box-shadow"
                >
                  <Flex justify="space-around" align="center" gap="small">
                    <div className="border border-[#fff] rounded p-3 box-shadow">
                      <CalendarOutlined className="text-lg lg:text-5xl !text-[#fff]" />
                    </div>
                    <Flex vertical align="flex-start" justify="space-between">
                      <h3 className="text-white text-lg lg:text-3xl">
                        Current Month
                      </h3>
                    </Flex>
                  </Flex>
                </Card>
              </Link>
            </Col>
          </Row>

          <Row gutter={[15, 15]} className="mt-2">
            <Col xl={16} lg={16} md={24} xs={24}>
              <div className="max-h-[500px] h-auto !w-full overflow-scroll">
                <LineChartComponent />
              </div>
            </Col>
            <Col xl={8} lg={8} md={24} xs={24}>
              <Link to="/employee-payroll">
                <Card
                  hoverable
                  className="!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] main-box-shadow"
                >
                  <Flex justify="space-around" align="center" gap="small">
                    <div className="border border-[#fff] rounded p-3 box-shadow">
                      <DollarOutlined className="text-lg lg:text-5xl !text-[#fff]" />
                    </div>
                    <Flex
                      align="flex-start"
                      justify="space-between"
                      className="!flex-col"
                    >
                      <h3 className="text-white text-lg lg:text-3xl">
                        Emp Payroll
                      </h3>
                    </Flex>
                  </Flex>
                </Card>
              </Link>
              <Link to="/employee-on-leave">
                <Card
                  hoverable
                  className="!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] main-box-shadow !mt-2"
                >
                  <Flex justify="space-around" align="center" gap="small">
                    <div className="border border-[#fff] rounded p-1 md:p-3 box-shadow">
                      <UserDeleteOutlined className="text-lg lg:text-5xl !text-[#fff]" />
                    </div>
                    <Flex vertical align="flex-start" justify="space-between">
                      <h3 level={2} className="text-white text-lg lg:text-3xl">
                        Emp on Leave
                      </h3>
                    </Flex>
                  </Flex>
                </Card>
              </Link>
              <Link to="/event-calender">
                <Card
                  hoverable
                  className="!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] main-box-shadow !mt-2"
                >
                  <Flex justify="space-around" align="center" gap="small">
                    <div className="border border-[#fff] rounded p-1 md:p-3 box-shadow">
                    <ScheduleOutlined className="text-lg lg:text-5xl !text-[#fff]" />
                    </div>
                    <Flex vertical align="flex-start" justify="space-between">
                      <h3 level={2} className="text-white text-lg lg:text-3xl">
                        Events Calender
                      </h3>
                    </Flex>
                  </Flex>
                </Card>
              </Link>
            </Col>
          </Row>
          <Row gutter={[15, 15]} className="mt-4">
            <Col xl={7} lg={8} md={24} xs={24}>
              {/* <Link to="/event-calender">
                <Card
                  hoverable
                  className="!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] main-box-shadow"
                >
                  <Flex justify="space-around" align="center" gap="small">
                    <div className="border border-[#fff] rounded p-1 md:p-3 box-shadow">
                      <CalendarOutlined className="text-lg lg:text-5xl !text-[#fff]" />
                    </div>
                    <Flex vertical align="flex-start" justify="space-between">
                      <h3 level={2} className="text-white text-lg lg:text-3xl">
                        Events Calender
                      </h3>
                    </Flex>
                  </Flex>
                </Card>
              </Link> */}
              <Link to="/leaves-request">
                <Card
                  hoverable
                  className="!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] main-box-shadow !mt-3"
                >
                  <Flex justify="space-around" align="center" gap="small">
                    <div className="border border-[#fff] rounded p-1 md:p-3 box-shadow">
                      <PullRequestOutlined className="text-lg lg:text-5xl !text-[#fff]" />
                    </div>
                    <Flex vertical align="flex-start" justify="space-between">
                      <h3 level={2} className="text-white text-lg lg:text-3xl">
                        Leave Request
                      </h3>
                    </Flex>
                  </Flex>
                </Card>
              </Link>
            </Col>
            <Col xl={17} lg={16} md={24} xs={24}>
              <div className="!w-full overflow-hidden">
                <TotalLeaves />
              </div>
            </Col>
          </Row>
        </Col>
        {/* second events bar */}
        <Col xl={6} lg={6} md={24} xs={24}>
          <Row>
            <Col xl={24} lg={24} md={24} xs={24}>
              <Card
                hoverable
                className="!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] main-box-shadow"
              >
                <span className="text-white text-lg lg:text-xl ">
                  Reminders
                </span>
                <Divider
                  style={{ border: "1px solid white", marginTop: "2px" }}
                />
                <div className="border border-white rounded-lg">
                  <div className="flex justify-evenly  items-center p-1">
                    <div className="border border-[#fff] p-1 md:p-1 box-shadow rounded-full w-[40px] h-[40px] text-center">
                      <VerticalRightOutlined className="text-sm lg:text-2xl !text-[#fff]" />
                    </div>
                    <div className="grid gap-2">
                      <span className="text-lg font-base text-white">
                        Interview Schedule
                      </span>
                      <span className="text-sm font-base text-white mb-2">
                        Date:05/Jan/2026
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border border-white rounded-lg mt-2">
                  <div className="flex justify-evenly  items-center p-1">
                    <div className="border border-[#fff] p-1 md:p-1 box-shadow rounded-full w-[40px] h-[40px] text-center">
                      <VerticalRightOutlined className="text-sm lg:text-2xl !text-[#fff]" />
                    </div>
                    <div className="grid gap-2">
                      <span className="text-lg font-base text-white">
                        New Hiring
                      </span>
                      <span className="text-sm font-base text-white mb-2">
                        XYZ Joined Today
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xl={24} lg={24} md={24} xs={24}>
              <Card
                hoverable
                className="!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] main-box-shadow h-[75vh]"
              >
                <span className="text-white text-lg lg:text-xl ">
                  News & Events
                </span>
                <Divider
                  style={{ border: "1px solid white", marginTop: "2px" }}
                />
                <marquee behavior="scroll" direction="up"  height="100%" scrollamount="5" className="p-2">

                <div className="border border-white rounded-lg">
                  <div className="flex justify-evenly  items-center p-1">
                    <div className="border border-[#fff] p-1 md:p-1 box-shadow rounded-full w-[40px] h-[40px] text-center">
                      <VerticalRightOutlined className="text-sm lg:text-2xl !text-[#fff]" />
                    </div>
                    <div className="grid gap-2">
                      <span className="text-lg font-base text-white">
                        Arsalan Birthday
                      </span>
                      <span className="text-sm font-base text-white mb-2">
                        Date:05/Jan/2026
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border border-white rounded-lg mt-2">
                  <div className="flex justify-evenly  items-center p-1">
                    <div className="border border-[#fff] p-1 md:p-1 box-shadow rounded-full w-[40px] h-[40px] text-center">
                      <VerticalRightOutlined className="text-sm lg:text-2xl !text-[#fff]" />
                    </div>
                    <div className="grid gap-2">
                      <span className="text-lg font-base text-white">
                        New Hiring
                      </span>
                      <span className="text-sm font-base text-white mb-2">
                        XYZ Joined Today
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border border-white rounded-lg mt-2">
                  <div className="flex justify-evenly  items-center p-1">
                    <div className="border border-[#fff] p-1 md:p-1 box-shadow rounded-full w-[40px] h-[40px] text-center">
                      <VerticalRightOutlined className="text-sm lg:text-2xl !text-[#fff]" />
                    </div>
                    <div className="grid gap-2">
                      <span className="text-lg font-base text-white">
                        New Hiring
                      </span>
                      <span className="text-sm font-base text-white mb-2">
                        XYZ Joined Today
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border border-white rounded-lg mt-2">
                  <div className="flex justify-evenly  items-center p-1">
                    <div className="border border-[#fff] p-1 md:p-1 box-shadow rounded-full w-[40px] h-[40px] text-center">
                      <VerticalRightOutlined className="text-sm lg:text-2xl !text-[#fff]" />
                    </div>
                    <div className="grid gap-2">
                      <span className="text-lg font-base text-white">
                        New Hiring
                      </span>
                      <span className="text-sm font-base text-white mb-2">
                        XYZ Joined Today
                      </span>
                    </div>
                  </div>
                </div>
                </marquee>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default MainDashboard;
