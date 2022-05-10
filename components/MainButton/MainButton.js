// Styles
import styles from "./MainButton.module.css";

const MainButton = (props) => {
  const {
    text = "",
    icon,
    classes = "",
    bg = "main",
    onClick,
    ...other
  } = props;
  return (
    <button
      className={`${styles.btn} ${styles[bg]} ${classes}`}
      onClick={onClick}
      {...other}
    >
      {icon}
      {text}
    </button>
  );
};

export default MainButton;
