import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip, Filler } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale, Legend, Filler);

const FONT = "'Plus Jakarta Sans', sans-serif";

const Graph = ({ graphData = [] }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const createGradient = (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 0, 360);
    g.addColorStop(0, "rgba(6,182,212,0.85)");
    g.addColorStop(0.5, "rgba(59,130,246,0.7)");
    g.addColorStop(1, "rgba(139,92,246,0.5)");
    return g;
  };

  const isSmall = windowWidth < 500;
  const isMedium = windowWidth < 768;

  const data = {
    labels: graphData.map((d) => d.clickDate),
    datasets: [{
      label: "Total Clicks",
      data: graphData.map((d) => d.count),
      backgroundColor: ({ chart: { ctx } }) => createGradient(ctx),
      borderColor: "rgba(6,182,212,0.8)",
      borderWidth: 1,
      borderRadius: 6,
      barThickness: isSmall ? 12 : isMedium ? 18 : 28,
      maxBarThickness: 45,
      minBarLength: 2,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 12,
        right: 12,
        left: 12,
        bottom: 12,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          color: "#94a3b8",
          font: { family: FONT, size: isSmall ? 10 : isMedium ? 11 : 12, weight: "600" },
          padding: isSmall ? 8 : 12,
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: isSmall ? 6 : 8,
        },
      },
      tooltip: {
        backgroundColor: "rgba(8,13,20,0.95)",
        titleColor: "#f0f4ff",
        bodyColor: "#94a3b8",
        borderColor: "rgba(6,182,212,0.3)",
        borderWidth: 1,
        padding: isSmall ? 8 : 12,
        cornerRadius: 8,
        displayColors: false,
        bodyFont: { size: isSmall ? 11 : isMedium ? 12 : 13, family: FONT },
        titleFont: { size: isSmall ? 12 : isMedium ? 13 : 14, family: FONT, weight: "700" },
        maxWidth: 200,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#475569",
          font: { size: isSmall ? 9 : isMedium ? 10 : 11, family: FONT },
          stepSize: 1,
          padding: isSmall ? 4 : 8,
          maxTicksLimit: isSmall ? 5 : 8,
        },
        title: {
          display: !isSmall,
          text: "Clicks",
          color: "#64748b",
          font: { size: 12, weight: "700", family: FONT },
          padding: 8,
        },
        grid: { color: "rgba(96,165,250,0.07)", drawBorder: false },
        border: { display: false },
      },
      x: {
        ticks: {
          color: "#475569",
          autoSkip: true,
          maxRotation: isSmall ? 45 : isMedium ? 30 : 0,
          minRotation: isSmall ? 45 : isMedium ? 30 : 0,
          font: { size: isSmall ? 8 : isMedium ? 9 : 11, family: FONT },
          padding: isSmall ? 4 : 6,
          maxTicksLimit: isSmall ? 4 : isMedium ? 6 : 10,
        },
        title: {
          display: !isSmall,
          text: "Date",
          color: "#64748b",
          font: { size: 12, weight: "700", family: FONT },
          padding: 8,
        },
        grid: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%", padding: isSmall ? 2 : 4, minHeight: "220px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;