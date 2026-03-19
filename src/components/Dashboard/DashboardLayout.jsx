import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../store/authSlice";
import { useFetchMyShortUrls, useFetchTotalClicks } from "../../hooks/useQuery";
import Graph from "./Graph";
import ShortenPopUp from "./ShortenPopUp";
import ShortenUrlList from "./ShortenUrlList";
import { FaPlus, FaChartLine, FaLink } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import styles from "../Dashboard.module.scss";

const DashboardLayout = () => {
  const token = useSelector(selectAccessToken);
  const [shortenPopUp, setShortenPopUp] = useState(false);
  const currentYear = new Date().getFullYear();
  const [startDate, setStartDate] = useState(`${currentYear}-01-01`);
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
  const onError = () => toast.error("Error fetching details");
  const { isLoading, data: myShortenUrls = [], refetch } = useFetchMyShortUrls(token, onError);
  const { isLoading: loader, data: totalClicks = [] } = useFetchTotalClicks(token, startDate, endDate, onError);

  return (
    <div className={styles.dashboard}>
      <div className="blobs">
        <div className="blob blob--cyan"   style={{ top: "-80px", left: "-100px" }} />
        <div className="blob blob--violet" style={{ bottom: 0, right: "-80px" }} />
      </div>

      <div className={styles.dashboard__inner}>
        {/* Header */}
        <motion.div
          className={styles.dashboard__header}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className={styles["dashboard__header-row"]}>
            <div>
              <h1>Dashboard</h1>
              <p>Manage and track your shortened links</p>
            </div>
            <motion.button
              className={styles.dashboard__create_btn}
              onClick={() => setShortenPopUp(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaPlus /> Create Short URL
            </motion.button>
          </div>

          {/* Date range */}
          <motion.div
            className={styles.dashboard__period}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className={styles["dashboard__period-title"]}>
              <FaChartLine className={styles["dashboard__period-icon"]} />
              Analytics Period
            </div>
            <div className={styles["dashboard__period-fields"]}>
              <div>
                <label>Start Date</label>
                <input type="date" value={startDate} max={endDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div>
                <label>End Date</label>
                <input type="date" value={endDate} min={startDate} max={dayjs().format("YYYY-MM-DD")} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        {loader ? (
          <div className="loading-center">
            <TailSpin height={48} width={48} color="#06b6d4" />
            <p>Loading analytics...</p>
          </div>
        ) : (
          <div className={styles.dashboard__content}>
            {/* Chart */}
            <motion.div
              className={styles["dashboard__chart-card"]}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <div className={styles["dashboard__chart-card-title"]}>Click Analytics</div>
              {totalClicks.length === 0 ? (
                <div className={styles["dashboard__chart-card-empty"]}>
                  <div className={styles["dashboard__chart-card-empty-icon"]}><FaChartLine /></div>
                  <h3>No Data For This Period</h3>
                  <p>Share your short links to start seeing engagement analytics</p>
                </div>
              ) : (
                <div className={styles["dashboard__chart-card-body"]}>
                  <Graph graphData={totalClicks} />
                </div>
              )}
            </motion.div>

            {/* URL list */}
            <motion.div
              className={styles.dashboard__section}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.22 }}
            >
              <div className={styles["dashboard__section-title"]}>Your Short Links</div>
              {isLoading ? (
                <div className="loading-center">
                  <TailSpin height={40} width={40} color="#8b5cf6" />
                </div>
              ) : myShortenUrls.length === 0 ? (
                <div className={styles.dashboard__empty}>
                  <div className={styles["dashboard__empty-icon"]}><FaLink /></div>
                  <h3>No Short Links Yet</h3>
                  <p>Create your first short link to get started with tracking and analytics</p>
                  <motion.button onClick={() => setShortenPopUp(true)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <FaPlus /> Create Your First Link
                  </motion.button>
                </div>
              ) : (
                <ShortenUrlList data={myShortenUrls} />
              )}
            </motion.div>
          </div>
        )}
      </div>

      <ShortenPopUp refetch={refetch} open={shortenPopUp} setOpen={setShortenPopUp} />
    </div>
  );
};

export default DashboardLayout;
