// utils/attendanceUtils.ts
import dayjs from "dayjs";

export const isRecentPunch = (record, seconds = 3) => {
  const punches = record?.punchLogs || [];
  if (!punches.length) return false;

  const lastPunch = dayjs(punches[punches.length - 1]);
  return dayjs().diff(lastPunch, "second") <= seconds;
};

export const isLatePunch = (time, hour = 9, minute = 30) => {
  if (!time) return false;

  const punchTime = dayjs(time);
  const lateTime = punchTime
    .startOf("day")
    .hour(hour)
    .minute(minute)
    .second(59);

  return punchTime.isAfter(lateTime);
};

export const formatDateTime = (value, fallback = "-") => {
  if (!value) return fallback;
  return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
};

export const mapAttendanceToRows = (attendanceData = []) => {
  return attendanceData.map((punch) => ({
    key: punch.id,
    name: punch.employeeName,
    deviceUserId: punch.deviceUserId,
    punchTime: punch.punchTime,
    remarks: punch.remarks ? [punch.remarks] : [],
  }));
};

export const updateRowByKey = (rows, key, updates) => {
  return rows.map((row) => (row.key === key ? { ...row, ...updates } : row));
};

export const getLastPunch = (punchLogs = []) => {
  if (!punchLogs.length) return null;
  return punchLogs[punchLogs.length - 1];
};