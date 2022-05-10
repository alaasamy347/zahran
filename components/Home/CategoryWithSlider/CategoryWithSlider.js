// Main Imports
import Image from "next/image";
import Link from "next/link";
// Components
import SlickSlider from "../../SlickSlider/SlickSlider";
// Styles
import styles from "./CategoryWithSlider.module.css";
// Redux
import { useSelector } from "react-redux";

const subCategoriesSettings = {
  slidesToShow: 5,
  arrows: false,
  dots: true,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
};

const CategoryWithSlider = (props) => {
  const { lang } = useSelector((state) => state.shared);

  const { to = "/category", heading = "", subProducts = [], imgURL } = props;

  return (
    <div className="card border-0">
      <Link href={to}>
        <a className={styles.category}>
          <h3 className="mb-0 w-50 fw-bold position-relative">{heading}</h3>
          <div
            className={styles.image}
            style={{ backgroundImage: `url("${imgURL}")` }}
          ></div>
        </a>
      </Link>
      <div className="my-2">
        {subProducts.length !== 0 && (
          <SlickSlider customSettings={subCategoriesSettings}>
            {subProducts.map((el) => (
              <Link href="/product" key={el.id}>
                <a className={styles.sub}>
                  <div>
                    <Image
                      src={el.imgURL}
                      alt={el.title}
                      width="100%"
                      height="70"
                      placeholder="blur"
                      blurDataURL={el.imgURL}
                    />
                  </div>
                  <span className={styles["sub-title"]}>
                    {lang === "en" ? el.title : el.titleAR}
                  </span>
                </a>
              </Link>
            ))}
          </SlickSlider>
        )}
      </div>
    </div>
  );
};

export default CategoryWithSlider;
