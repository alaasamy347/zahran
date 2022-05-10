// Styles
import styles from "./Offer.module.css";

const Offer = (props) => {
  const {
    bg = "main",
    position = "start",
    text = "",
    discount,
    classes,
  } = props;

  return (
    <div
      className={`${styles.offer} ${styles[bg]} ${styles[position]} ${classes}`}
    >
      {discount && <strong>{discount}</strong>} {text}
    </div>
  );
};

export default Offer;
