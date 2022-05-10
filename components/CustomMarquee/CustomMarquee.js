// Main Imports
import Marquee from "react-fast-marquee";
// Styles
import styles from "./CustomMarquee.module.css";

const CustomMarquee = (props) => {
  const { direction = "left", text = "", ...others } = props;

  return (
    <Marquee
      className={styles.marquee}
      pauseOnHover
      speed={30}
      direction={direction}
      gradient={false}
      {...others}
    >
      {text}
    </Marquee>
  );
};

export default CustomMarquee;
