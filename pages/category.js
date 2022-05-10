// Main Imports
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Select from "react-dropdown-select";
import ReactPaginate from "react-paginate";
// Components
import { checkExistInCart } from "../components/helpers/utils";
import Product from "../components/Product/Product";
import TriggerButton from "../components/TriggerButton/TriggerButton";
import SlickSlider from "../components/SlickSlider/SlickSlider";
import CustomOffcanvas from "../components/CustomOffcanvas/CustomOffcanvas";
import CustomAccordion, {
  AccordionItem,
} from "../components/CustomAccordion/CustomAccordion";
import MultiRangeSlider from "../components/MultiRangeSlider/MultiRangeSlider";
import MainButton from "../components/MainButton/MainButton";
// Data
import products from "../data/products.json";
import categories from "../data/categories.json";
import brands from "../data/brands.json";
// Redux
import { useSelector } from "react-redux";
// Styles
import styles from "../styles/category/Category.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faFilter,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

const sortOptions = [
  {
    label: "Relevance",
    value: "all",
  },
  {
    label: "price: high to low",
    value: "low",
  },
  {
    label: "price: low to high",
    value: "high",
  },
  {
    label: "new arrivals",
    value: "new",
  },
];

const categorySliderSettings = {
  speed: 700,
  autoPlay: false,
  arrows: false,
  dots: false,
  infinite: true,
  slidesToShow: 5,
};

let triggerOnce = true;

const CategoryDetails = () => {
  const { cart } = useSelector((state) => state.cart);
  const { lang } = useSelector((state) => state.shared);

  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showSortCanvas, setShowSortCanvas] = useState(false);
  const [showFilterCanvas, setShowFilterCanvas] = useState(false);
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000,
  });
  const productsRef = useRef();

  const handleToggleMobile = () => {
    if (
      window.scrollY <
      productsRef.current.offsetTop +
        productsRef.current.clientHeight -
        window.outerHeight
    ) {
      if (triggerOnce) {
        triggerOnce = !triggerOnce;
        setShowMobileFilter(true);
      }
    } else {
      if (!triggerOnce) {
        triggerOnce = !triggerOnce;
        setShowMobileFilter(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleToggleMobile);

    return () => window.removeEventListener("scroll", handleToggleMobile);
  }, []);

  const defaultSortValue = [{ label: "Relevance", value: "all" }];

  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="container py-3">
      {/* Bread Cramp */}
      <ul className={styles.breadcrumb}>
        <li className={styles["breadcrumb-item"]}>
          <Link href="/category">
            <a>Grocery</a>
          </Link>
        </li>
        <li className={styles["breadcrumb-item"]}>
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            className={styles["breadcrumb-separator"]}
          />
          <Link href="/category">
            <a>Home Care &amp; Cleaning</a>
          </Link>
        </li>
      </ul>
      {/* All CAtegories */}
      <div className={`small-arrows ${styles["category-wrapper"]}`}>
        <SlickSlider
          customSettings={{
            autoplay: false,
            slidesToShow: 6,
            arrows: true,
            swipeToSlide: true,
            centerMode: true,
            responsive: [
              {
                breakpoint: 575,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 991,
                settings: {
                  slidesToShow: 4,
                },
              },
            ],
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((el) => (
            <Link href="/category" key={el}>
              <a className={styles["category-slider-item"]}>
                <Image
                  src="/images/offer-1.jpg"
                  alt=""
                  width="100"
                  height="100"
                />
                <h2 className="h6 text-center p-2 mb-0">Laundry</h2>
              </a>
            </Link>
          ))}
        </SlickSlider>
      </div>
      <div className="wrapper d-flex align-items-start g2">
        {/* Filter */}
        <div className={styles["filter-section"]}>
          <CustomAccordion flush defaultActiveKey="1">
            <AccordionItem
              eventKey="1"
              header={lang === "en" ? "Category" : "الفئات"}
              iconPosition="end"
            >
              <ul>
                {categories.map((cat) => (
                  <li key={cat.id} className={styles["brand-item"]}>
                    <input
                      type="checkbox"
                      name=""
                      id={`c_f_${cat.id}`}
                      className={styles["custom-check-input"]}
                    />
                    <label
                      htmlFor={`c_f_${cat.id}`}
                      className={styles["custom-check-label"]}
                    >
                      <span>{cat.title}</span>
                      <span className={lang === "en" ? "ms-auto" : "me-auto"}>
                        (q 12)
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem
              eventKey="2"
              header={lang === "en" ? "Brand" : "البراند"}
              iconPosition="end"
            >
              <ul>
                {brands.map((brand) => (
                  <li key={brand.id} className={styles["brand-item"]}>
                    <input
                      type="checkbox"
                      name=""
                      id={`b_f_${brand.id}`}
                      className={styles["custom-check-input"]}
                    />
                    <label
                      htmlFor={`b_f_${brand.id}`}
                      className={styles["custom-check-label"]}
                    >
                      <span>{brand.title}</span>
                      <span className={lang === "en" ? "ms-auto" : "me-auto"}>
                        (q 12)
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionItem>
          </CustomAccordion>
          {/* <div style={{ padding: "1rem 1.25rem" }} className="border-top">
            <h2 className="fs-6 fw-bold text-main mb-4 d-flex align-items-center justify-content-between g1">
              <span>Price:</span>
              <span>
                {priceRange.min} EGP - {priceRange.max} EGP
              </span>
            </h2>
            <MultiRangeSlider
              min={0}
              max={1000}
              onChange={({ min, max }) => setPriceRange({ min, max })}
              classes="py-4"
            />
            <MainButton text="Apply" classes="mt-2" bg="alt" />
          </div> */}
        </div>
        <div className="products-wrapper" ref={productsRef}>
          {/* Showing Results */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <p className="mb-0 showing-results">
              740 Results for{" "}
              <span className="fw-bold">&quot;Groceries&quot;</span>
            </p>
            <ul className="d-flex align-items-center g1">
              <li className="fw-bold fs-sm">Filtered By:</li>
              <li className="d-flex align-items-center fs-sm">
                <span>Brand: </span>
                <span className="mx-1">Abu Auf</span>
                <button className="btn p-0">×</button>
              </li>
              <li>
                <button className="btn p-0 fs-sm text-main">Clear All</button>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center justify-content-between g1 mb-3">
            <div className="d-none d-md-flex align-items-center g1">
              <span className="text-muted">
                {lang === "en" ? "sort by" : "الترتيب حسب"}
              </span>
              <Select
                options={sortOptions}
                values={defaultSortValue}
                searchable={false}
                onChange={(value) => console.log(value)}
                className="custom-select"
              />
            </div>
            <div className="d-flex align-items-center g1">
              <span className="text-muted">
                {lang === "en" ? "display" : "عرض"}
              </span>
              <Select
                options={[
                  { label: "20 per page", value: 20 },
                  { label: "50 per page", value: 50 },
                  { label: "70 per page", value: 70 },
                ]}
                values={[{ label: "20 per page", value: 20 }]}
                searchable={false}
                onChange={(value) => setItemsPerPage(value[0].value)}
                className="custom-select"
              />
            </div>
          </div>
          {/* Products */}
          <div className="products">
            <div className="row">
              {currentItems?.map((prod) => (
                <div className="col-6 col-lg-4 col-xl-3 px-0" key={prod.id}>
                  <Product
                    product={prod}
                    quantity={checkExistInCart(cart, prod)}
                    to="/product"
                  />
                </div>
              ))}
            </div>
            <div className="text-center my-3">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      {showMobileFilter && (
        <div className={styles["mobile-options"]}>
          {/* Sorting */}
          <TriggerButton
            text={lang === "en" ? "sort by" : "ترتيب حسب"}
            icon={<FontAwesomeIcon icon={faSort} className="mx-2" />}
            classes="flex-row-reverse"
            onClick={() => setShowSortCanvas((prev) => !prev)}
          />
          <CustomOffcanvas
            show={showSortCanvas}
            handleClose={() => setShowSortCanvas((prev) => !prev)}
            title={lang === "en" ? "Sort By" : "الترتيب حسب"}
            placement="bottom"
            className={styles["sort-canvas"]}
          >
            <ul>
              {sortOptions?.map((el) => (
                <li key={el.value} className={styles["brand-item"]}>
                  <input
                    type="radio"
                    name="sort-by-brand"
                    id={`m_b_s_${el.value}`}
                    className={styles["custom-check-input"]}
                  />
                  <label
                    htmlFor={`m_b_s_${el.value}`}
                    className={styles["custom-check-label"]}
                  >
                    <span>{el.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </CustomOffcanvas>
          <div className="vr opacity-100 mx-2"></div>
          {/* Filtering */}
          <TriggerButton
            text={lang === "en" ? "Filter" : "تصنيف حسب"}
            icon={<FontAwesomeIcon icon={faFilter} className="mx-2" />}
            classes="flex-row-reverse"
            onClick={() => setShowFilterCanvas((prev) => !prev)}
          />
          <CustomOffcanvas
            show={showFilterCanvas}
            handleClose={() => setShowFilterCanvas((prev) => !prev)}
            title={lang === "en" ? "filter" : "التصنيف حسب"}
          >
            <CustomAccordion flush defaultActiveKey="1">
              <AccordionItem
                eventKey="1"
                header={lang === "en" ? "Category" : "الفئات"}
                iconPosition="end"
              >
                <ul>
                  {categories.map((cat) => (
                    <li key={cat.id} className={styles["brand-item"]}>
                      <input
                        type="checkbox"
                        name=""
                        id={`m_c_f_${cat.id}`}
                        className={styles["custom-check-input"]}
                      />
                      <label
                        htmlFor={`m_c_f_${cat.id}`}
                        className={styles["custom-check-label"]}
                      >
                        <span>{cat.title}</span>
                        <span className="ms-auto">(q 12)</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
              <AccordionItem
                eventKey="2"
                header={lang === "en" ? "Brand" : "البراند"}
                iconPosition="end"
              >
                <ul>
                  {brands.map((brand) => (
                    <li key={brand.id} className={styles["brand-item"]}>
                      <input
                        type="checkbox"
                        name=""
                        id={`m_b_f_${brand.id}`}
                        className={styles["custom-check-input"]}
                      />
                      <label
                        htmlFor={`m_b_f_${brand.id}`}
                        className={styles["custom-check-label"]}
                      >
                        <span>{brand.title}</span>
                        <span className={lang === "en" ? "ms-auto" : "me-auto"}>
                          (q 12)
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            </CustomAccordion>
            {/* <div style={{ padding: "1rem 1.25rem" }} className="border-top">
              <h2 className="fs-6 fw-bold text-main mb-4 d-flex align-items-center justify-content-between g1">
                <span>Price:</span>
                <span>
                  {priceRange.min} EGP - {priceRange.max} EGP
                </span>
              </h2>
              <MultiRangeSlider
                min={0}
                max={1000}
                onChange={({ min, max }) => setPriceRange({ min, max })}
                classes="py-4"
              />
            </div> */}
            <MainButton text="Apply" classes="mt-2 w-100" bg="alt" />
          </CustomOffcanvas>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
