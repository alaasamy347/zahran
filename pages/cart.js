// Main Imports
import Image from "next/image";
import Link from "next/link";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  handleIncrement,
  handleDecrement as decreaseQuantity,
  deleteFromCart,
  clearCart,
} from "../redux/slices/cartSlice";
// Components
import EmptyCart from "../components/Home/CartCanvas/EmptyCart/EmptyCart";
import InputNumber from "../components/InputNumber/InputNumber";
import MainButton from "../components/MainButton/MainButton";
import MainLink from "../components/MainLink/MainLink";
import SectionHeading from "../components/SectionHeading/SectionHeading";
import SlickSlider from "../components/SlickSlider/SlickSlider";
import Product from "../components/Product/Product";
// Styles
import styles from "../styles/Cart.module.css";
// Data
import products from "../data/products.json";
import { checkExistInCart } from "../components/helpers/utils";

const taxes = "14%";

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

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const topDeals = products.filter((product) => product.event === "top-deals");

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      dispatch(deleteFromCart(item));
    } else {
      dispatch(decreaseQuantity(item));
    }
  };

  const calcItemPrice = (product) => {
    const price =
      parseFloat(product.defaultPrice) * (1 - parseInt(product.discount) / 100);
    return price.toFixed(2);
  };

  const calcPrice = () => {
    const subTotal = cart.reduce((prev, current) => {
      return (
        prev +
        parseFloat(current.defaultPrice) *
          (1 - parseInt(current.discount) / 100) *
          current.quantity
      );
    }, 0);

    const taxesValue = subTotal * (parseInt(taxes) / 100);

    const total = parseFloat(subTotal) + taxesValue;

    return {
      subTotal: subTotal.toFixed(2),
      taxes: taxesValue.toFixed(2),
      total: total.toFixed(2),
    };
  };

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container py-4">
      <div className={styles["cart-wrapper"]}>
        <div className={styles["cart-items"]}>
          <div className="d-flex align-items-center justify-content-between g1">
            <h1 className="mb-3">
              Cart{" "}
              <span className="fs-6 opacity-50">({cart.length} Items)</span>
            </h1>
            <button
              className="btn text-decoration-underline"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
          <Link href="/">
            <a className="d-block">
              <div
                className={styles["magazine"]}
                style={{
                  backgroundImage: "url('/images/zahran banner-03.jpg')",
                }}
              ></div>
            </a>
          </Link>
          <ul className={styles["items"]}>
            {cart?.map((item, index) => (
              <li key={item.id} className={styles["cart-item"]}>
                <div className="row">
                  <div className="col-auto mx-auto">
                    <Image
                      src={item.images[0].imgURL}
                      alt={item.title}
                      width="180"
                      height="180"
                    />
                  </div>
                  <div className="col">
                    <span className="text-muted text-uppercase fs-sm">
                      {item.brand}
                    </span>
                    <h2 className="h4 mb-1">{item.title}</h2>
                    <p className="lead mb-2 fs-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start g1 mb-2">
                      <span className="fw-bold">{calcItemPrice(item)} EGP</span>
                      {item?.discount && (
                        <del className="mx-1 text-muted">
                          {item.defaultPrice} EGP
                        </del>
                      )}
                    </div>
                    <p className={styles["event"]}>
                      {index === 0 ? "Not Available" : "Best Offer"}
                    </p>
                    <div className="d-flex align-items-center justify-content-between flex-wrap g1">
                      <InputNumber
                        handleIncrement={() => dispatch(handleIncrement(item))}
                        handleDecrement={() => handleDecrement(item)}
                        quantity={item.quantity}
                        classes={index === 0 && styles["not-avail"]}
                      />
                      <div className="d-flex align-items-center g1">
                        {index === 0 && (
                          <MainButton text="Notify Me" bg="alt" />
                        )}
                        {index !== 0 && (
                          <MainButton text="Add To Wishlist" bg="alt" />
                        )}
                        <MainButton text="Find Similar" bg="alt-outline" />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles["coupon-summary"]}>
          <div className={`mb-3 ${styles["coupon-wrapper"]}`}>
            <h2 className="h4">Coupon Code</h2>
            <div className={styles["coupon"]}>
              <input type="text" placeholder="Coupon Code or Gift Card" />
              <button>Apply</button>
            </div>
          </div>
          <div className={styles["order-summary"]}>
            <h2 className="h4">Order Summary</h2>
            <div className="mt-3">
              <div className="d-flex justify-content-between g1">
                <div className="fw-light">
                  Subtotal{" "}
                  <span className="opacity-50">({cart.length} Items)</span>
                </div>
                <span className="fw-light">{calcPrice().subTotal} EGP</span>
              </div>
              <div className="d-flex justify-content-between g1">
                <span className="fw-light">Tax</span>
                <span className="fw-light">{calcPrice().taxes} EGP</span>
              </div>
              <hr className="divider my-2"></hr>
              <div className="d-flex justify-content-between mb-md-3 g1">
                <span className="fs-5 fw-bold">
                  Total{" "}
                  <span className="fs-sm fw-normal opacity-50">
                    (inclusive of VAT)
                  </span>
                </span>
                <span className="fs-5 fw-bold">{calcPrice().total} EGP</span>
              </div>
              <div className="d-none d-md-flex row mx-0 g-0">
                <div className="col-12 mb-3">
                  <MainLink
                    to="/checkout"
                    text="proceed to checkout"
                    color="main"
                  />
                </div>
                <div className="col-12">
                  <Link href="/">
                    <a className="text-center d-block text-dark text-decoration-underline fw-bold">
                      Continue Shopping
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["mobile-checkout"]}>
          <div className="text-center">
            <span className="d-block fw-bold">Total</span>
            <strong>{calcPrice().total} EGP</strong>
          </div>
          <MainLink
            text={`Checkout ${cart.length} Items`}
            color="alt"
            classes="flex-grow-1"
            to="/checkout"
          />
        </div>
      </div>
      <section className="container my-5 outside-slick-arrows">
        <SectionHeading classes={styles.heading} text="People Also Buy">
          <MainLink text="View More" color="main-outline" />
        </SectionHeading>
        <SlickSlider customSettings={topDealsSettings}>
          {topDeals?.map((el) => (
            <Product
              key={el?.id}
              product={el}
              quantity={checkExistInCart(cart, el)}
            />
          ))}
        </SlickSlider>
      </section>
    </div>
  );
};

export default Cart;

Cart.getLayout = function PageLayout(page) {
  return { page };
};
