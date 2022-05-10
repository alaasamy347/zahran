// Main Imports
import { useState } from "react";
import { withSessionSsr } from "../../lib/withSession";
import StepWizard from "react-step-wizard";
// Redux
import { useSelector } from "react-redux";
// Components
import CheckoutNav from "../../components/CheckoutSteps/CheckoutNav";
import Address from "../../components/CheckoutSteps/Address/Address";
import CartItems from "../../components/CheckoutSteps/CartItems/CartItems";
import Payment from "../../components/CheckoutSteps/Payment/Payment";
import OrderPlaced from "../../components/CheckoutSteps/OrderPlaced/OrderPlaced";
import CheckoutHeader from "../../components/CheckoutSteps/Header/CheckoutHeader";
import CheckoutFooter from "../../components/CheckoutSteps/Footer/CheckoutFooter";
// Styles
import styles from "../../styles/Checkout.module.css";
import MainButton from "../../components/MainButton/MainButton";

const taxes = "14%";

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;

  return {
    props: {
      user,
    },
  };
});

const Checkout = ({ user }) => {
  const { cart } = useSelector((state) => state.cart);
  const [currentStep, setCurrentStep] = useState(null);
  const [stepWizardInstance, setStepWizardInstance] = useState({});

  const handleCurrentStep = (step) => {
    setCurrentStep(step);
  };

  const setInstance = (SW) => {
    setStepWizardInstance((prev) => ({
      ...prev,
      SW,
    }));
  };

  const handlePlaceOrder = () => {
    stepWizardInstance && stepWizardInstance.SW.nextStep();
  };

  const calcItemPrice = (product) => {
    const price =
      parseFloat(product.defaultPrice) * (1 - parseInt(product.discount) / 100);
    return price.toFixed(2);
  };

  const calcPrice = () => {
    const cartItems = currentStep !== 1 ? cart.slice(1) : cart;
    const subTotal = cartItems.reduce((prev, current) => {
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

  return (
    <div className={styles["checkout-wrapper"]}>
      <CheckoutHeader show={currentStep === 4 ? false : true} />
      <div
        className="container py-4"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <div className={styles["stepper-wrapper"]}>
          <div className="flex-grow-1">
            <StepWizard
              nav={<CheckoutNav user={user} />}
              isLazyMount
              transitions={{}}
              instance={setInstance}
            >
              <Address
                user={user}
                totalPrice={calcPrice().total}
                handleCurrentStep={handleCurrentStep}
              />
              <CartItems
                user={user}
                cart={cart}
                totalPrice={calcPrice().total}
                handleCurrentStep={handleCurrentStep}
              />
              <Payment
                totalPrice={calcPrice().total}
                handleCurrentStep={handleCurrentStep}
              />
              <OrderPlaced handleCurrentStep={handleCurrentStep} />
            </StepWizard>
          </div>
          <div>
            <div className={styles["order-summary"]}>
              <h2 className="h4 mb-3">Order Summary</h2>
              {currentStep === 4 && (
                <ul className="list-unstyled mb-3">
                  {cart.slice(1).map((el) => (
                    <li key={el.id} className="row fs-sm">
                      <div className="col-7">{el.title}</div>
                      <div className="col">
                        {el.quantity} x {calcItemPrice(el)} EGP
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div>
                <div className="d-flex justify-content-between g1">
                  <div className="fw-light">
                    Subtotal{" "}
                    <span className="opacity-50">
                      ({currentStep !== 1 ? cart.slice(1).length : cart.length}{" "}
                      Items)
                    </span>
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
              </div>
            </div>
            {currentStep === 3 && (
              <MainButton
                text="Place Order"
                bg="alt"
                classes="w-100 mt-4 d-none d-md-flex"
                onClick={handlePlaceOrder}
              />
            )}
          </div>
        </div>
      </div>
      <CheckoutFooter />
    </div>
  );
};

export default Checkout;

Checkout.checkOut = function PageLayout(page) {
  return { page };
};
