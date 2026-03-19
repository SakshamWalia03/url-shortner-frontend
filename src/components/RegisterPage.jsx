import { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { registerApi } from "../api/auth.api";
import toast from "react-hot-toast";
import styles from "./Auth.module.scss";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { username: "", email: "", password: "" },
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      await registerApi(data);
      reset();
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to create account at the moment"
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className={styles.auth}>
      <div className="blobs">
        <div className="blob blob--violet" style={{ top: 0, right: "25%" }} />
        <div className="blob blob--cyan" style={{ bottom: 0, left: "25%" }} />
      </div>

      <motion.div
        className={styles.auth__form_wrap}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className={styles.auth__card}>
          <div className={styles.auth__header}>
            <motion.div
              className={`${styles.auth__badge} ${styles["auth__badge--register"]}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span>Get Started</span>
            </motion.div>

            <motion.h1
              className={styles.auth__title}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Create Your{" "}
              <span className={styles["auth__title-highlight"]}>Account</span>
            </motion.h1>

            <motion.p
              className={styles.auth__subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Start managing your links in seconds
            </motion.p>
          </div>

          <motion.form
            className={styles.auth__form}
            onSubmit={handleSubmit(registerHandler)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <TextField label="Username" required id="username" type="text"     message="Username is required" placeholder="Choose a username"                     register={register} errors={errors} />
            <TextField label="Email"    required id="email"    type="email"    message="Email is required"    placeholder="Enter your email"                      register={register} errors={errors} />
            <TextField label="Password" required id="password" type="password" message="Password is required" placeholder="Create a password (min 8 characters)" register={register} min={8} errors={errors} />

            <div className={styles.auth__hint}>
              <p>Password must contain:</p>
              <ul>
                <li><span>✓</span> At least 8 characters</li>
                <li><span>✓</span> One uppercase &amp; lowercase letter</li>
                <li><span>✓</span> One number or special character</li>
              </ul>
            </div>

            <motion.button
              type="submit"
              className={styles.auth__btn}
              disabled={loader}
              whileHover={{ scale: loader ? 1 : 1.02 }}
              whileTap={{ scale: loader ? 1 : 0.98 }}
            >
              {loader ? <><span className="spinner" /> Creating Account...</> : "Create Account"}
            </motion.button>
          </motion.form>

          <motion.p className={styles.auth__footer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            Already have an account? <Link to="/login">Sign In</Link>
          </motion.p>
        </div>

        <motion.p className={styles.auth__legal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          By creating an account, you agree to our{" "}
          <Link to="/register">Terms of Service</Link> and{" "}
          <Link to="/register">Privacy Policy</Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
