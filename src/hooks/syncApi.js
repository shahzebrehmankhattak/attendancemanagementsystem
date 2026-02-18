import { message } from "antd";

export const handleSync = async () => {
  try {
    const res = await fetch('http://192.168.100.38:8080/api/attendance/sync');
    const text = await res.text();
  } catch (err) {
    console.error(err);
    message.error("Sync failed!");
  }
};