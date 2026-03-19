import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import CreateNewShorten from "./CreateNewShorten";
import styles from "../Dashboard.module.scss";

const ShortenPopUp = ({ open, setOpen, refetch }) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles["modal-overlay"]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <CreateNewShorten setOpen={setOpen} refetch={refetch} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShortenPopUp;
