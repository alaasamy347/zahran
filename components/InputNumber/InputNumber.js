// Styles
import styles from "./InputNumber.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const InputNumber = ({
  handleIncrement,
  handleDecrement,
  quantity,
  classes,
}) => {
  return (
    <div className={`${styles.wrapper} ${classes}`}>
      <button className={styles.minus} onClick={handleDecrement}>
        {quantity !== 1 ? (
          <FontAwesomeIcon icon={faMinus} />
        ) : (
          <FontAwesomeIcon icon={faTrashAlt} />
        )}
      </button>
      <span className={styles.number}>{quantity}</span>
      <button className={styles.plus} onClick={handleIncrement}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default InputNumber;
