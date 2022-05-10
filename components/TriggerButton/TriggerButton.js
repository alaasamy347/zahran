// Styles
import styles from "./TriggerButton.module.css";

const TriggerButton = (props) => {
  const {icon = null, text = "", onClick, classes, ...others} = props;
  return (
    <button onClick={onClick} className={`${styles.btn} ${classes}`} {...others}>
      {icon && icon}
      {text && <span>{text}</span>}
    </button>
  );
}

export default TriggerButton;