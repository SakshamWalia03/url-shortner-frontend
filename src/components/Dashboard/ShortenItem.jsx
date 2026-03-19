import dayjs from "dayjs";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaExternalLinkAlt, FaRegCalendarAlt, FaChartBar,
  FaCopy, FaCheck,
} from "react-icons/fa";
import { MdOutlineAdsClick } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../store/authSlice";
import AnalyticsPanel from "./AnalyticsPanel";
import styles from "../Dashboard.module.scss";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const token = useSelector(selectAccessToken);
  const [isCopied, setIsCopied] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  const finalShortUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`;
  const displayUrl =
    import.meta.env.VITE_REACT_FRONT_END_URL.replace(/^https?:\/\//, "") +
    "/s/" +
    shortUrl;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalShortUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <motion.div
      className={styles["shorten-item"]}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <div className={styles["shorten-item__bar"]} />

      <div className={styles["shorten-item__body"]}>
        <div className={styles["shorten-item__layout"]}>
          {/* Info */}
          <div className={styles["shorten-item__info"]}>
            {/* Short link */}
            <div>
              <div className={styles["shorten-item__field-label"]}>Short Link</div>
              <div className={styles["shorten-item__short-link"]}>
                <Link target="_blank" to={finalShortUrl}>
                  {displayUrl}
                </Link>
                <FaExternalLinkAlt />
              </div>
            </div>

            {/* Original URL */}
            <div>
              <div className={styles["shorten-item__field-label"]}>Original URL</div>
              <p className={styles["shorten-item__original"]}>{originalUrl}</p>
            </div>

            {/* Stats */}
            <div className={styles["shorten-item__stats"]}>
              <div className={styles["shorten-item__stat"]}>
                <div className={`${styles["shorten-item__stat-icon"]} ${styles["shorten-item__stat-icon--green"]}`}>
                  <MdOutlineAdsClick />
                </div>
                <div>
                  <div className={styles["shorten-item__stat-value"]}>{clickCount}</div>
                  <div className={styles["shorten-item__stat-label"]}>
                    {clickCount === 1 ? "Click" : "Clicks"}
                  </div>
                </div>
              </div>

              <div className={styles["shorten-item__stat"]}>
                <div className={`${styles["shorten-item__stat-icon"]} ${styles["shorten-item__stat-icon--violet"]}`}>
                  <FaRegCalendarAlt />
                </div>
                <div>
                  <div className={styles["shorten-item__stat-date"]}>
                    {dayjs(createdDate).format("MMM DD, YYYY")}
                  </div>
                  <div className={styles["shorten-item__stat-label"]}>Created</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={styles["shorten-item__actions"]}>
            <motion.button
              className={`${styles["shorten-item__btn"]} ${isCopied ? styles["shorten-item__btn--copied"] : styles["shorten-item__btn--copy"]}`}
              onClick={handleCopy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCopied ? <><FaCheck /> Copied!</> : <><FaCopy /> Copy</>}
            </motion.button>

            <motion.button
              className={`${styles["shorten-item__btn"]} ${
                analyticsOpen
                  ? styles["shorten-item__btn--analytics--active"]
                  : styles["shorten-item__btn--analytics"]
              }`}
              onClick={() => setAnalyticsOpen((p) => !p)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaChartBar /> Analytics
            </motion.button>
          </div>
        </div>

        {/* Expandable analytics */}
        {analyticsOpen && (
          <motion.div
            className={styles["shorten-item__analytics"]}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnalyticsPanel shortUrl={shortUrl} token={token} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ShortenItem;
