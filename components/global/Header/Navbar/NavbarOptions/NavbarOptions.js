// Main Imports
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
// Components
import TriggerButton from "../../../../TriggerButton/TriggerButton";
import MainButton from "../../../../MainButton/MainButton";
import CustomModal from "../../../../CustomModal/CustomModal";
import LoginForm from "../../../../FormModal/LoginForm/LoginForm";
import SignupForm from "../../../../FormModal/SignupForm/SignupForm";
import ForgotForm from "../../../../FormModal/ForgotForm/ForgotForm";
// Styles
import styles from "./NavbarOptions.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDoubleLeft,
  faHistory,
  faLock,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setLang } from "../../../../../redux/slices/shared/sharedSlice";
import { updateUser } from "../../../../../redux/slices/users/userSlice";

const logedLinks = [
  {
    id: 1,
    title: "Profile",
    titleAR: "معلومات الحساب",
    icon: <FontAwesomeIcon icon={faUser} />,
    to: "/dashboard/profile",
  },
  {
    id: 2,
    title: "Change Password",
    titleAR: "تعديل كلمة المرور",
    icon: <FontAwesomeIcon icon={faLock} />,
    to: "/dashboard/password",
  },
  {
    id: 3,
    title: "Addresses",
    titleAR: "العنواين",
    icon: <FontAwesomeIcon icon={faMapMarkedAlt} />,
    to: "/dashboard/addresses",
  },
  {
    id: 4,
    title: "Orders",
    titleAR: "الطلبيات",
    icon: <FontAwesomeIcon icon={faHistory} />,
    to: "/dashboard/orders",
  },
  {
    id: 5,
    title: "Wishlist",
    titleAR: "المنتجات المفضلة",
    icon: <FontAwesomeIcon icon={faHeart} />,
    to: "/dashboard/wishlist",
  },
  {
    id: 6,
    title: "Favourites",
    titleAR: "الطلبيات المفضلة",
    icon: <FontAwesomeIcon icon={faStar} />,
    to: "/dashboard/orders#favourites",
  },
];

const NavbarOptions = ({ handleShowCanvas, count }) => {
  const { lang } = useSelector((state) => state.shared);
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  const [showLogin, setShowLogin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [registerType, setRegisterType] = useState("");

  const langText = lang === "en" ? "العربية" : "en";

  const handleLoginModal = (type) => {
    setShowLoginModal((prev) => !prev);
    setRegisterType(type);
  };

  useEffect(() => {
    if (localStorage.getItem("lang") !== null) {
      dispatch(setLang(localStorage.getItem("lang")));
    }
    if (lang === "en") {
      document.documentElement.lang = "en";
      document.body.dir = "ltr";
    } else {
      document.documentElement.lang = "ar";
      document.body.dir = "rtl";
    }
    if (localStorage.getItem("user") !== null) {
      dispatch(updateUser(JSON.parse(localStorage.getItem("user"))));
    }
  }, [dispatch, lang]);

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.PUBLIC_URL}/api/users/logout`);
    const jsonRes = await res.json();
    if (res.ok) {
      dispatch(updateUser(null));
      toast.success(jsonRes.message);
      router.push("/");
    }
  };

  return (
    <>
      <ul className={styles.options}>
        <li
          className={`${styles["nav-item"]}`}
          onMouseEnter={() => setShowLogin(true)}
          onMouseLeave={() => setShowLogin(false)}
        >
          {user ? (
            <>
              <TriggerButton
                icon={<FontAwesomeIcon icon={faUser} />}
                text={
                  lang === "en"
                    ? `Welcome ${user.firstName}`
                    : `مرحبا ${user.firstName}`
                }
              />
              {showLogin && (
                <ul className={styles["dropdown-menu"]}>
                  {logedLinks?.map((el) => (
                    <li key={el.id}>
                      <Link href={el.to}>
                        <a className={styles["dropdown-menu-link"]}>
                          {el.icon}
                          <span>{lang === "en" ? el.title : el.titleAR}</span>
                        </a>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <MainButton
                      text={lang === "en" ? "Logout" : "تسجيل الخروج"}
                      classes="w-100"
                      onClick={handleLogout}
                      bg="alt"
                    />
                  </li>
                </ul>
              )}
            </>
          ) : (
            <>
              <TriggerButton
                icon={<FontAwesomeIcon icon={faUser} />}
                text={lang === "en" ? "login / register" : "تسجيل الدخول"}
              />
              {showLogin && (
                <ul className={styles["dropdown-menu"]}>
                  <li className="px-3 mb-2">
                    <MainButton
                      text={lang === "en" ? "sign in" : "تسجيل الدخول"}
                      classes="w-100"
                      onClick={() => handleLoginModal("login")}
                    />
                  </li>
                  <li className="px-2">
                    <span className="text-capitalize text-muted fs-sm">
                      {lang === "en" ? "new user?" : "مستخدم جديد؟"}
                    </span>
                  </li>
                  <li>
                    <MainButton
                      text={
                        lang === "en" ? "Create an account" : "انشاء حساب جديد"
                      }
                      classes="w-100"
                      onClick={() => handleLoginModal("signup")}
                      bg="alt"
                    />
                  </li>
                </ul>
              )}
            </>
          )}
        </li>
        <li className={styles["nav-item"]}>
          <TriggerButton
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Cart"
              >
                <path
                  d="M6.27724 3.99999L8.93751 13.1654H14.6763C16.6845 13.1654 18.4979 11.964 19.2807 10.1147L19.8626 8.7401C20.1418 8.08074 19.6578 7.35026 18.9418 7.35026H7.21692"
                  stroke="#fff"
                />
                <path
                  d="M4 4H4.77519C5.66505 4 6.44788 4.58792 6.69592 5.44251L8.9375 13.1655H14.6763C16.6845 13.1655 18.4979 11.964 19.2807 10.1147L19.8626 8.74011C20.1418 8.08075 19.6578 7.35027 18.9417 7.35027H7.21692"
                  stroke="#fff"
                />
                <path
                  d="M10.3845 20C11.2229 20 11.9026 19.3203 11.9026 18.4818C11.9026 17.6434 11.2229 16.9637 10.3845 16.9637C9.54604 16.9637 8.86633 17.6434 8.86633 18.4818C8.86633 19.3203 9.54604 20 10.3845 20Z"
                  stroke="#fff"
                />
                <path
                  d="M18.6194 15.6198H11.125C10.2164 15.6198 9.42189 15.0072 9.19077 14.1285L8.9375 13.1655L14.5226 13.1655"
                  stroke="#fff"
                />
                <path
                  d="M16.8232 20C17.6617 20 18.3414 19.3203 18.3414 18.4818C18.3414 17.6434 17.6617 16.9637 16.8232 16.9637C15.9848 16.9637 15.3051 17.6434 15.3051 18.4818C15.3051 19.3203 15.9848 20 16.8232 20Z"
                  stroke="#fff"
                />
              </svg>
            }
            classes={styles.cart}
            text={count}
            onClick={handleShowCanvas}
          />
        </li>
        <li className={styles["nav-item"]}>
          <TriggerButton
            text={langText}
            onClick={() => dispatch(setLang(langText))}
          />
        </li>
      </ul>
      {/* Account Modal */}
      <CustomModal
        show={showLoginModal}
        onHide={() => setShowLoginModal((prev) => !prev)}
        classes="p-1 border-0"
        title={
          registerType === "forgot" && (
            <TriggerButton
              icon={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
              classes="text-dark px-2"
              text={lang === "en" ? "Back" : "رجوع"}
              onClick={() => setRegisterType("login")}
            />
          )
        }
        centered
      >
        {/* Login */}
        {registerType === "login" && (
          <LoginForm
            signupHandler={() => setRegisterType("signup")}
            forgotHandler={() => setRegisterType("forgot")}
            closeModal={() => setShowLoginModal((prev) => !prev)}
          />
        )}
        {/* Sign Up */}
        {registerType === "signup" && (
          <SignupForm
            loginHandler={() => setRegisterType("login")}
            closeModal={() => setShowLoginModal((prev) => !prev)}
          />
        )}
        {/* Forgot */}
        {registerType === "forgot" && (
          <ForgotForm closeModal={() => setShowLoginModal((prev) => !prev)} />
        )}
      </CustomModal>
    </>
  );
};

export default NavbarOptions;
