import { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../store/authSlice";
import { loginApi } from "../api/auth.api";
import toast from "react-hot-toast";
import styles from "./Auth.module.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { username: "", password: "" },
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    setLoader(true);
    try {
      const { data: res } = await loginApi(data);

      // Backend returns accessToken in body; refreshToken is set as httpOnly cookie
      const accessToken = res?.data?.accessToken ?? res?.accessToken;

      if (!accessToken) {
        throw new Error("Server did not return an access token.");
      }

      dispatch(setAccessToken(accessToken));
      toast.success("Logged in successfully!");
      reset();
      navigate("/dashboard");
    } catch (error) {
      const msg = error.response?.data?.message ?? error.message ?? "Failed to login";
      toast.error(msg);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className={styles.auth}>
      <div className="blobs">
        <div className="blob blob--cyan"   style={{ top: 0, left: "25%" }} />
        <div className="blob blob--violet" style={{ bottom: 0, right: "25%" }} />
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
              className={`${styles.auth__badge} ${styles["auth__badge--login"]}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span>Welcome Back</span>
            </motion.div>

            <motion.h1
              className={styles.auth__title}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Login to <span className={styles["auth__title-highlight"]}>BitLeap</span>
            </motion.h1>

            <motion.p
              className={styles.auth__subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Continue managing your links with ease
            </motion.p>
          </div>

          <motion.form
            className={styles.auth__form}
            onSubmit={handleSubmit(loginHandler)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <TextField label="Username" required id="username" type="text"     message="Username is required" placeholder="Enter your username" register={register} errors={errors} />
            <TextField label="Password" required id="password" type="password" message="Password is required" placeholder="Enter your password" register={register} min={8} errors={errors} />

            <motion.button
              type="submit"
              className={styles.auth__btn}
              disabled={loader}
              whileHover={{ scale: loader ? 1 : 1.02 }}
              whileTap={{ scale: loader ? 1 : 0.98 }}
            >
              {loader ? <><span className="spinner" /> Logging in...</> : "Login to Dashboard"}
            </motion.button>
          </motion.form>

          <motion.p className={styles.auth__footer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            Don't have an account? <Link to="/register">Create Account</Link>
          </motion.p>
        </div>

        <motion.p className={styles.auth__legal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          By logging in, you agree to our <Link to="/login">Terms of Service</Link> and <Link to="/login">Privacy Policy</Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
