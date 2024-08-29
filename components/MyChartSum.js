import { useState, useEffect } from "react";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "left",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export async function getData() {
  const res = await fetch(`http://localhost:3000/api/pets/sum`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function MyChartSum() {
  const [data, setData] = useState({
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    datasets: [
      {
        label: "Pets",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      const jsonData = await getData();
      console.log(jsonData);
      setData({
        labels: jsonData ? jsonData.map((item) => item.animal) : [],
        datasets: [
          {
            label: "Pets",
            data: jsonData ? jsonData.map((item) => item.sumPrice) : [],
            backgroundColor: "rgba(110, 225, 200, 0.5)",
          },
        ],
      });
    }
    fetchData();
  }, []);

  return (
    <div>
      <Bar options={options} data={data} />;
    </div>
  );
}
