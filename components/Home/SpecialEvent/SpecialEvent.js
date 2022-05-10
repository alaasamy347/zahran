// Main Imports
import Image from "next/image";
import Link from "next/link";
// Styles
import styles from "./SpecialEvent.module.css";

const SpecialEvent = ({ to = "/category", title = "", imgURL }) => {
  return (
    <Link href={to}>
      <a className={styles.event}>
        <p className={styles.title}>{title}</p>
        <div className={styles.image}>
          <Image
            src={imgURL}
            alt="..."
            width="100"
            height="100"
            placeholder="blur"
            blurDataURL={imgURL}
          />
        </div>
      </a>
    </Link>
  );
};

export default SpecialEvent;
