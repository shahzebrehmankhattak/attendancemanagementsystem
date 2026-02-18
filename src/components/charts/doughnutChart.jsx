import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const leaveData = [
    { label: "Casual", remaining: 22, total: 24, color: "#22c55e" },
    { label: "Sick", remaining: 8, total: 10, color: "#3b82f6" },
    { label: "Half", remaining: 1, total: 4, color: "#a855f7" },
    { label: "Short", remaining: 3, total: 3, color: "#f59e0b" },
  ];

  const data = {
    labels: leaveData.map((l) => l.label),
    datasets: [
      {
        data: leaveData.map((l) => l.remaining),
        backgroundColor: leaveData.map((l) => l.color),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#374151" },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const item = leaveData[ctx.dataIndex];
            return `${item.label}: ${item.remaining} / ${item.total} remaining`;
          },
        },
      },
    },
  };

  const totalRemaining = leaveData.reduce(
    (sum, l) => sum + l.remaining,
    0
  );
  const totalLeaves = leaveData.reduce(
    (sum, l) => sum + l.total,
    0
  );

  return (
    <div className="relative flex justify-center">
      <div className="w-[260px]">
        <Doughnut data={data} options={options} />
      </div>

      {/* Center Text */}
      <div className="absolute text-center top-[30%]">
        <h2 className="text-gray-700 text-xl font-bold">
          {totalRemaining}
        </h2>
        <p className="text-gray-500 text-xs">
          of {totalLeaves} Remaining
        </p>
      </div>
    </div>
  );
};

export default DoughnutChart;
