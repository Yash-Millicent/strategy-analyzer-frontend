// AreaChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";

const AreaChart: React.FC = () => {
  // Sample data for the area chart
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales Data",
        data: [30, 25, 35, 20, 40],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category" as const,
        labels: data.labels,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line
        data={data}
        options={options}
      />
    </div>
  );
};

export default AreaChart;
