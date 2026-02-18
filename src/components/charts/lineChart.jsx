import React, { useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { useGetDailyEmployeeAttendanceQuery } from "../../redux/apis/attendanceApis";
import { Card } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartComponent = () => {
  const [filter, setFilter] = useState("currentWeek"); // currentWeek / lastWeek / lastMonth

  // Compute date range based on filter
  const dateRange = useMemo(() => {
    const today = dayjs().startOf("day");
    let start, end;
  
    switch (filter) {
      case "currentWeek":
        start = today.startOf("week");
        end = today.endOf("week");
        break;
  
      case "lastWeek":
        start = today.subtract(1, "week").startOf("week");
        end = start.endOf("week");
        break;
  
      case "thisMonth":
        start = today.startOf("month");
        end = today.endOf("month");
        break;
  
      case "lastMonth":
        start = today.subtract(1, "month").startOf("month");
        end = today.subtract(1, "month").endOf("month");
        break;
  
      default:
        start = today.startOf("week");
        end = today.endOf("week");
    }
  
    return { start, end };
  }, [filter]);

  const { data: dailyAttendance = [], isLoading: loadingAttendance } =
    useGetDailyEmployeeAttendanceQuery(
      dateRange.start && dateRange.end
        ? { start: dateRange.start.toISOString(), end: dateRange.end.toISOString() }
        : skipToken,
      {
        pollingInterval: 2000,
        refetchOnFocus: true,
        refetchOnReconnect: true,
      }
    );

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!dailyAttendance?.length) return { labels: [], datasets: [] };

    // Generate all days in range
    const days = [];
    let dayCursor = dateRange.start;
    while (dayCursor.isBefore(dateRange.end) || dayCursor.isSame(dateRange.end)) {
      days.push(dayCursor.format("YYYY-MM-DD"));
      dayCursor = dayCursor.add(1, "day");
    }

    // Map employee data
    const datasets = dailyAttendance.map((emp, index) => {
      const data = days.map((d) => {
        const punches = emp.punchLogs
          .map((p) => dayjs(p))
          .filter((p) => p.format("YYYY-MM-DD") === d)
          .sort((a, b) => a.valueOf() - b.valueOf());
    
        if (!punches.length) return null;
    
        const firstPunch = punches[0];
        // Time in hours including seconds
        return firstPunch.hour() + firstPunch.minute() / 60 + firstPunch.second() / 3600;
      });
    
      const colors = [
        "#36A2EB",
        "#FF6384",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
        "#2ecc71",
        "#e74c3c",
      ];
    
      return {
        label: emp.employeeName,
        data,
        borderColor: colors[index % colors.length],
        backgroundColor: "rgba(0,0,0,0.05)",
        tension: 0.3,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 2,
        showLine: filter === "currentWeek",
        spanGaps: true,
      };
    });

    return { labels: days, datasets };
  }, [dailyAttendance, dateRange]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { boxWidth: 12, padding: 10 } },
      // title: { display: true, text: "Employee Attendance (First Punch)", font: { size: 18 } },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const hours = ctx.raw;
            if (hours === null) return "No punch";
            const h = Math.floor(hours);
            const m = Math.round((hours - h) * 60);
            const ampm = h >= 12 ? "PM" : "AM";
            const hour12 = h % 12 === 0 ? 12 : h % 12;
            return `${ctx.dataset.label}: ${hour12}:${m < 10 ? "0" : ""}${m} ${ampm}`;
          },
        },
      },
    },
    scales: {
      y: {
        title: { display: true, text: "Login Time" },
        min: 7,
        max: 20,
        ticks: {
          stepSize: 1, 
          autoSkip: false,
          callback: (val) => {
            const totalMinutes = Math.round(val * 60);
            const h = Math.floor(totalMinutes / 60);
            const m = totalMinutes % 60;
    
            const ampm = h >= 12 ? "PM" : "AM";
            const hour12 = h % 12 === 0 ? 12 : h % 12;
    
            return `${hour12}:${m === 0 ? "00" : m} ${ampm}`;
          },
        },
      },
      x: {
        title: { display: true, text: "Date" },
        ticks: { maxRotation: 45, minRotation: 0 },
      },
    },
  };

  if (loadingAttendance) return <p>Loading...</p>;

  return (
    <Card>
      <div className="flex justify-between items-center">
<h2 className="text-2xl font-semibold">
Attendance Graph
</h2>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("currentWeek")}
          className={`border px-3 py-1 text-white rounded ${
            filter === "currentWeek" ? "bg-[#39444b] text-white!" : ""
          }`}
        >
          Current Week
        </button>
        <button
          onClick={() => setFilter("lastWeek")}
          className={`border px-3 py-1 rounded ${
            filter === "lastWeek" ? "bg-[#39444b] text-white!" : ""
          }`}
        >
          Last Week
        </button>
        <button
    onClick={() => setFilter("thisMonth")}
    className={`border px-3 py-1 rounded ${
      filter === "thisMonth" ? "bg-[#39444b] text-white!" : ""
    }`}
  >
    This Month
  </button>
        <button
          onClick={() => setFilter("lastMonth")}
          className={`border px-3 py-1 rounded ${
            filter === "lastMonth" ? "bg-[#39444b] text-white!" : ""
          }`}
        >
          Last Month
        </button>
      </div>
      
      </div>

      <Line data={chartData} options={options} />
    </Card>
  );
};

export default LineChartComponent;
