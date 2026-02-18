import React, { useState,useMemo } from "react";
import { Table, Input, Button, Card, Tag } from "antd";
import { useGetDailyEmployeeAttendanceQuery } from "../../../redux/apis/attendanceApis";
import { DatePicker } from "antd";
import { skipToken } from "@reduxjs/toolkit/query";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { exportAttendanceToExcel } from "../../../utils/exportAttendanceExcelUtils";
import { formatDateTime, isLatePunch, isRecentPunch } from "../../../utils/attendanceUtils";
import { debounceFn } from "../../../utils/debounceUtils";

const { RangePicker } = DatePicker;
const { Search } = Input;

const AttendanceSheet = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState(() => {
    const today = dayjs();
    return {
      start: today.startOf("day").toISOString(),
      end: today.endOf("day").toISOString(),
    };
  });
  const { data: dailyAttendance, isLoading: loadingAttendance } =
    useGetDailyEmployeeAttendanceQuery(
      dateRange?.start && dateRange?.end ? dateRange : skipToken,
      {
        pollingInterval: 2000,
        refetchOnFocus: true,
        refetchOnReconnect: true,
      }
    );

  const filteredData = filterName
    ? dailyAttendance.filter((item) => {
        const search = filterName.toLowerCase();
        return (
          item.employeeName?.toLowerCase().includes(search) ||
          item?.deviceUserId.includes(search)
        );
      })
    : dailyAttendance;

  const columns = [
    { title: "Name", dataIndex: "employeeName", key: "employeeName" },
    { title: "User Id", dataIndex: "deviceUserId", key: "deviceUserId" },
    {
      title: "First Punch Time",
      dataIndex: "login",
      key: "login",
      render: (_, record) => {
        const punches = record.punchLogs || [];
        if (!punches.length) return "-";
    
        const firstPunch = punches[0];
        const isLate = isLatePunch(firstPunch);
    
        return (
          <span className={isLate ? "text-red-500 font-semibold" : ""}>
           {formatDateTime(firstPunch)}
          </span>
        );
      },
    },
    {
      title: "Last Punch Time",
      dataIndex: "logout",
      key: "logout",
      render: (_, record) => {
        const punches = record.punchLogs || [];
        if (punches.length < 2) return "-";
      
        const lastPunch = punches[punches.length - 1];
        return formatDateTime(lastPunch);
      },
    },
    { title: "Total Punches", dataIndex: "totalPunches", key: "totalPunches" },
    {
      title: "Punches Time",
      dataIndex: "punchLogs",
      key: "punchLogs",
      render: (times = []) => (
        <div className="flex flex-wrap gap-1">
          {times?.length ? (
            times?.map((time, index) => (
              <Tag key={index} color="blue">
                {formatDateTime(time)}
              </Tag>
            ))
          ) : (
            <span className="text-gray-400 text-xs">No Punch</span>
          )}
        </div>
      ),
    },
  ];

  const debouncedSetFilterName = useMemo(
    () => debounceFn(setFilterName, 300),
    []
  );

  return (
    <div>
      <Card className="w-full bg-gray-200">
        {!isDashboard && (
          <div className="flex justify-center lg:justify-between items-center mb-4 flex-wrap gap-2">
            <div className="grid gap-2">
              <h2 className="text-2xl font-semibold">Attendance Sheet</h2>

              <Button
                className="bg-[#39444b]! text-white! text-base! !p-[20px]"
                onClick={() => exportAttendanceToExcel(filteredData)}
              >
                Export Excel
              </Button>
            </div>

            <div className="grid gap-2">
              <RangePicker
                showTime
                allowClear
                allowEmpty
                onChange={(values) => {
                  if (!values) return;

                  setDateRange({
                    start: values[0].format("YYYY-MM-DDTHH:mm:ss"),
                    end: values[1].format("YYYY-MM-DDTHH:mm:ss"),
                  });
                }}
              />

              <Search
                placeholder="Search Name"
                className="!h-[42px]"
                allowClear
                enterButton="Search"
                value={filterName}
                onChange={(e) => {
                  const value = e.currentTarget?.value;
                  setPage(1);
                  debouncedSetFilterName(value);
                }}
              />
            </div>
          </div>
        )}
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={true}
          rowKey="deviceUserId"
          rowClassName={(record) =>
            isRecentPunch(record) ? "recent-punch-row" : ""
          }
          bordered
          loading={loadingAttendance}
          className="bg-white rounded-2xl"
        />
      </Card>
    </div>
  );
};

export default AttendanceSheet;
