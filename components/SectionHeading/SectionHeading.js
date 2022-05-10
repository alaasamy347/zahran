// Styles
import styles from "./SectionHeading.module.css";

const SectionHeading = (props) => {
  const { as = "h2", text = "", classes, children } = props;

  return (
    <div className={styles.heading}>
      <h2 className={`${styles.title} ${classes}`}>{text}</h2>
      {children}
    </div>
  );
};

export default SectionHeading;
