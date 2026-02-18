// utils/exportAttendanceExcel.ts
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import dayjs from "dayjs";

export const exportAttendanceToExcel = (data) => {
  if (!data?.length) return;

  const formattedData = data.map((item) => ({
    Name: item.employeeName,
    "User ID": item.deviceUserId,
    "First Punch Time": item.punchLogs?.[0]
      ? dayjs(item.punchLogs[0]).format("YYYY-MM-DD HH:mm:ss")
      : "-",
    "Last Punch Time":
      item.punchLogs?.length > 1
        ? dayjs(item.punchLogs[item.punchLogs.length - 1]).format(
            "YYYY-MM-DD HH:mm:ss"
          )
        : "-",
    "Total Punches": item.totalPunches,
    "Punch Times": (item.punchLogs || [])
      .map((t) => dayjs(t).format("HH:mm:ss"))
      .join(", "),
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  worksheet["!cols"] = [
    { wch: 20 },
    { wch: 15 },
    { wch: 22 },
    { wch: 22 },
    { wch: 15 },
    { wch: 40 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `Attendance_${dayjs().format("YYYY-MM-DD")}.xlsx`);
};
