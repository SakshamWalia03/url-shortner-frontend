import { motion } from "framer-motion";
import ShortenItem from "./ShortenItem";
import styles from "../Dashboard.module.scss";

const ShortenUrlList = ({ data }) => (
  <div className={styles["url-list"]}>
    {data.map((item, index) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
      >
        <ShortenItem {...item} />
      </motion.div>
    ))}
  </div>
);

export default ShortenUrlList;
