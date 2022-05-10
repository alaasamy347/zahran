// Main Imports
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactImageMagnify from "react-image-magnify";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
// Components
import InputNumber from "../components/InputNumber/InputNumber";
import MainButton from "../components/MainButton/MainButton";
import SlickSlider from "../components/SlickSlider/SlickSlider";
import CustomOffcanvas from "../components/CustomOffcanvas/CustomOffcanvas";
import Favorite from "../components/Product/Favorite/Favorite";
import { checkExistInCart } from "../components/helpers/utils";
import Product from "../components/Product/Product";
// BS
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Toast from "react-bootstrap/Toast";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart as add,
  handleIncrement as IncreaseQuantity,
  handleDecrement as decreaseQuantity,
  deleteFromCart,
} from "../redux/slices/cartSlice";
// Data
import products from "../data/products.json";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDoubleRight,
  faPlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
// Styles
// import styles from "../../styles/product/product.module.css";
import styles from "../styles/product/product.module.css";

const bannerSettings = {
  dots: true,
  arrows: false,
};

const images = [
  {
    id: 1,
    src: "/images/p-1.png",
  },
  {
    id: 2,
    src: "/images/p-2.jpg",
  },
  {
    id: 3,
    src: "/images/p-1.png",
  },
];

const taxes = "14%";
const boughtTogether = [
  {
    id: 2,
    title: "CLOROX",
    titleAR: "المنتج الثاني",
    description: "Full HD with Built-In Re",
    brand: "Clorox",
    category: [{ id: 1, title: "Meat", titleAR: "اللحوم" }],
    discount: "29%",
    defaultPrice: "5199",
    event: "top-deals",
    selected: true,
    images: [
      {
        id: 1,
        imgURL: "/images/product-12.webp",
      },
    ],
  },
  {
    id: 3,
    title: "BOURJOIS PARIS Healthy",
    titleAR: "المنتج الثالث",
    description: "Mix Anti-Fatigue Conceal",
    brand: "Generic",
    category: [{ id: 1, title: "Poultry", titleAR: "الاسماك" }],
    discount: "18%",
    defaultPrice: "250",
    event: "ramadan",
    selected: true,
    images: [
      {
        id: 1,
        imgURL: "/images/p-1.png",
      },
      {
        id: 2,
        imgURL: "/images/p-2.jpg",
      },
    ],
  },
  {
    id: 4,
    title: "Generic Digital Kitchen Scale",
    titleAR: "المنتج الرابع",
    description: "White",
    brand: "Fargalla",
    category: [{ id: 1, title: "Grocery", titleAR: "البقالة" }],
    discount: "50%",
    defaultPrice: "218.75",
    event: "ramadan",
    selected: true,
    images: [
      {
        id: 1,
        imgURL: "/images/p-1.png",
      },
      {
        id: 2,
        imgURL: "/images/p-2.jpg",
      },
    ],
  },
];

const ProductDetails = () => {
  const { cart } = useSelector((state) => state.cart);
  const { lang } = useSelector((state) => state.shared);
  const dispatch = useDispatch();

  const [showImageCanvas, setShowImageCanvas] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [addToFav, setAddToFav] = useState(false);
  const [showSocialShare, setShowSocialShare] = useState(false);
  const [showZoom, setShowZoom] = useState(false);

  const [boughtTogetherProducts, setBoughtTogetherProducts] =
    useState(boughtTogether);

  const handleSelectBoughtTogether = (id) => {
    const newItems = boughtTogetherProducts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return { ...item };
    });

    setBoughtTogetherProducts(newItems);
  };

  const selectedItems = boughtTogetherProducts.filter((item) => item.selected);

  const handleAddSelectedItems = () => {
    if (selectedItems.length !== 0) {
      return selectedItems.forEach((el) => dispatch(add(el)));
    }
  };

  const calcItemPrice = (product) => {
    const price =
      parseFloat(product.defaultPrice) * (1 - parseInt(product.discount) / 100);
    return price.toFixed(2);
  };

  useEffect(() => {
    if (window.innerWidth > 575) {
      setShowZoom(true);
    }
  }, []);

  const handleMainImageClick = (e, index) => {
    e.preventDefault();
    setShowImageCanvas((prev) => !prev);
    setCurrentImage(index);
  };

  const handleAddToFav = () => {
    setAddToFav((prev) => !prev);
  };

  const product = products[0];
  const quantity = checkExistInCart(cart, product);

  const handleAddToCart = (product) => {
    const newProduct = { ...product, quantity: 1 };
    dispatch(add(newProduct));
    const message =
      lang === "en"
        ? `${product.title} Added Successfully`
        : `تم اضافة ${product.title} بنجاح`;
    toast.success(message, { autoClose: 1000 });
  };

  const handleIncrement = (product) => {
    dispatch(IncreaseQuantity(product));
  };

  const handleDecrement = (product) => {
    if (quantity <= 1) {
      dispatch(deleteFromCart(product));
      const message =
        lang === "en"
          ? `${product.title} Deleted Successfully`
          : `تم حذف ${product.title} بنجاح`;
      toast.error(message, {
        autoClose: 1000,
        icon: <FontAwesomeIcon icon={faTrashAlt} className="text-main" />,
      });
    } else {
      dispatch(decreaseQuantity(product));
    }
  };

  const [key, setKey] = useState("reviews");

  const calcPrice = () => {
    const price =
      parseFloat(product.defaultPrice) * (1 - parseInt(product.discount) / 100);
    return price.toFixed(2);
  };

  return (
    <div className="container py-3">
      {/* Bread Cramp */}
      <ul className={styles.breadcrumb}>
        <li className={styles["breadcrumb-item"]}>
          <Link href="/">
            <a>Grocery</a>
          </Link>
        </li>
        <li className={styles["breadcrumb-item"]}>
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            className={styles["breadcrumb-separator"]}
          />
          <Link href="/">
            <a>Home Care &amp; Cleaning</a>
          </Link>
        </li>
      </ul>
      {/* Product Details */}
      <div className="row mb-3">
        <div className="col-12 col-sm-6">
          <div className="image-wrapper">
            <div className="d-sm-none mb-5">
              <SlickSlider customSettings={bannerSettings}>
                {images?.map((img, i) => (
                  <div key={img.id} className="text-center">
                    <a href="#" onClick={(e) => handleMainImageClick(e, i)}>
                      <Image
                        src={img.src}
                        alt=""
                        width={400}
                        height={400}
                        placeholder="blur"
                        blurDataURL={img.src}
                      />
                    </a>
                  </div>
                ))}
              </SlickSlider>
              <CustomOffcanvas
                show={showImageCanvas}
                handleClose={() => setShowImageCanvas((prev) => !prev)}
                title={product.title}
                className="w-100"
              >
                <div className="text-center small-arrows">
                  <SlickSlider
                    customSettings={{
                      slidesToShow: 1,
                      autoplay: false,
                      dots: true,
                      swipeToSlide: true,
                      initialSlide: currentImage,
                    }}
                  >
                    {images.map((img) => (
                      <Image
                        key={img.id}
                        src={img.src}
                        alt=""
                        width="400"
                        height="400"
                      />
                    ))}
                  </SlickSlider>
                </div>
              </CustomOffcanvas>
            </div>
            {showZoom && (
              <div className="d-none d-sm-block">
                <SlickSlider
                  customSettings={{
                    dots: true,
                    arrows: false,
                    autoplay: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }}
                >
                  {[1, 2, 3].map((el) => (
                    <div key={el}>
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: "...",
                            src: "/images/p-1.png",
                            isFluidWidth: true,
                          },
                          largeImage: {
                            src: "/images/p-1.png",
                            width: 1200,
                            height: 1800,
                          },
                          enlargedImageContainerStyle: {
                            zIndex: 200,
                          },
                          lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
                          isHintEnabled: true,
                          shouldHideHintAfterFirstActivation: false,
                          enlargedImagePosition: "over",
                        }}
                      />
                    </div>
                  ))}
                </SlickSlider>
              </div>
            )}
          </div>
        </div>
        <div className="col d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between g1 flex-wrap">
            <span className="text-muted text-uppercase">{product.brand}</span>
            <div className="position-relative">
              <Favorite
                classes="position-static mx-2 my-0 btn"
                addToFav={addToFav}
                handleAddToFav={handleAddToFav}
              />
              <FontAwesomeIcon
                icon={faShareSquare}
                className={`btn ${styles["share-btn"]}`}
                onClick={() => setShowSocialShare((prev) => !prev)}
              />
              <Toast
                show={showSocialShare}
                onClose={() => setShowSocialShare((prev) => !prev)}
                className={styles["social-share"]}
              >
                <Toast.Header>
                  <strong className="flex-grow-1">Share</strong>
                </Toast.Header>
                <Toast.Body>
                  <div className="d-flex align-items-center g1">
                    <FacebookShareButton url={"insert Key Here"}>
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    <FacebookMessengerShareButton url={"insert Key Here"}>
                      <FacebookMessengerIcon size={32} round={true} />
                    </FacebookMessengerShareButton>
                    <WhatsappShareButton url={"insert Key Here"}>
                      <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                  </div>
                </Toast.Body>
              </Toast>
            </div>
          </div>
          <h2 className="h4 mb-1">{product.title}</h2>
          <p className="lead mb-2 fs-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="d-flex flex-wrap align-items-center g1 mb-2">
            <span className="fw-bold">{calcPrice()} EGP</span>
            {product?.discount && (
              <del className="mx-1 text-muted">{product.defaultPrice} EGP</del>
            )}
            <span>(Including VAT)</span>
          </div>
          <p className={styles["event"]}>Best Offer</p>
          <h3 className="h6">Only 5 Left</h3>
          <div className="d-flex align-items-center g1 mb-2">
            <a href="#rating-tab-reviews" className={styles["rating-icon"]}>
              4.7 <FontAwesomeIcon icon={faStar} className="mx-1" />
            </a>
            <a href="#rating-tab-reviews">75 Ratings</a>
          </div>
          <div className="mb-3">
            <span className="d-block mb-2">Color : </span>
            <div className="d-flex g1 align-items-center">
              <button className={`${styles["active-color"]} btn p-1`}>
                <Image src="/images/p-1.png" alt="" width="100" height="100" />
              </button>
              <button className="btn p-1">
                <Image src="/images/p-2.jpg" alt="" width="100" height="100" />
              </button>
            </div>
          </div>
          <div className={styles["add-to-cart"]}>
            <div className="d-sm-none text-center">
              <strong>
                <span className="d-block fw-bold">Total</span>
                {quantity ? +calcPrice() * quantity : calcPrice()} EGP
              </strong>
            </div>
            {quantity >= 1 ? (
              <InputNumber
                handleIncrement={() => handleIncrement(product)}
                handleDecrement={() => handleDecrement(product)}
                quantity={quantity}
                classes={styles["input-number"]}
              />
            ) : (
              <MainButton
                text="add to cart"
                onClick={() => handleAddToCart(product)}
                classes={styles["add-to-cart-control"]}
              />
            )}
          </div>
        </div>
      </div>
      {/* Bought Together */}
      <div className={`${styles["bought-together-wrapper"]} ms-md-auto mb-5`}>
        <h3 className="h4 mb-3">Frequently Bought Together</h3>
        <div className="row align-items-start mb-3">
          {boughtTogetherProducts?.map((product, index) => (
            <div key={product.id} className="col">
              <div className={styles["bought-item"]}>
                <div>
                  <input
                    type="checkbox"
                    name=""
                    id={`bought_together_${product.id}`}
                    className={styles["custom-check-input"]}
                    checked={product.selected}
                    onChange={() => handleSelectBoughtTogether(product.id)}
                  />
                  <label
                    htmlFor={`bought_together_${product.id}`}
                    className={styles["custom-check-label"]}
                  ></label>
                  <label
                    htmlFor={`bought_together_${product.id}`}
                    className="btn p-0"
                  >
                    <Image
                      src={product.images[0].imgURL}
                      alt=""
                      width="90"
                      height="90"
                    />
                  </label>
                </div>
                <Link href="/product">
                  <a>
                    <h4 className="h6 mb-0 text-capitalize">{product.title}</h4>
                    <span className="fs-sm">{calcItemPrice(product)} EGP</span>
                  </a>
                </Link>
                {index !== 2 && (
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="xl"
                    className={styles["plus-icon"]}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        {selectedItems.length !== 0 && (
          <MainButton
            text={`Add ${
              selectedItems.length
            } Items To Cart (${selectedItems.reduce(
              (prev, current) => prev + parseFloat(calcItemPrice(current)),
              0
            )} EGP)`}
            onClick={handleAddSelectedItems}
          />
        )}
      </div>
      {/* Recently Viewed */}
      <div className="mb-5">
        <h3 className="h4 mb-3">Recently Viewed</h3>
        <SlickSlider
          customSettings={{
            arrows: true,
            dots: true,
            infinite: true,
            slidesToShow: 5,
            swipeToSlide: true,
            centerMode: true,
            responsive: [
              {
                breakpoint: 575,
                settings: {
                  slidesToShow: 1,
                },
              },
              {
                breakpoint: 991,
                settings: {
                  slidesToShow: 3,
                },
              },
            ],
          }}
        >
          <Product product={product} quantity={quantity} />
          <Product product={product} quantity={quantity} />
          <Product product={product} quantity={quantity} />
          <Product product={product} quantity={quantity} />
          <Product product={product} quantity={quantity} />
          <Product product={product} quantity={quantity} />
        </SlickSlider>
      </div>
      {/* Realted */}
      <div className="mb-5">
        <h3 className="h4 mb-3">Related</h3>
        <SlickSlider
          customSettings={{
            arrows: true,
            dots: true,
            infinite: true,
            slidesToShow: 5,
            swipeToSlide: true,
            centerMode: true,
            responsive: [
              {
                breakpoint: 575,
                settings: {
                  slidesToShow: 1,
                },
              },
              {
                breakpoint: 991,
                settings: {
                  slidesToShow: 3,
                },
              },
            ],
          }}
        >
          <Product product={product} quantity={quantity} />
          <Product product={product} quantity={quantity} />
          <Product product={product} quantity={quantity} />
          <Product product={product} quantity={quantity} />
          <Product product={product} quantity={quantity} />
          <Product product={product} quantity={quantity} />
        </SlickSlider>
      </div>
      {/* Reviews */}
      <div>
        <Tabs
          id="rating"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="overview" title="overview">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              illum inventore distinctio ut, quia accusamus vitae iusto dolor
              reiciendis sunt quisquam nisi atque nostrum doloremque, earum vel,
              quam odit autem!
            </p>
          </Tab>
          <Tab eventKey="reviews" title="reviews">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
              recusandae. Tempora saepe, magni numquam, officia vero
              perspiciatis voluptas dolore in quia debitis nemo, vel amet sunt
              veritatis. Officiis, quibusdam praesentium? Numquam non
              voluptatibus ad illo fuga nesciunt laborum sed et vitae dolores
              eius ut pariatur eum quae earum dolorum, eaque aliquid nostrum hic
              architecto maxime impedit enim ipsum ratione. Est!
            </p>
          </Tab>
        </Tabs>
      </div>
      {/* Recommended */}
    </div>
  );
};

export default ProductDetails;

ProductDetails.getLayout = function PageLayout(page) {
  return { page };
};
