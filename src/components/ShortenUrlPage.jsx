import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import styles from "./Dashboard.module.scss";

const ShortenUrlPage = () => {
  const { shortUrl } = useParams();

  useEffect(() => {
    if (shortUrl) {
      window.location.href = import.meta.env.VITE_BACKEND_URL + `/${shortUrl}`;
    }
  }, [shortUrl]);

  return (
    <div className={styles.redirect}>
      <img src="/images/image1.png" alt="BitLeap Logo" />
      <p>BitLeap — Shorten links, track clicks, and stay in control</p>
      <TailSpin height={48} width={48} color="#06b6d4" ariaLabel="loading" />
      <p>Redirecting...</p>
    </div>
  );
};

export default ShortenUrlPage;
