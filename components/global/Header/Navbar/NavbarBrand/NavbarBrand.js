// Main Imports
import Image from "next/image";
import Link from "next/link";
// Components
import TriggerButton from "../../../../TriggerButton/TriggerButton";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
// Styles
import styles from "./NavbarBrand.module.css";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setLang } from "../../../../../redux/slices/shared/sharedSlice";

const NavbarBrand = ({ handleShowCanvas }) => {
  const { lang } = useSelector((state) => state.shared);
  const dispatch = useDispatch();

  const langText = lang === "en" ? "العربية" : "en";

  return (
    <div className={styles.brand}>
      <TriggerButton
        icon={<FontAwesomeIcon icon={faBars} />}
        onClick={() => handleShowCanvas("sideNav")}
        classes="d-md-none fs-5"
        aria-controls="basic-navbar-nav"
      />
      <Link href="/">
        <a>
          <Image src="/images/logo.webp" alt="Logo" width={100} height={34} />
        </a>
      </Link>
      <TriggerButton
        text={langText}
        onClick={() => dispatch(setLang(langText))}
        classes="d-md-none text-uppercase fw-bold"
      />
      <TriggerButton
        icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
        text={
          lang === "en"
            ? "Egypt - Alexandria - Somuha"
            : "مصر - الاسكندرية - سموحه"
        }
        onClick={() => handleShowCanvas("locator")}
        aria-controls="locator"
        classes={styles.locator}
      />
    </div>
  );
};

export default NavbarBrand;
