// Main Imports
import Link from "next/link";
import Image from "next/image";
// Styles
import styles from "./CheckoutHeader.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const CheckoutHeader = ({ backTo = "cart", show = true }) => {
  return (
    <header className={styles["checkout-header"]}>
      <div className="container d-flex align-items-center justify-content-between">
        {show ? (
          <Link href={`/${backTo}`}>
            <a className="text-capitalize">
              <FontAwesomeIcon icon={faArrowLeftLong} className="me-2" />
              {backTo}
            </a>
          </Link>
        ) : (
          <Link href="/">
            <a className="text-capitalize">
              <FontAwesomeIcon icon={faArrowLeftLong} className="me-2" />
              Continue Shopping
            </a>
          </Link>
        )}
        <Link href="/">
          <a className="d-flex ms-auto">
            <Image src="/images/logo.webp" alt="Logo" width={120} height={34} />
          </a>
        </Link>
      </div>
    </header>
  );
};

export default CheckoutHeader;
