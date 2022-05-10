// Main Imports
import Link from "next/link";
import { useRouter } from "next/router";
// Styles
import styles from "./SideBar.module.css";
// Components
import MainButton from "../MainButton/MainButton";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faHistory,
  faLock,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/users/userSlice";

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
];

const SideBar = ({ user, active }) => {
  const { lang } = useSelector((state) => state.shared);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.PUBLIC_URL}/api/users/logout`);

    if (res.ok) {
      dispatch(updateUser(null));
      router.push("/");
    }
  };

  return (
    <aside className={styles["sidebar"]}>
      <div className="mb-3">
        <h2 className="h4 mb-2">Hi, {user?.firstName}!</h2>
        <p className="lead fs-sm mb-0">{user?.email}</p>
      </div>
      <ul className="mb-3">
        {logedLinks?.map((el) => (
          <li key={el.id}>
            <Link href={el.to}>
              <a
                className={`${styles["sidebar-link"]} ${
                  active === el.id && styles["active-link"]
                }`}
              >
                {el.icon}
                <span>{lang === "en" ? el.title : el.titleAR}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <MainButton
        text="Logout"
        bg="alt-outline"
        classes="w-100"
        onClick={handleLogout}
      />
    </aside>
  );
};

export default SideBar;
