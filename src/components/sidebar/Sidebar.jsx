import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MenuOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  TableOutlined,
  SettingOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import logo from "../../assets/mus-logo.png";
import admin from "../../assets/admin.webp";
import { getUpcomingEvents } from "../../utils/eventsUtils";
import dayjs from "dayjs";

const defaultEvents = {
  "2026-02-05": ["Kashmir Solidarity Day"],
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const upcomingEvents = getUpcomingEvents(defaultEvents);

  const items = [
    { icon: <DashboardOutlined />, label: "Dashboard", path: "/" },
    { icon: <UsergroupAddOutlined />, label: "Employees", path: "/employees" },
    { icon: <TableOutlined />, label: "Attendance", path: "/attendance" },
    { icon: <SettingOutlined />, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-start md:items-center justify-between bg-[#39444b] text-white p-4">
        <button onClick={() => setOpen(true)}>
          <MenuOutlined className="text-xl" />
        </button>
      </div>

      {/* Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-[#39444b] text-white z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        <div className="p-[12.5px] flex justify-center  border-b border-white !bg-gradient-to-r !from-[#3e89a4] !via-[#3b616f] !to-[#39444b]">
          <img src={logo} alt="" width={50} height={50} />
        </div>

        <div className="border-b border-white flex justify-center flex-col items-center pt-6 pb-4">
          <img
            src={admin}
            alt=""
            className="rounded-lg"
            width={200}
            height={200}
          />
          <div>
            <h3 className="text-sm font-medium pt-2">Super Admin</h3>
            <h5 className="text-sm font-medium text-center">Admin</h5>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {items.map((item) => (
            <Link key={item.path} to={item.path}>
              <SidebarItem
                icon={item?.icon}
                label={item.label}
                active={location.pathname === item.path}
              />
            </Link>
          ))}
        </nav>
        <div className="p-3 space-y-2 border-t">
          <h2 className="text-lg font-base flex items-center gap-2">
            <CalendarOutlined /> Upcoming Events
          </h2>

          <div className="grid gap-2">
            <div className="border-2 p-1 rounded">
              {upcomingEvents.length === 0 ? (
                <p className="text-gray-500 text-sm">No upcoming events</p>
              ) : (
                <ul className="space-y-2">
                  {upcomingEvents.map((event, index) => (
                    <li key={index} className="text-sm font-base">
                      {dayjs(event.date).format("MMM DD")} — {event.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const SidebarItem = ({ icon, label, active }) => (
  <div
    className={`px-4 py-2 rounded hover:bg-gray-800 cursor-pointer ${
      active ? "bg-gray-900 font-semibold" : "hover:bg-gray-700"
    }`}
  >
    {icon} {label}
  </div>
);

export default Sidebar;
