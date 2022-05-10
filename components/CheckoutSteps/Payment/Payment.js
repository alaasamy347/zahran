// Main Imports
import { useState, useEffect } from "react";
// Components
import MainButton from "../../MainButton/MainButton";
// Styles
import styles from "./Payment.module.css";

const paymentMethods = [
  { label: "Credit Card", value: 1 },
  { label: "Cash on Delivery", value: 2 },
  { label: "Credit on Delivery", value: 3 },
];

const Payment = (props) => {
  const { totalPrice, previousStep, nextStep, handleCurrentStep, currentStep } =
    props;
  const [selectedMethod, setSelectedMethod] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("yes");
    nextStep();
  };

  useEffect(() => {
    handleCurrentStep(currentStep);
  }, [handleCurrentStep, currentStep]);

  return (
    <>
      <div className={styles["payment-wrapper"]}>
        <h2 className="h4 mb-1">Payment Method</h2>
        <p>All transactions are secure and encrypted.</p>
        <form onSubmit={handleSubmit}>
          <ul className={styles["payment-options"]}>
            {paymentMethods.map((method) => (
              <li key={method.value} className={styles["brand-item"]}>
                <input
                  type="radio"
                  name="paymentMethod"
                  id={`m_c_f_${method.value}`}
                  className={styles["custom-check-input"]}
                  checked={selectedMethod === method.value}
                  onChange={() => setSelectedMethod(method.value)}
                />
                <label
                  htmlFor={`m_c_f_${method.value}`}
                  className={styles["custom-check-label"]}
                >
                  <span>{method.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </form>
      </div>
      <div className="d-none d-md-flex align-items-center justify-content-between g1 flex-wrap">
        <MainButton text="Previous" bg="alt-outline" onClick={previousStep} />
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
          text="Place Order"
          bg="alt"
          classes="flex-grow-1"
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default Payment;
