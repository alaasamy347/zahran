// Main Imports
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
// Components
import MainLink from "../../../components/MainLink/MainLink";
// Styles
import styles from "../../../styles/dashboard/OrderDetails.module.css";
// Data
import products from "../../../data/products.json";
import MainButton from "../../../components/MainButton/MainButton";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStarHalfAlt,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";

const OrderDetails = () => {
  const product = products[0];
  const [showReview, setShowReview] = useState(false);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Order Details</h1>
      <div className={styles["order-wrapper"]}>
        <div className="d-flex justify-content-between g1 mb-3">
          <span>Order ID</span>
          <span className="text-end">1</span>
        </div>
        <div className="d-flex justify-content-between g1 mb-3">
          <span>Order Date</span>
          <span className="text-end">5 JUN</span>
        </div>
        <div className="d-flex justify-content-between g1 mb-3">
          <span>Shipping Address</span>
          <span className="text-end">Lorem ipsum dolor sit amet</span>
        </div>
        <div className="d-flex justify-content-between g1 mb-3">
          <span>Shipping Fees</span>
          <span className="text-end">50.00 EGP</span>
        </div>
        <div className="d-flex justify-content-between g1 fs-5">
          <strong className="text-uppercase">total</strong>
          <span className="fw-bold text-end">1520.00 EGP</span>
        </div>
      </div>
      <div>
        <div
          className={`row g1 flex-column flex-md-row mb-4 shadow ${styles["order"]}`}
        >
          <div className="col-auto text-center">
            <Link href="/product">
              <a>
                <Image
                  src={product.images[0].imgURL}
                  alt={product.title}
                  width="100"
                  height="100"
                />
              </a>
            </Link>
          </div>
          <div className="col text-center text-md-start">
            <h2 className="h6 text-capitalize">{product.title}</h2>
            <p className="mb-0">
              Brand: <span className="text-uppercase">{product.brand}</span>
            </p>
            <p className="mb-0">
              Quantity: <span>2</span>
            </p>
          </div>
          <div className="col-auto text-center">
            <h2 className="h6 text-uppercase">Price</h2>
            <span>2000 EGP</span>
          </div>
          <div className="col d-flex flex-wrap justify-content-center g1 align-items-center">
            {!showReview && (
              <MainButton
                text="Add Review"
                bg="alt-outline"
                onClick={() => setShowReview(true)}
              />
            )}
            <MainButton text="Buy Again" bg="alt" />
          </div>
        </div>
        {showReview && (
          <form className={styles["review"]} onSubmit={handleSubmitReview}>
            <h3 className="h4">Add Review</h3>
            <div className="d-flex align-items-center g1">
              <h4 className="h6 mb-0">Rating: </h4>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                emptyIcon={<FontAwesomeIcon icon={faStar} />}
                halfIcon={<FontAwesomeIcon icon={faStarHalfAlt} />}
                fullIcon={<FontAwesomeIcon icon={faStarSolid} />}
                activeColor="#ffd700"
              />
            </div>
            <textarea placeholder="What's most important to know?"></textarea>
            <textarea placeholder="What did you like or dislike?"></textarea>
            <div className="d-flex justify-content-end g1 mt-3 flex-wrap">
              <MainButton
                text="Cancel"
                bg="alt-outline"
                onClick={() => setShowReview(false)}
              />
              <MainButton
                text="Submit Review"
                type="submit"
                bg="alt"
                onClick={handleSubmitReview}
              />
            </div>
          </form>
        )}
      </div>
      <MainLink
        text="Back"
        to="/dashboard/orders"
        color="alt"
        classes={styles["back"]}
      />
    </div>
  );
};

export default OrderDetails;
