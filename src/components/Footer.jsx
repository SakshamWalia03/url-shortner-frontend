import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import styles from "./Dashboard.module.scss";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__inner}>
      <motion.div
        className={styles.footer__logo}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        BitLeap
      </motion.div>

      <motion.p
        className={styles.footer__copy}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        &copy; {new Date().getFullYear()} BitLeap. All rights reserved.
      </motion.p>

      <motion.div
        className={styles.footer__github}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span>Made by</span>
        <a
          href="https://github.com/SakshamWalia03"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          GitHub
        </a>
      </motion.div>
    </div>
    <div className={styles.footer__line} />
  </footer>
);

export default Footer;
