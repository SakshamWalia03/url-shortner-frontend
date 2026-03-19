import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Hourglass } from "react-loader-spinner";
import {
  FaChartLine,
  FaSync,
  FaDesktop,
  FaMobile,
  FaGlobe,
  FaChrome,
  FaFirefox,
  FaSafari,
  FaEdge,
} from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";
import Graph from "./Graph";
import {
  useFetchShortLinkTotalClicks,
  useFetchDeviceAnalytics,
  useFetchBrowserAnalytics,
  useFetchCountryAnalytics,
} from "../../hooks/useQuery.js";
import dayjs from "dayjs";
import styles from "../Dashboard.module.scss";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
);

const FONT = "'Plus Jakarta Sans', sans-serif";

const toArray = (data = {}, keyName = "name") => {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data.map((item) => ({
      [keyName]:
        item[keyName] ||
        item.name ||
        item.device ||
        item.browser ||
        item.country ||
        "Unknown",
      count: item.count ?? item.value ?? item.clicks ?? 0,
    }));
  }
  return Object.entries(data).map(([key, value]) => ({
    [keyName]: key,
    count:
      typeof value === "object" ? (value.value ?? value.count ?? 0) : value,
  }));
};

const doughnutColors = [
  ["rgba(6,182,212,0.8)", "rgba(6,182,212,1)"],
  ["rgba(139,92,246,0.8)", "rgba(139,92,246,1)"],
  ["rgba(236,72,153,0.8)", "rgba(236,72,153,1)"],
  ["rgba(251,191,36,0.8)", "rgba(251,191,36,1)"],
  ["rgba(16,185,129,0.8)", "rgba(16,185,129,1)"],
];

const getDoughnutOptions = (windowWidth) => {
  const isSmall = windowWidth < 500;
  const isMedium = windowWidth < 768;

  return {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: isSmall ? 8 : 12,
    },
    plugins: {
      legend: {
        position: isMedium ? "bottom" : "bottom",
        labels: {
          font: { family: FONT, size: isSmall ? 10 : isMedium ? 11 : 12, weight: "600" },
          padding: isSmall ? 10 : 14,
          usePointStyle: true,
          boxWidth: isSmall ? 6 : 8,
          color: "#94a3b8",
        },
      },
      tooltip: {
        backgroundColor: "rgba(8,13,20,0.97)",
        padding: isSmall ? 8 : 12,
        cornerRadius: 8,
        bodyFont: { family: FONT, size: isSmall ? 12 : 13 },
        titleFont: { family: FONT, size: isSmall ? 13 : 14, weight: "700" },
        maxWidth: 180,
      },
    },
  };
};

const getBarOptions = (windowWidth) => {
  const isSmall = windowWidth < 500;
  const isMedium = windowWidth < 768;

  return {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 12,
        right: 12,
        left: 12,
        bottom: 8,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(8,13,20,0.97)",
        padding: isSmall ? 8 : 12,
        cornerRadius: 8,
        bodyFont: { family: FONT, size: isSmall ? 11 : 12 },
        titleFont: { family: FONT, size: isSmall ? 12 : 13, weight: "700" },
        maxWidth: 200,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: { family: FONT, size: isSmall ? 9 : isMedium ? 10 : 11 },
          color: "#475569",
          padding: isSmall ? 4 : 6,
          maxTicksLimit: isSmall ? 5 : 8,
        },
        grid: { color: "rgba(148,163,184,0.1)", drawBorder: false },
        border: { display: false },
      },
      x: {
        ticks: {
          font: { family: FONT, size: isSmall ? 8 : isMedium ? 9 : 10 },
          color: "#475569",
          autoSkip: true,
          maxRotation: isSmall ? 45 : isMedium ? 30 : 0,
          minRotation: isSmall ? 45 : isMedium ? 30 : 0,
          padding: isSmall ? 4 : 6,
          maxTicksLimit: isSmall ? 3 : isMedium ? 5 : 10,
        },
        grid: { display: false },
        border: { display: false },
      },
    },
  };
};

const getBrowserIcon = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("chrome")) return <FaChrome style={{ color: "#f59e0b" }} />;
  if (n.includes("firefox")) return <FaFirefox style={{ color: "#f97316" }} />;
  if (n.includes("safari")) return <FaSafari style={{ color: "#60a5fa" }} />;
  if (n.includes("edge")) return <FaEdge style={{ color: "#2563eb" }} />;
  return <FaGlobe style={{ color: "#94a3b8" }} />;
};

const getDeviceIcon = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("mobile") || n.includes("phone"))
    return <FaMobile style={{ color: "#8b5cf6" }} />;
  return <FaDesktop style={{ color: "#06b6d4" }} />;
};

const AnalyticsPanel = ({ shortUrl, token }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const today = dayjs().format("YYYY-MM-DD");
  const firstDayOfYear = `${dayjs().year()}-01-01`;

  const [startDate, setStartDate] = useState(firstDayOfYear);
  const [endDate, setEndDate] = useState(today);
  // activeDates drives the query — only updates on Refresh click
  const [activeDates, setActiveDates] = useState({
    startDate: firstDayOfYear,
    endDate: today,
  });

  const { data: analyticsData = [], isLoading: loader } =
    useFetchShortLinkTotalClicks(
      token,
      shortUrl,
      activeDates.startDate,
      activeDates.endDate,
    );

  const { data: deviceData = [] } = useFetchDeviceAnalytics(shortUrl, token);
  const { data: browserData = [] } = useFetchBrowserAnalytics(shortUrl, token);
  const { data: countryData = [] } = useFetchCountryAnalytics(shortUrl, token);

  const devices = toArray(deviceData, "deviceType");
  const browsers = toArray(browserData, "browser");
  const countries = toArray(countryData, "country");

  const mkDoughnut = (items, key) => ({
    labels: items.map((d) => d[key] || "Unknown"),
    datasets: [
      {
        data: items.map((d) => d.count || 0),
        backgroundColor: doughnutColors.map((c) => c[0]),
        borderColor: doughnutColors.map((c) => c[1]),
        borderWidth: 2,
      },
    ],
  });

  const countryChartData = {
    labels: countries.slice(0, 10).map((c) => c.country || "Unknown"),
    datasets: [
      {
        label: "Clicks by Country",
        data: countries.slice(0, 10).map((c) => c.count || 0),
        backgroundColor: "rgba(6,182,212,0.8)",
        borderColor: "rgba(6,182,212,1)",
        borderWidth: 2,
        borderRadius: 8,
        barThickness: windowWidth < 500 ? 14 : windowWidth < 768 ? 18 : 24,
        maxBarThickness: 35,
      },
    ],
  };

  const handleRefresh = () => setActiveDates({ startDate, endDate });

  const doughnutOptions = getDoughnutOptions(windowWidth);
  const barOptions = getBarOptions(windowWidth);
  const isSmall = windowWidth < 500;

  return (
    <div className={styles.analytics}>
      {/* Header */}
      <div className={styles.analytics__header}>
        <div className={styles["analytics__header-icon"]}>
          <FaChartLine />
        </div>
        <div>
          <h3>Analytics Dashboard</h3>
          <p>Comprehensive insights and performance metrics</p>
        </div>
      </div>

      {/* Date form */}
      <div className={styles["analytics__date-form"]}>
        <div className={styles["analytics__date-form-grid"]}>
          <div>
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              max={endDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              min={startDate}
              max={today}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <motion.button
            className={styles["analytics__date-form-btn"]}
            onClick={handleRefresh}
            disabled={loader}
            whileHover={{ scale: loader ? 1 : 1.03 }}
            whileTap={{ scale: loader ? 1 : 0.97 }}
          >
            <FaSync
              style={{
                animation: loader ? "spin 0.7s linear infinite" : "none",
              }}
            />
            {loader ? "Loading..." : "Refresh"}
          </motion.button>
        </div>
      </div>

      {/* Content */}
      {loader ? (
        <div className="loading-center">
          <Hourglass height="56" width="56" colors={["#8b5cf6", "#a78bfa"]} />
          <p>Loading analytics...</p>
        </div>
      ) : (
        <div className={styles.analytics__sections}>
          {/* Click Timeline — empty state OR chart, never both */}
          <div className={styles.analytics__section}>
            <h4>Click Timeline</h4>
            {analyticsData.length === 0 ? (
              <div className={styles["analytics__empty-chart"]}>
                <FaChartLine />
                <p>No data for this period — try a different date range</p>
              </div>
            ) : (
              <div className={styles["analytics__chart-wrap"]}>
                <Graph graphData={analyticsData} />
              </div>
            )}
          </div>

          {/* Device + Browser */}
          <div className={styles.analytics__grid}>
            {/* Devices */}
            <motion.div
              className={styles.analytics__section}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4>Device Distribution</h4>
              {devices.length > 0 ? (
                <>
                  <div
                    className={styles["analytics__doughnut-wrap"]}
                    style={{
                      position: "relative",
                      width: "100%",
                      maxWidth: isSmall ? "240px" : "280px",
                      margin: "0 auto 14px",
                      aspectRatio: "1 / 1",
                    }}
                  >
                    <Doughnut
                      data={mkDoughnut(devices, "deviceType")}
                      options={doughnutOptions}
                    />
                  </div>
                  <div>
                    {devices.map((d, i) => (
                      <div key={i} className={styles["analytics__list-item"]}>
                        <div className={styles["analytics__list-item-left"]}>
                          {getDeviceIcon(d.deviceType || d.device)}
                          {d.deviceType || d.device || "Unknown"}
                        </div>
                        <span className={styles["analytics__list-item-count"]}>
                          {d.count || 0} clicks
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className={styles["analytics__empty-chart"]}>
                  <FaDesktop />
                  <p>No device data available</p>
                </div>
              )}
            </motion.div>

            {/* Browsers */}
            <motion.div
              className={styles.analytics__section}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h4>Browser Distribution</h4>
              {browsers.length > 0 ? (
                <>
                  <div
                    className={styles["analytics__doughnut-wrap"]}
                    style={{
                      position: "relative",
                      width: "100%",
                      maxWidth: isSmall ? "240px" : "280px",
                      margin: "0 auto 14px",
                      aspectRatio: "1 / 1",
                    }}
                  >
                    <Doughnut
                      data={mkDoughnut(browsers, "browser")}
                      options={doughnutOptions}
                    />
                  </div>
                  <div>
                    {browsers.map((b, i) => (
                      <div key={i} className={styles["analytics__list-item"]}>
                        <div className={styles["analytics__list-item-left"]}>
                          {getBrowserIcon(b.browser || b.browserName)}
                          {b.browser || b.browserName || "Unknown"}
                        </div>
                        <span className={styles["analytics__list-item-count"]}>
                          {b.count || 0} clicks
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className={styles["analytics__empty-chart"]}>
                  <FaGlobe />
                  <p>No browser data available</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Country */}
          <motion.div
            className={styles.analytics__section}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4>Geographic Distribution</h4>
            {countries.length > 0 ? (
              <>
                <div className={styles["analytics__bar-wrap"]}>
                  <Bar data={countryChartData} options={barOptions} />
                </div>
                <div className={styles["analytics__geo-grid"]}>
                  {countries.slice(0, 12).map((c, i) => (
                    <div key={i} className={styles["analytics__geo-item"]}>
                      <div className={styles["analytics__geo-item-left"]}>
                        <span>{c.country || c.countryName || "Unknown"}</span>
                      </div>
                      <span className={styles["analytics__geo-item-count"]}>
                        {c.count || 0}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className={styles["analytics__empty-chart"]}>
                <FaGlobe />
                <p>No geographic data available</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPanel;