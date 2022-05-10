// Main Imports
import Link from "next/link";
// Styles
import styles from "./MainLink.module.css";

const MainLink = (props) => {
  const {
    to = "/",
    text = "",
    classes = "",
    color = "main-outline",
    ...others
  } = props;

  return (
    <Link href={to}>
      <a className={`${styles.link} ${styles[color]} ${classes}`} {...others}>
        {text}
      </a>
    </Link>
  );
};

export default MainLink;
