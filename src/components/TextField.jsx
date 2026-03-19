import styles from "./Auth.module.scss";

const TextField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  min,
  placeholder,
}) => {
  const hasError = !!errors?.[id]?.message;

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.field__label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${styles.field__input} ${hasError ? styles["field__input--error"] : ""}`}
        {...register(id, {
          required: { value: required, message },
          minLength: min
            ? { value: min, message: `Minimum ${min} characters required` }
            : undefined,
          pattern:
            type === "email"
              ? {
                  value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                  message: "Invalid email address",
                }
              : type === "url"
              ? {
                  value: /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                  message: "Please enter a valid URL",
                }
              : undefined,
        })}
      />
      {hasError && (
        <p className={styles.field__error}>{errors[id].message}</p>
      )}
    </div>
  );
};

export default TextField;
