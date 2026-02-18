import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Tag,
  Table,
  Input,
  DatePicker,
  message,
  Flex,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  UserDeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useGetEmployeeByIdQuery } from "../../../../redux/apis/employeeApis";
import { useParams } from "react-router-dom";
import dummyImage from "../../../../assets/dummy.jpg";
import { useNavigate } from "react-router-dom";
import {
  useGetDailySingleEmployeeAttendanceQuery,
  useUpdatePunchTimeByIdMutation,
  useUpdateAttendanceRemarksMutation,
} from "../../../../redux/apis/attendanceApis";
import dayjs from "dayjs";
import {
  formatDateTime,
  mapAttendanceToRows,
  updateRowByKey,
} from "../../../../utils/attendanceUtils";
import DoughnutChart from "../../../../components/charts/doughnutChart";

const SingleEmplopyee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: singlEmployee, isLoading: employeeLoading } =
    useGetEmployeeByIdQuery(id);
  const { data: dailyAttendance, isLoading: attendanceLoading } =
    useGetDailySingleEmployeeAttendanceQuery({
      id: id,
      pollingInterval: 2000,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });
  const [updatePunchTimeById] = useUpdatePunchTimeByIdMutation();
  const [updateAttendanceRemarks, { isLoading: remarkLoading }] =
    useUpdateAttendanceRemarksMutation();

  const [tableData, setTableData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [newTime, setNewTime] = useState(null);
  const [editingRemarkKey, setEditingRemarkKey] = useState(null);
  const [remarkValue, setRemarkValue] = useState("");
  const [graphView, setGraphView] = useState(false);

  useEffect(() => {
    if (!singlEmployee || !dailyAttendance || !dailyAttendance.length) return;

    if (!dailyAttendance || !dailyAttendance.length) return;
    setTableData(mapAttendanceToRows(dailyAttendance));
  }, [dailyAttendance, singlEmployee]);

  const handleSavePunchTime = async (record) => {
    if (!newTime) return;
    try {
      await updatePunchTimeById({
        attendanceLogId: record.key,
        punchTime: newTime.toISOString(),
      }).unwrap();
      message.success("Punch time updated successfully!");
      setEditingRow(null);
      setNewTime(null);

      setTableData(
        updateRowByKey(tableData, record.key, {
          punchTime: newTime.toISOString(),
        })
      );
    } catch (err) {
      message.error("Failed to update punch time");
    }
  };

  const handleAddRemark = async (record) => {
    if (!remarkValue.trim()) {
      message.warning("Remark cannot be empty");
      return;
    }

    try {
      await updateAttendanceRemarks({
        attendanceLogId: record.key,
        remarks: remarkValue,
      }).unwrap();
      message.success("Remark updated successfully!");
      setTableData(
        updateRowByKey(tableData, record.key, {
          remarks: [remarkValue],
        })
      );

      setEditingRemarkKey(null);
      setRemarkValue("");
    } catch (error) {
      message.error("Failed to update remark");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Punch Time",
      dataIndex: "punchTime",
      key: "punchTime",
      render: (_, record) =>
        editingRow === record.key ? (
          <div className="flex gap-1 items-center">
            <DatePicker
              showTime
              value={newTime}
              onChange={(val) => setNewTime(val)}
            />
            <Button
              size="small"
              className="!bg-[#39444b] !text-white"
              onClick={() => handleSavePunchTime(record)}
            >
              Save
            </Button>
            <Button size="small" danger onClick={() => setEditingRow(null)}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex gap-1 items-center">
            <Tag color="cyan-inverse">{formatDateTime(record.punchTime)}</Tag>
            <EditOutlined
              style={{ cursor: "pointer", color: "#1890ff" }}
              onClick={() => {
                setEditingRow(record.key);
                setNewTime(dayjs(record.punchTime));
              }}
            />
          </div>
        ),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: (remarks = [], record) => {
        const isEditing = editingRemarkKey === record.key;

        return (
          <div className="flex flex-col gap-1">
            {isEditing ? (
              <>
                <Input
                  size="small"
                  value={remarkValue}
                  autoFocus
                  onChange={(e) => setRemarkValue(e.target.value)}
                  placeholder="Enter remark"
                />

                <div className="flex gap-1">
                  <Button
                    size="small"
                    type="primary"
                    loading={remarkLoading}
                    onClick={() => handleAddRemark(record)}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      setEditingRemarkKey(null);
                      setRemarkValue("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex">
                {remarks.length ? (
                  <Tag color="green">{remarks[0]}</Tag>
                ) : (
                  <Tag color="default">No Remark</Tag>
                )}

                <Button
                  size="small"
                  type="link"
                  onClick={() => {
                    setEditingRemarkKey(record.key);
                    setRemarkValue(remarks?.[0] || "");
                  }}
                >
                  {remarks.length ? <EditOutlined /> : <PlusOutlined />}
                </Button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Card loading={employeeLoading || attendanceLoading}>
      <Row gutter={[15, 15]}>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="border-0 p-2 rounded !bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] flex justify-between flex-col sm:flex-row">
            <span className="text-white text-lg font-medium mb-0 text-center md:text-left">
              Profile 
            </span>
            <span className="text-white text-xs md:text-sm font-medium mb-0 text-center">
              Last PunchIn Time:
              <span className="text-white text-sm md:text-lg font-semibold mb-0">
              {singlEmployee?.active === false
  ? "Employee Left"
  : dailyAttendance?.punchLogs?.length
  ? dayjs(
      dailyAttendance.punchLogs[
        dailyAttendance.punchLogs.length - 1
      ]
    ).format("YYYY-MM-DD HH:mm:ss")
  : "-"}
               
              </span>{" "}
            </span>
          </div>
        </Col>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="border-0 p-2 rounded !bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4]">
            <Row gutter={[15, 15]}>
              <Col xl={4} lg={4} md={10} sm={12} xs={24}>
                <div className="border-3 rounded-2xl border-white p-1">
                  <img
                    src={singlEmployee?.image || dummyImage}
                    alt=""
                    className="rounded-2xl w-37.5 md:w-60 m-auto md:m-auto-none"
                  />
                </div>
              </Col>
              <Col xl={16} lg={19} md={14} sm={12} xs={24}>
                <div className="p-3 text-white text-sm md:text-base">
                  <p>
                    Name: <span>{singlEmployee?.name || "N/A"}</span>
                  </p>
                  <p>
                    Email: <span>{singlEmployee?.email || "N/A"}</span>
                  </p>
                  <p>
                    Designation:{" "}
                    <span>{singlEmployee?.department || "N/A"}</span>
                  </p>
                  <p>
                    Employee ID:{" "}
                    <span>{singlEmployee?.deviceUserId || "N/A"}</span>
                  </p>
                  <p>
                    Phone Number: <span>{singlEmployee?.phone || "N/A"}</span>
                  </p>
                  <p>
                    Date Of Join: <span>{singlEmployee?.doj || "N/A"}</span>
                  </p>
                </div>
              </Col>
              <Col xl={4} lg={4} md={10} sm={12} xs={24}>
                <Flex gap="5px">
                  <Button
                    onClick={() => {
                      navigate(`/edit-employee/${singlEmployee?.id}`);
                    }}
                  >
                    Edit Profile
                  </Button>
                  <Button onClick={() => setGraphView((prev) => !prev)}>
                    {graphView ? "Card View" : "Graph View"}
                  </Button>
                </Flex>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 15]} className="mt-3">
        {graphView ? (
          <Col xxl={24}>
            <Card>
              <DoughnutChart />
            </Card>
          </Col>
        ) : (
          <>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Card className="!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4]">
                <h3 className="text-white text-base md:text-lg text-center md:text-left">
                  <UserDeleteOutlined className="text-sm md:text-lg !text-[#fff]" />{" "}
                  Casual Leaves 24
                </h3>
                <div className="flex justify-around items-center mt-4">
                  <div className="leave-remaing">
                    <h2 className="text-lg md:text-4xl font-semibold text-white text-center">
                      22
                    </h2>
                    <p className="text-xs md:text-base font-medium text-white text-center">
                      Leave Remaining
                    </p>
                  </div>
                  <Divider
                    vertical
                    style={{
                      border: "3px solid white",
                      minHeight: "50px",
                      color: "white",
                    }}
                  />
                  <div className="leave-remaing">
                    <h2 className="text-lg md:text-4xl font-semibold text-white text-center">
                      24
                    </h2>
                    <p className="text-xs md:text-base font-medium text-white text-center">
                      Total Leaves
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Card className="!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4]">
                <h3 className="text-white text-base md:text-lg text-center md:text-left">
                  <UserDeleteOutlined className="text-sm md:text-lg !text-[#fff]" />
                  Sick Leaves 10
                </h3>
                <div className="flex justify-around items-center mt-4">
                  <div className="leave-remaing">
                    <h2 className="text-lg md:text-4xl font-semibold text-white text-center">
                      08
                    </h2>
                    <p className="text-xs md:text-base font-medium text-white text-center">
                      Leave Remaining
                    </p>
                  </div>
                  <Divider
                    vertical
                    style={{
                      border: "3px solid white",
                      minHeight: "50px",
                      color: "white",
                    }}
                  />
                  <div className="leave-remaing">
                    <h2 className="text-lg md:text-4xl font-semibold text-white text-center">
                      10
                    </h2>
                    <p className="text-xs md:text-base font-medium text-white text-center">
                      Total Leaves
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Card className="!bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4]">
                <h3 className="text-white text-base md:text-lg text-center md:text-left">
                  <UserDeleteOutlined className="text-sm md:text-lg !text-[#fff]" />{" "}
                  Half Leaves
                </h3>
                <div className="flex justify-around items-center mt-4">
                  <div className="leave-remaing">
                    <h2 className="text-lg md:text-4xl font-semibold text-white text-center">
                      01
                    </h2>
                    <p className="text-xs md:text-base font-medium text-white text-center">
                      This Month Remaining
                    </p>
                  </div>
                  <Divider
                    vertical
                    style={{
                      border: "3px solid white",
                      minHeight: "50px",
                      color: "white",
                    }}
                  />
                  <div className="leave-remaing">
                    <h2 className="text-lg md:text-4xl font-semibold text-white text-center">
                      03
                    </h2>
                    <p className="text-xs md:text-base font-medium text-white text-center">
                      Total Leaves
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
          </>
        )}
      </Row>

      <Row gutter={15} className="mt-3">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Table
            dataSource={tableData}
            columns={columns}
            pagination={true}
            bordered
            className="bg-white rounded-2xl"
          />
        </Col>
      </Row>
    </Card>
  );
};

export default SingleEmplopyee;
