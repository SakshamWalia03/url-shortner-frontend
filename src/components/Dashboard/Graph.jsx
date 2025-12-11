import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData }) => {
  const labels = graphData?.map((item) => `${item.clickDate}`);
  const userPerDay = graphData?.map((item) => item.count);

  const data = {
    labels:
      graphData.length > 0
        ? labels
        : new Array(14).fill(""),

    datasets: [
      {
        label: "Total Clicks",
        data:
          graphData.length > 0
            ? userPerDay
            : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],

        backgroundColor:
          graphData.length > 0
            ? "rgba(59,130,246,0.6)"
            : "rgba(54,162,235,0.1)",

        borderColor: "rgba(59,130,246,1)",
        borderWidth: 2,
        borderRadius: 6,

        barThickness: window.innerWidth < 500 ? 18 : 28,
        maxBarThickness: 40,
        minBarLength: 4,

        categoryPercentage: 0.6,
        barPercentage: 0.7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#1e293b",
          font: {
            family: "Roboto",
            size: window.innerWidth < 500 ? 10 : 14,
          },
        },
      },
      tooltip: {
        bodyFont: { size: window.innerWidth < 500 ? 10 : 14 },
        titleFont: { size: window.innerWidth < 500 ? 12 : 16 },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#475569",
          font: { size: window.innerWidth < 500 ? 10 : 12 },
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Number of Clicks",
          color: "#1e293b",
          font: {
            size: window.innerWidth < 500 ? 12 : 14,
            weight: "600",
          },
        },
        grid: { color: "rgba(0,0,0,0.05)" },
      },

      x: {
        ticks: {
          color: "#475569",
          autoSkip: true,
          maxRotation: window.innerWidth < 500 ? 45 : 0,
          minRotation: 0,
          font: { size: window.innerWidth < 500 ? 10 : 12 },
        },
        title: {
          display: true,
          text: "Date",
          color: "#1e293b",
          font: {
            size: window.innerWidth < 500 ? 12 : 14,
            weight: "600",
          },
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full h-full rounded-xl bg-white p-4 shadow-xl">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;