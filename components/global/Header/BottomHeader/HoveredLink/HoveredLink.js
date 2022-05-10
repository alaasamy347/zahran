// Main Imports
import Link from "next/link";
// Styles
import styles from "./HoveredLink.module.css";

const HoveredLink = (props) => {
  const { to = "/category", classes, text = "", children, ...other } = props;

  return (
    <Link href={to}>
      <a className={`${styles["nav-link"]} ${classes}`} {...other}>
        {text}
        {children}
      </a>
    </Link>
  );
};

export default HoveredLink;
