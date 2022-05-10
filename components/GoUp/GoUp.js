// Styles
import styles from "./GoUp.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const GoUp = ({ position = "end", show = true, onClick }) => {
  return (
    <button
      className={`${styles.up} ${styles[position]} ${!show && styles.hide}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronUp} />
    </button>
  );
};

export default GoUp;
