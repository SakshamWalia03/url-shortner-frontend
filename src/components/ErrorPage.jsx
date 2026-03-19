import { Link } from "react-router-dom";
import styles from "./Dashboard.module.scss";

const ErrorPage = () => (
  <div className={styles["error-page"]}>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist or has been moved.</p>
    <Link to="/">Go back home</Link>
  </div>
);

export default ErrorPage;
