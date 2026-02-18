import React from "react";
import { Table, Input, Card } from "antd";

const { Search } = Input;

const generateDummyMonthData = (employees, year, month) => {
  // Get number of days in month
  const daysInMonth = new Date(year, month, 0).getDate();

  return employees.map((emp, index) => {
    const row = {
      key: index + 1,
      name: emp,
    };

    for (let day = 1; day <= daysInMonth; day++) {
      // Random login/logout/break for demo
      row[`day${day}`] = {
        login: `09:${Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, "0")} AM`,
        logout: `05:${Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, "0")} PM`,
        breakIn: `12:${Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, "0")} PM`,
        breakOut: `01:${Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, "0")} PM`,
        remarks: ["-"],
      };
    }

    return row;
  });
};

const FullAttendance = () => {
  const employees = ["Shahzeb Rehman Khattak", "Muhammad Arslan"];
  const dataSource = generateDummyMonthData(employees, 2025, 12);

  // Columns: Name + days 1-31
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 150,
    },
    ...Array.from({ length: 31 }, (_, i) => {
      const day = i + 1;
      return {
        title: day.toString(),
        dataIndex: `day${day}`,
        key: `day${day}`,
        render: (record) => (
          <div className="flex flex-col text-xs">
            <span>Login: {record.login}</span>
            <span>Logout: {record.logout}</span>
            <span>
              Break: {record.breakIn} - {record.breakOut}
            </span>
            <div className="flex flex-col gap-1">
              {record.remarks.map((remark, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 px-1 py-0.5 rounded text-[10px]"
                >
                  {remark}
                </span>
              ))}
            </div>
          </div>
        ),
        width: 120,
      };
    }),
  ];

  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <Card>
      <div>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 300 }}
          className="pb-4"
        />
      </div>
      <div className="overflow-x-auto overflow-y-auto h-full table-responsive">
  <Table
  size="small"
  className="overflow-x-auto"
    dataSource={dataSource}
    columns={columns}
    pagination={true}
    bordered
    scroll={{ x: "max-content" }}
  />
</div>
    </Card>
  );
};

export default FullAttendance;
