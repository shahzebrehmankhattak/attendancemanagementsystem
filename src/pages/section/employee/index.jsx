import React, { useState ,useMemo} from "react";
import { Button, Card, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetAllEmployeeQuery } from "../../../redux/apis/employeeApis";
import dummyImage from "../../../assets/dummy.jpg";
import { UserAddOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { debounceFn } from "../../../utils/debounceUtils";

const { Search } = Input;

const Employee = () => {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const { data: allEmployee, isLoading: employeeLoading } =
    useGetAllEmployeeQuery({});
  const navigate = useNavigate();

  const filteredData = filterName
    ? allEmployee.filter((item) => {
        const search = filterName.toLowerCase();
        return (
          item.name?.toLowerCase().includes(search) ||
          item?.deviceUserId.includes(search)
        );
      })
    : allEmployee;

     const debouncedSetFilterName = useMemo(
        () => debounceFn(setFilterName, 300),
        []
      );

  return (
    <>
      <Card>
        <div className="flex justify-center  lg:justify-between flex-wrap mb-4">
          <h2 className="text-2xl font-semibold">Employee</h2>
          <div className="grid gap-2">
            <Button
              className="bg-[#39444b]! p-[10px] !lg:p-[20px] text-white! text-sm lg:text-base! font-medium!"
              onClick={() => {
                navigate("/add-employee");
              }}
            >
              <UserAddOutlined /> Add Employee
            </Button>
            <Search
              placeholder="Search Name"
              className="h-[42px]!"
              allowClear
              enterButton="Search"
              value={filterName}
              onChange={(e) => {
                const value = e.currentTarget?.value;
                setPage(() => 1);
                debouncedSetFilterName(value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
        {filteredData ? (
  employeeLoading ? (
    <Spin size="large" tip="Loading Employees..." />
  ) : (
    <div className="flex items-center gap-2 justify-center flex-wrap">
      {filteredData?.map((item) => (
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/profile/${item?.id}`)}
          key={item?.id || item?.deviceUserId}
        >
          <Card className="flex justify-center items-center !bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] !text-white !rounded-xl !shadow-lg p-0 !lg:p-6">
            <img
              src={item?.image || dummyImage}
              alt="user-image"
              className="rounded-[50%] w-37.5 md:w-55 md:h-55 m-auto"
            />
            <div className="w-50 text-center mt-2">
              <h4 className="text-sm md:text-base font-semibold capitalize">
                {item?.name}
              </h4>
              <p className="text-xs md:text-sm font-semibold">
                {item?.active === true ? "Current Employee" : "None"}
              </p>
              <p className="text-xs md:text-sm font-semibold capitalize">
                {item?.deviceUserId}
              </p>
              <p className="text-xs md:text-sm font-semibold capitalize">
                {item?.department}
              </p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
) : (
  <Card className="flex justify-center items-center !bg-gradient-to-r !from-[#39444b] !via-[#3b616f] !to-[#3e89a4] !text-white !rounded-xl !shadow-lg p-0 !lg:p-6">
  <img
    src={dummyImage}
    alt="user-image"
    className="rounded-[50%] w-37.5 md:w-55 md:h-55 m-auto"
  />
  <div className="w-50 text-center mt-2">
    <h4 className="text-sm md:text-base font-semibold capitalize">
      Shahzeb Rehman Khattak
    </h4>
    <p className="text-xs md:text-sm font-semibold">
      Current Employee
    </p>
    <p className="text-xs md:text-sm font-semibold capitalize">
      003
    </p>
    <p className="text-xs md:text-sm font-semibold capitalize">
     Development
    </p>
  </div>
</Card>

)}
         
        </div>
      </Card>
    </>
  );
};

export default Employee;
