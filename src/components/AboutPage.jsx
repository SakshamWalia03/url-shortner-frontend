import { motion } from "framer-motion";
import { FaBolt, FaLock, FaChartLine, FaRocket, FaShieldAlt, FaGlobe, FaCode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./About.module.scss";

const stats  = [{ value: "10M+", label: "Links Created" }, { value: "500K+", label: "Active Users" }, { value: "99.9%", label: "Uptime" }, { value: "50+", label: "Countries" }];
const features = [
  { icon: <FaBolt />, title: "Instant Shortening", desc: "Generate clean, memorable short URLs in milliseconds. No friction — just paste and go.", color: "#06b6d4", bg: "rgba(6,182,212,0.12)" },
  { icon: <FaChartLine />, title: "Rich Analytics", desc: "Track every click with detailed breakdowns by device, browser, country, and time.", color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
  { icon: <FaShieldAlt />, title: "Secure by Design", desc: "All links are JWT-protected. Only you can manage, view, and delete your short URLs.", color: "#f43f5e", bg: "rgba(244,63,94,0.12)" },
  { icon: <FaGlobe />, title: "Global Reach", desc: "Lightning-fast redirects worldwide with consistently high uptime across all regions.", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  { icon: <FaRocket />, title: "Built to Scale", desc: "Handles millions of links and clicks without breaking a sweat. Reliable when it matters.", color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  { icon: <FaCode />, title: "Developer Friendly", desc: "Clean REST API, simple integrations, and open architecture for developers who want more.", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
];
const team = [{ name: "Saksham Walia", role: "Founder & Full-Stack Developer", avatar: "SW", color: "#06b6d4" }];

const fade = (delay = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay } });

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.about}>
      <div className="blobs">
        <div className="blob blob--cyan"   style={{ top: "-60px", left: "-80px" }} />
        <div className="blob blob--violet" style={{ bottom: "60px", right: "-60px" }} />
      </div>

      {/* Hero */}
      <motion.section className={styles.about__hero} {...fade(0.05)}>
        <div className={styles.about__badge}>About BitLeap</div>
        <h1 className={styles.about__title}>
          Built for modern{" "}
          <span className={styles.about__highlight}>link management</span>
        </h1>
        <p className={styles.about__subtitle}>
          BitLeap is a powerful, analytics-first URL shortening platform designed to help
          individuals and teams create, manage, and understand their links — all in one
          beautifully crafted dark dashboard.
        </p>
        <div className={styles.about__cta}>
          <button className={styles["about__cta-btn--primary"]} onClick={() => navigate("/register")}>Get Started Free</button>
          <button className={styles["about__cta-btn--outline"]} onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section className={styles.about__stats} {...fade(0.15)}>
        <div className={styles["about__stats-inner"]}>
          {stats.map((s, i) => (
            <div key={i} className={styles.about__stat}>
              <div className={styles["about__stat-value"]}>{s.value}</div>
              <div className={styles["about__stat-label"]}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Mission */}
      <motion.section className={styles.about__mission} {...fade(0.22)}>
        <div className={styles["about__mission-inner"]}>
          <div className={styles["about__mission-badge"]}>Our Mission</div>
          <h2>Simplify how the world shares links</h2>
          <p>
            We believe every link tells a story. BitLeap gives you the tools to shorten URLs
            in seconds and understand exactly how your audience engages with them — no
            complexity, no bloat. Just clean links and clear insights.
          </p>
        </div>
      </motion.section>

      {/* Features */}
      <section className={styles.about__features}>
        <motion.div className={styles["about__features-header"]} {...fade(0.28)}>
          <div className={styles["about__features-badge"]}>What We Offer</div>
          <h2>Everything you need, nothing you don't</h2>
        </motion.div>
        <div className={styles.about__grid}>
          {features.map((f, i) => (
            <motion.div key={i} className={styles.about__card} {...fade(0.3 + i * 0.07)} whileHover={{ y: -6 }}>
              <div className={styles.about__card_icon} style={{ color: f.color, background: f.bg }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <motion.section className={styles.about__team} {...fade(0.5)}>
        <div className={styles["about__team-badge"]}>The Team</div>
        <h2>Made with care</h2>
        <div className={styles.about__team_grid}>
          {team.map((m, i) => (
            <div key={i} className={styles.about__member}>
              <div className={styles.about__member_avatar} style={{ background: `linear-gradient(135deg, ${m.color}, #8b5cf6)` }}>
                {m.avatar}
              </div>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section className={styles["about__bottom-cta"]} {...fade(0.58)}>
        <div className={styles["about__bottom-cta-inner"]}>
          <div className={styles["about__bottom-cta-dots"]} />
          <motion.div className={`${styles["about__bottom-cta-blob"]} ${styles["about__bottom-cta-blob--top"]}`} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} />
          <motion.div className={`${styles["about__bottom-cta-blob"]} ${styles["about__bottom-cta-blob--bottom"]}`} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, delay: 1 }} />
          <div className={styles["about__bottom-cta-content"]}>
            <h2>Ready to start shortening?</h2>
            <p>Join thousands of users who trust BitLeap for clean, trackable links.</p>
            <motion.button onClick={() => navigate("/register")} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              Create Free Account
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
