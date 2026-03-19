import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { clearTokens, selectIsLoggedIn } from "../store/authSlice";
import { logoutApi } from "../api/auth.api";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const navigate    = useNavigate();
  const dispatch    = useDispatch();
  const queryClient = useQueryClient();
  const isLoggedIn  = useSelector(selectIsLoggedIn);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      // Even if the server call fails, clear frontend state
    } finally {
      dispatch(clearTokens());
      queryClient.clear();
      navigate("/");
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.navbar__inner}>
        <Link to="/" className={styles.navbar__logo}>BitLeap</Link>

        {/* Desktop */}
        <div className={styles.navbar__desktop}>
          <Link to="/about" className={styles.navbar__link}>About</Link>

          {isLoggedIn ? (
            <>
              <motion.button
                className={styles["navbar__btn--dashboard"]}
                onClick={() => navigate("/dashboard")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Dashboard
              </motion.button>
              <motion.button
                className={styles["navbar__btn--logout"]}
                onClick={handleLogout}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.button
              className={styles["navbar__btn--primary"]}
              onClick={() => navigate("/login")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Get Started
            </motion.button>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={styles.navbar__hamburger}
          onClick={() => setIsOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.navbar__mobile}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ paddingLeft: 16, paddingRight: 16 }}
          >
            <Link to="/about" className={styles.navbar__link} onClick={() => setIsOpen(false)}>About</Link>

            {isLoggedIn ? (
              <>
                <button className={styles["navbar__btn--dashboard"]} onClick={() => { navigate("/dashboard"); setIsOpen(false); }}>Dashboard</button>
                <button className={styles["navbar__btn--logout"]}    onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <button className={styles["navbar__btn--primary"]} onClick={() => { navigate("/login"); setIsOpen(false); }}>Get Started</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
