import { motion, AnimatePresence } from "framer-motion";
import { FaBolt, FaLock, FaChartLine, FaClock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../store/authSlice";
import styles from "./LandingPage.module.scss";

const features = [
  { title: "Quick URL Shortening", desc: "Generate short, memorable URLs in seconds. Fast, intuitive, and hassle-free.", icon: <FaBolt />, iconClass: "cyan" },
  { title: "Analytics Dashboard", desc: "Track clicks, referrals, and locations. Optimize your strategy with real data.", icon: <FaChartLine />, iconClass: "violet" },
  { title: "Secure Links", desc: "All URLs are JWT-protected. Only you can manage and delete your short links.", icon: <FaLock />, iconClass: "rose" },
  { title: "Reliable & Fast", desc: "Lightning-fast redirects and consistently high uptime across all regions.", icon: <FaClock />, iconClass: "amber" },
];

const LandingPage = () => {
  const navigate   = useNavigate();
  const location   = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className={styles.landing}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Blobs */}
        <div className="blobs">
          <div className="blob blob--cyan"   style={{ top: "-80px", left: "-100px" }} />
          <div className="blob blob--violet" style={{ bottom: "80px", right: "-100px" }} />
          <div className="blob blob--blue"   style={{ top: "40%", left: "30%" }} />
        </div>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div className={styles.landing__hero}>
          <motion.div
            className={styles.landing__text}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            {/* Auth-aware pill badge */}
            {isLoggedIn ? (
              <div className={styles["landing__badge--active"]}>
                <span className={styles["landing__badge--active-dot"]} />
                You're logged in
              </div>
            ) : (
              <div className={styles.landing__badge}>Modern URL Management</div>
            )}

            <h1 className={styles.landing__title}>
              Transform Your Links Into{" "}
              <span className={styles.landing__highlight}>Powerful Assets</span>
            </h1>

            <p className={styles.landing__desc}>
              Create short, memorable links in seconds with BitLeap. Share them
              across platforms and track performance with our intuitive analytics dashboard.
            </p>

            {/* ── Auth-aware CTA buttons ─────────────────────────────── */}
            <div className={styles.landing__cta}>
              {isLoggedIn ? (
                <>
                  <motion.button
                    className={`${styles.landing__btn} ${styles["landing__btn--primary"]}`}
                    onClick={() => navigate("/dashboard")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Go to Dashboard →
                  </motion.button>
                  <motion.button
                    className={`${styles.landing__btn} ${styles["landing__btn--outline"]}`}
                    onClick={() => navigate("/dashboard")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Create Short URL
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    className={`${styles.landing__btn} ${styles["landing__btn--primary"]}`}
                    onClick={() => navigate("/register")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Get Started Free
                  </motion.button>
                  <motion.button
                    className={`${styles.landing__btn} ${styles["landing__btn--outline"]}`}
                    onClick={() => navigate("/login")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Sign In
                  </motion.button>
                </>
              )}
            </div>

            <div className={styles.landing__stats}>
              <div>
                <div className={`${styles["landing__stat-value"]} ${styles["landing__stat-value--cyan"]}`}>10M+</div>
                <div className={styles["landing__stat-label"]}>Links Created</div>
              </div>
              <div className={styles["landing__stat-divider"]} />
              <div>
                <div className={`${styles["landing__stat-value"]} ${styles["landing__stat-value--violet"]}`}>500K+</div>
                <div className={styles["landing__stat-label"]}>Active Users</div>
              </div>
              <div className={styles["landing__stat-divider"]} />
              <div>
                <div className={`${styles["landing__stat-value"]} ${styles["landing__stat-value--emerald"]}`}>99.9%</div>
                <div className={styles["landing__stat-label"]}>Uptime</div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className={styles.landing__image}
            initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles["landing__image-wrapper"]}>
              <motion.div
                className={styles["landing__image-glow"]}
                animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.28, 0.15] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <img src="/images/landingPage.png" alt="BitLeap dashboard preview" />
            </div>
          </motion.div>
        </div>

        {/* ── Features ──────────────────────────────────────────────────── */}
        <div className={styles.landing__features}>
          <motion.div
            className={styles["landing__features-header"]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles["landing__features-badge"]}>Why BitLeap</div>
            <h2>Everything you need to manage links at scale</h2>
            <p>Trusted by individuals and teams worldwide for reliable, fast, and secure URL shortening</p>
          </motion.div>

          <div className={styles.landing__grid}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                className={styles.landing__card}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 + i * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className={`${styles["landing__card-icon"]} ${styles[`landing__card-icon--${f.iconClass}`]}`}>
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA — auth-aware ───────────────────────────────────── */}
        <div className={styles["landing__cta-section"]}>
          <motion.div
            className={styles["landing__cta-section-inner"]}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <div className={styles["landing__cta-section-dots"]} />
            <motion.div
              className={`${styles["landing__cta-section-blob"]} ${styles["landing__cta-section-blob--top"]}`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className={`${styles["landing__cta-section-blob"]} ${styles["landing__cta-section-blob--bottom"]}`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            />
            <div className={styles["landing__cta-section-content"]}>
              {isLoggedIn ? (
                <>
                  <h2>Welcome back to BitLeap</h2>
                  <p>Your dashboard is ready — manage your links and track analytics</p>
                  <motion.button
                    onClick={() => navigate("/dashboard")}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Open Dashboard →
                  </motion.button>
                </>
              ) : (
                <>
                  <h2>Ready to transform your links?</h2>
                  <p>Join thousands of users who trust BitLeap for their link management needs</p>
                  <motion.button
                    onClick={() => navigate("/register")}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Start Free Today
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LandingPage;
