// Main Imports
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
// Components
import MainLink from "../components/MainLink/MainLink";
import CustomMarquee from "../components/CustomMarquee/CustomMarquee";
import SectionHeading from "../components/SectionHeading/SectionHeading";
import SlickSlider from "../components/SlickSlider/SlickSlider";
import Product from "../components/Product/Product";
import CategoryWithSlider from "../components/Home/CategoryWithSlider/CategoryWithSlider";
import SpecialEvent from "../components/Home/SpecialEvent/SpecialEvent";
import { checkExistInCart } from "../components/helpers/utils";
// Styles
import styles from "../styles/Home.module.css";
// Redux
import { useSelector } from "react-redux";
// Data
import products from "../data/products.json";
import topCategories from "../data/topCategories.json";
import categoriesWithSub from "../data/categoriesWithSub.json";
import ramdanEvents from "../data/ramdanEvents.json";
import brands from "../data/brands.json";

const images = [
  { id: 1, src: "/images/banner-1360x250.jpg" },
  { id: 2, src: "/images/banner-2.webp" },
  { id: 3, src: "/images/banner-3.webp" },
];

const bannerSettings = {
  dots: true,
};

const topDealsSettings = {
  slidesToShow: 5,
  dots: true,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1399,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
  ],
};

const brandsSettings = {
  dots: true,
  arrows: false,
  slidesToShow: 6,
  responsive: [
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
};

const Home = () => {
  const { cart } = useSelector((state) => state.cart);
  const { lang } = useSelector((state) => state.shared);

  const topDeals = products.filter((product) => product.event === "top-deals");

  return (
    <div className={styles.container}>
      <Head>
        <title>Zahran Market</title>
        <meta name="description" content="" />
        <link rel="icon" href="/images/icon.webp" />
      </Head>

      <main>
        {/* Marquee */}
        <section className={styles.marquee}>
          <div className="d-flex align-items-center">
            <CustomMarquee
              text={
                lang === "en"
                  ? "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                  : " انتظرونا قريبا زهران ماركت انتظرونا قريبا زهران ماركت انتظرونا قريبا زهران ماركت انتظرونا قريبا زهران ماركت انتظرونا قريبا زهران ماركت "
              }
              direction={lang === "en" ? "left" : "right"}
            />
          </div>
        </section>

        {/* Main Banner */}
        <section className="banner">
          <SlickSlider customSettings={bannerSettings}>
            {images?.map((img) => (
              <div key={img.id}>
                <Link href="/category">
                  <a>
                    <Image
                      src={img.src}
                      alt=""
                      width={1920}
                      height={350}
                      layout="responsive"
                      placeholder="blur"
                      blurDataURL={img.src}
                    />
                  </a>
                </Link>
              </div>
            ))}
          </SlickSlider>
        </section>

        {/* Top Categories */}
        <section className="container my-5">
          <SectionHeading
            classes={styles.heading}
            text={lang === "en" ? "top Categories" : "أقوى الفئات"}
          >
            <MainLink
              text={lang === "en" ? "more Categories" : "المزيد من الفئات"}
              color="main-outline"
              to="/category"
            />
          </SectionHeading>
          <div className="row g-3">
            {topCategories?.map((cat) => (
              <div className="col-6 col-md-4 col-lg-3 col-xl-2" key={cat.id}>
                <div className="card overflow-hidden br-main">
                  <Link href="/category">
                    <a className={styles.category}>
                      <Image
                        src={cat.imgURL}
                        className="card-img-top"
                        alt={cat.title}
                        width="200"
                        height="200"
                        placeholder="blur"
                        blurDataURL={cat.imgURL}
                      />
                    </a>
                  </Link>
                  <div className="card-body">
                    <Link href="/category">
                      <a className="d-block">
                        <h3
                          className={`${styles["cat-title"]} card-title h5 text-center mb-0`}
                        >
                          {lang === "en" ? cat.title : cat.titleAr}
                        </h3>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Deals */}
        <section className="container my-5 outside-slick-arrows">
          <SectionHeading
            classes={styles.heading}
            text={lang === "en" ? "top deals" : "أقوى العروض"}
          >
            <MainLink
              text={lang === "en" ? "more deals" : "المزيد من العروض"}
              color="main-outline"
              to="/category"
            />
          </SectionHeading>
          <SlickSlider customSettings={topDealsSettings}>
            {topDeals?.map((el) => (
              <Product
                key={el?.id}
                product={el}
                quantity={checkExistInCart(cart, el)}
                to="/product"
              />
            ))}
          </SlickSlider>
        </section>

        {/* Categories & Sub */}
        <section className="container my-5">
          <SectionHeading
            classes={styles.heading}
            text={lang === "en" ? "Best Categories Offers" : "افضل عروض الفئات"}
          />
          <div className="categories-sub row g-3">
            {categoriesWithSub?.map((cat) => (
              <div key={cat.id} className="col-12 col-md-6 flex-grow-1 mb-4">
                <CategoryWithSlider
                  heading={lang === "en" ? cat.title : cat.titleAR}
                  subProducts={cat.subProducts}
                  imgURL={cat.imgURL}
                />
              </div>
            ))}
          </div>
        </section>

        {/* One Categories With Sub Products */}
        <section className="container my-5">
          <SectionHeading
            classes={styles.heading}
            text={lang === "en" ? "Best Grocery Offers" : "افضل عروض البقالة"}
          />
          <div className="categories-sub row g-3">
            {categoriesWithSub.slice(0, 1).map((cat) => (
              <div key={cat.id} className="col-12 col-md-6 flex-grow-1 mb-4">
                <CategoryWithSlider
                  heading={lang === "en" ? cat.title : cat.titleAR}
                  subProducts={cat.subProducts}
                  imgURL="/images/Cat-1120x180-.jpg"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Special Events */}
        <section className="container my-5">
          <SectionHeading
            classes={styles.heading}
            text={lang === "en" ? "Ramadan Offers" : "عروض رمضان"}
          >
            <MainLink
              text={lang === "en" ? "more offers" : "المزيد من العروض"}
              color="main-outline"
              to="/category"
            />
          </SectionHeading>
          <div className="row g-3 mt-3">
            {ramdanEvents?.map((el) => (
              <div className="col-6 col-md-4 col-lg " key={el.id}>
                <SpecialEvent
                  title={lang === "en" ? el.title : el.titleAR}
                  imgURL={el.imgURL}
                />
              </div>
            ))}
          </div>
        </section>
        {/* Events */}
        <section className="container my-5">
          <SectionHeading
            classes={styles["sub-heading"]}
            text={
              lang === "en" ? "Ramadan Special offers" : "عروض رمضان المميزة"
            }
          >
            <MainLink
              text={lang === "en" ? "more offers" : "المزيد من العروض"}
              color="main-outline"
              to="/category"
            />
          </SectionHeading>
          <SlickSlider customSettings={topDealsSettings}>
            {topDeals?.map((el) => (
              <Product
                key={el?.id}
                product={el}
                quantity={checkExistInCart(cart, el)}
                to="/product"
              />
            ))}
          </SlickSlider>
        </section>

        {/* Magazine */}
        <section className="container my-5">
          <SectionHeading
            classes={styles.heading}
            text={lang === "en" ? "magazine" : "مجلة العروض"}
          />
          <div className={styles.magazine}>
            <h3 className=" fw-bold text-capitalize text-white position-relative mb-3">
              {lang === "en" ? "lorem ipsum" : "عنوان المجلة"}
            </h3>
            <MainLink
              text={lang === "en" ? "Show Details" : "المزيد من التفاصيل"}
              color="main"
              to="/category"
            />
          </div>
        </section>

        {/* Shop By Brand */}
        <section className="container my-5">
          <SectionHeading
            classes={styles.heading}
            text={lang === "en" ? "shop by brand" : "التسوق بالعلامة التجارية"}
          >
            <MainLink
              text={lang === "en" ? "more brands" : "المزيد..."}
              color="main-outline"
              to="/category"
            />
          </SectionHeading>
          <SlickSlider customSettings={brandsSettings}>
            {brands?.map((el) => (
              <Link href="/category" key={el.id}>
                <a className={styles.brand}>
                  <Image
                    src={el.imgURL}
                    alt={el.title}
                    width="150"
                    height="100"
                    placeholder="blur"
                    blurDataURL={el.imgURL}
                  />
                </a>
              </Link>
            ))}
          </SlickSlider>
        </section>
      </main>
    </div>
  );
};

export default Home;
