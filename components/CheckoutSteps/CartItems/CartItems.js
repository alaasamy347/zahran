// Main Imports
import { useEffect } from "react";
// Components
import Image from "next/image";
import InputNumber from "../../InputNumber/InputNumber";
import MainButton from "../../MainButton/MainButton";
// Styles
import styles from "./CartItems.module.css";

const CartItems = (props) => {
  const {
    previousStep,
    nextStep,
    cart,
    totalPrice,
    handleCurrentStep,
    currentStep,
    goToStep,
  } = props;

  const calcItemPrice = (product) => {
    const price =
      parseFloat(product.defaultPrice) * (1 - parseInt(product.discount) / 100);
    return price.toFixed(2);
  };

  useEffect(() => {
    handleCurrentStep(currentStep);
  }, [handleCurrentStep, currentStep]);

  return (
    <>
      <div className={styles["cart-wrapper"]}>
        <h2 className="h4 mb-3">Confirm Items</h2>
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
                <div className="col text-center text-md-start">
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
                    {index === 0
                      ? "Not Available In This Branch"
                      : "Best Offer"}
                  </p>
                  {index === 0 && (
                    <p
                      className="fs-sm text-decoration-underline"
                      style={{ cursor: "pointer" }}
                      onClick={() => goToStep(1)}
                    >
                      Choose Another Location
                    </p>
                  )}
                  <InputNumber
                    handleIncrement={() => dispatch(handleIncrement(item))}
                    handleDecrement={() => handleDecrement(item)}
                    quantity={item.quantity}
                    classes={
                      index === 0
                        ? `${styles["not-avail"]} ${styles["cart-button"]}`
                        : styles["cart-button"]
                    }
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="d-none d-md-flex align-items-center justify-content-between g1 flex-wrap">
        <MainButton text="Previous" bg="alt-outline" onClick={previousStep} />
        <MainButton text="Next" bg="alt" onClick={nextStep} />
      </div>
      <div className={styles["mobile-action"]}>
        <div className="text-center">
          <span className="d-block fw-bold">Total</span>
          <strong>{totalPrice} EGP</strong>
        </div>
        <MainButton
          text="Previous"
          bg="alt-outline"
          classes="flex-grow-1"
          onClick={previousStep}
        />
        <MainButton
          text="Next"
          bg="alt-outline"
          classes="flex-grow-1"
          onClick={nextStep}
        />
      </div>
    </>
  );
};

export default CartItems;
