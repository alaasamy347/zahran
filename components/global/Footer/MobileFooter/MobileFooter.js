// Main Imports
import Link from "next/link";
import Image from "next/image";
// Styles
import styles from "./MobileFooter.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
// Redux
import { useSelector } from "react-redux";

const MobileFooter = () => {
  const { cart } = useSelector((state) => state.cart);
  const { lang } = useSelector((state) => state.shared);

  return (
    <section className={styles["mob-footer"]}>
      <div className="container">
        <ul className="row g-0 position-relative">
          <li className="col">
            <Link href="/">
              <a className={styles.link}>
                <i className={styles.icon}>
                  <FontAwesomeIcon icon={faHome} />
                </i>
                <span className="mt-1">
                  {lang === "en" ? "Home" : "الرئيسية"}
                </span>
              </a>
            </Link>
          </li>
          <li className="col">
            <Link href="/">
              <a className={styles.link}>
                <i className={styles.icon}>
                  <FontAwesomeIcon icon={faUser} />
                </i>
                <span className="mt-1">
                  {lang === "en" ? "Account" : "الحساب"}
                </span>
              </a>
            </Link>
          </li>
          <li className="col">
            <Link href="/">
              <a href="#" className={`${styles.link} ${styles.active}`}>
                <i className={`${styles.icon}`}>
                  <Image
                    src="/images/discount-svgrepo-com.svg"
                    width="20"
                    height="20"
                    alt="sale"
                  />
                </i>
                <span className="mt-1">
                  {lang === "en" ? "Deals" : "العروض"}
                </span>
              </a>
            </Link>
          </li>
          <li className="col">
            <Link href="/">
              <a className={styles.link}>
                <i className={styles.icon}>
                  <FontAwesomeIcon icon={faThLarge} />
                </i>
                <span className="mt-1">
                  {lang === "en" ? "Categories" : "الفئات"}
                </span>
              </a>
            </Link>
          </li>
          <li className="col">
            <Link href="/cart">
              <a className={styles.link}>
                <i className={`${styles.icon} position-relative`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="#464646"
                    className={styles.flip}
                  >
                    <path
                      d="M6.27724 3.99999L8.93751 13.1654H14.6763C16.6845 13.1654 18.4979 11.964 19.2807 10.1147L19.8626 8.7401C20.1418 8.08074 19.6578 7.35026 18.9418 7.35026H7.21692"
                      stroke="#fff"
                    ></path>
                    <path
                      d="M4 4H4.77519C5.66505 4 6.44788 4.58792 6.69592 5.44251L8.9375 13.1655H14.6763C16.6845 13.1655 18.4979 11.964 19.2807 10.1147L19.8626 8.74011C20.1418 8.08075 19.6578 7.35027 18.9417 7.35027H7.21692"
                      stroke="#fff"
                    ></path>
                    <path
                      d="M10.3845 20C11.2229 20 11.9026 19.3203 11.9026 18.4818C11.9026 17.6434 11.2229 16.9637 10.3845 16.9637C9.54604 16.9637 8.86633 17.6434 8.86633 18.4818C8.86633 19.3203 9.54604 20 10.3845 20Z"
                      stroke="#fff"
                    ></path>
                    <path
                      d="M18.6194 15.6198H11.125C10.2164 15.6198 9.42189 15.0072 9.19077 14.1285L8.9375 13.1655L14.5226 13.1655"
                      stroke="#fff"
                    ></path>
                    <path
                      d="M16.8232 20C17.6617 20 18.3414 19.3203 18.3414 18.4818C18.3414 17.6434 17.6617 16.9637 16.8232 16.9637C15.9848 16.9637 15.3051 17.6434 15.3051 18.4818C15.3051 19.3203 15.9848 20 16.8232 20Z"
                      stroke="#fff"
                    ></path>
                  </svg>
                  <span className={styles.cart}>{cart.length}</span>
                </i>
                <span className="mt-1">
                  {lang === "en" ? "Cart" : "العربة"}
                </span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default MobileFooter;
