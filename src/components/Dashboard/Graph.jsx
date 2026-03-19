import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip, Filler } from "chart.js";

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale, Legend, Filler);

const FONT = "'Plus Jakarta Sans', sans-serif";

const Graph = ({ graphData = [] }) => {
  const createGradient = (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 0, 360);
    g.addColorStop(0, "rgba(6,182,212,0.85)");
    g.addColorStop(0.5, "rgba(59,130,246,0.7)");
    g.addColorStop(1, "rgba(139,92,246,0.5)");
    return g;
  };

  const data = {
    labels: graphData.map((d) => d.clickDate),
    datasets: [{
      label: "Total Clicks",
      data: graphData.map((d) => d.count),
      backgroundColor: ({ chart: { ctx } }) => createGradient(ctx),
      borderColor: "rgba(6,182,212,0.8)",
      borderWidth: 1,
      borderRadius: 6,
      barThickness: window.innerWidth < 500 ? 16 : 28,
      maxBarThickness: 40,
      minBarLength: 4,
    }],
  };

  const small = window.innerWidth < 500;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, position: "top", align: "end",
        labels: {
          color: "#94a3b8",
          font: { family: FONT, size: small ? 11 : 12, weight: "600" },
          padding: 12, usePointStyle: true, pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(8,13,20,0.95)",
        titleColor: "#f0f4ff",
        bodyColor: "#94a3b8",
        borderColor: "rgba(6,182,212,0.3)",
        borderWidth: 1,
        padding: 12, cornerRadius: 8, displayColors: false,
        bodyFont: { size: small ? 12 : 13, family: FONT },
        titleFont: { size: small ? 13 : 14, family: FONT, weight: "700" },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#475569", font: { size: small ? 10 : 11, family: FONT }, stepSize: 1, padding: 8 },
        title: { display: true, text: "Clicks", color: "#64748b", font: { size: 12, weight: "700", family: FONT }, padding: 8 },
        grid: { color: "rgba(96,165,250,0.07)" },
        border: { display: false },
      },
      x: {
        ticks: { color: "#475569", autoSkip: true, maxRotation: small ? 45 : 0, font: { size: small ? 9 : 11, family: FONT }, padding: 6 },
        title: { display: true, text: "Date", color: "#64748b", font: { size: 12, weight: "700", family: FONT }, padding: 8 },
        grid: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%", padding: 4 }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;
