// Main Imports
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
// Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MobileFooter from "../Footer/MobileFooter/MobileFooter";
import GoUp from "../../GoUp/GoUp";
import FloatingCart from "../../FloatingCart/FloatingCart";
// Styles
import styles from "./Layout.module.css";
// Redux
import { useSelector } from "react-redux";

let once = true;

const Layout = ({ children }) => {
  const { lang } = useSelector((state) => state.shared);

  const [showGoup, setShowGoup] = useState(false);

  const handleGoupShow = () => {
    if (window.scrollY > window.outerHeight) {
      if (once) {
        once = !once;
        setShowGoup(true);
      }
    } else {
      if (!once) {
        once = !once;
        setShowGoup(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleGoupShow);

    return () => window.removeEventListener("scroll", handleGoupShow);
  }, []);

  if (children.props.layout) {
    return (
      <>
        <ToastContainer rtl={lang !== "en"} autoClose={1000} />
        <div className={styles.layout}>
          <Header />
          {children}
          <Footer />
          <MobileFooter />
          <FloatingCart position="end" />
          <div className={styles["sub-add-to-cart"]}>
            Compensate for add to cart fixed bottom
          </div>
          <div className={styles["sub-mobile-nav"]}>
            Compensate for mobile nav fixed bottom
          </div>
        </div>
      </>
    );
  }

  if (children.props.checkout) {
    return (
      <>
        <ToastContainer rtl={lang !== "en"} autoClose={1000} />
        <div className={styles.layout}>{children}</div>
      </>
    );
  }

  return (
    <>
      <ToastContainer rtl={lang !== "en"} autoClose={1000} />
      <div className={styles.layout}>
        <Header />
        {children}
        <Footer />
        <MobileFooter />
        <GoUp
          position="start"
          show={showGoup}
          onClick={() => window.scroll({ top: 0 })}
        />
        <FloatingCart position="end" />
        <div className={styles["sub-mobile-nav"]}>
          Compensate for mobile nav fixed bottom
        </div>
      </div>
    </>
  );
};

export default Layout;
