import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import TextField from "../TextField";
import { RxCross2 } from "react-icons/rx";
import { FaLink, FaMagic } from "react-icons/fa";
import { createShortUrlApi } from "../../api/urls.api";
import toast from "react-hot-toast";
import styles from "../Dashboard.module.scss";

const CreateNewShorten = ({ setOpen, refetch }) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { originalUrl: "" },
    mode: "onTouched",
  });

  const createShortUrlHandler = async (data) => {
    setLoading(true);
    try {
      const { data: res } = await createShortUrlApi(data);

      const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${res.shortUrl ?? res.data?.shortUrl}`;
      await navigator.clipboard.writeText(shortenUrl).catch(() => {});
      toast.success("Short URL copied to clipboard!", { position: "bottom-center", duration: 3000 });

      await refetch();
      reset();
      setOpen(false);
    } catch {
      toast.error("Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className={styles.modal}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.28 }}
    >
      <div className={styles.modal__glow} />
      <div className={styles.modal__inner}>
        <div className={styles.modal__header}>
          {!loading && (
            <motion.button
              className={styles.modal__close}
              onClick={() => setOpen(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              type="button"
            >
              <RxCross2 />
            </motion.button>
          )}
          <div className={styles.modal__icon_wrap}><FaLink /></div>
          <h2 className={styles.modal__title}>Create Short URL</h2>
          <p className={styles.modal__subtitle}>Transform long URLs into short, shareable links instantly</p>
        </div>

        <div className={styles.modal__body}>
          <form onSubmit={handleSubmit(createShortUrlHandler)}>
            <div style={{ marginBottom: 16 }}>
              <TextField
                required
                id="originalUrl"
                label="Enter Your Long URL"
                placeholder="https://example.com/very-long-url-here"
                type="url"
                message="A valid URL is required"
                register={register}
                errors={errors}
              />
              <p className={styles["modal__field-hint"]}>
                <FaMagic /> Paste any valid URL and we'll shorten it for you
              </p>
            </div>

            <div className={styles.modal__features}>
              <p>What you'll get:</p>
              <ul>
                <li><span>✓</span> Clean, memorable short link</li>
                <li><span>✓</span> Real-time click analytics</li>
                <li><span>✓</span> Automatic clipboard copy</li>
                <li><span>✓</span> Device &amp; geo breakdown</li>
              </ul>
            </div>

            <motion.button
              type="submit"
              className={styles.modal__submit}
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? <><span className="spinner" /> Creating...</> : <><FaLink /> Create Short URL</>}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateNewShorten;
