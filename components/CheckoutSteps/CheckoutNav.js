import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// Styles
import styles from "./CheckoutNav.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const data = [
  { id: 1, title: "Shipping Address" },
  { id: 2, title: "Cart Items" },
  { id: 3, title: "Payment" },
  { id: 4, title: "Order Placed" },
];

const CheckoutNav = (props) => {
  const { currentStep, totalSteps, goToStep, user } = props;

  const getNextStep = () => {
    const newData = data.slice(currentStep);
    if (newData.length) {
      return `Next: ${newData[0].title}`;
    }
  };

  return (
    <div className={styles["nav-wrapper"]}>
      <ul className={styles["steps-wrapper"]}>
        {data?.map((el) => (
          <li
            key={el.id}
            className={`${currentStep >= el.id && styles["active-step"]} ${
              currentStep === totalSteps && styles["no-click"]
            }`}
            onClick={() => goToStep(el.id)}
          >
            <button
              className={`${styles["step-icon"]} ${
                currentStep >= el.id && styles["step-icon-active"]
              }`}
            >
              {currentStep > el.id ? <FontAwesomeIcon icon={faCheck} /> : el.id}
            </button>
            <span className={`${styles["step-title"]}`}>{el.title}</span>
          </li>
        ))}
      </ul>
      <div className={styles["mobile-stepper"]}>
        <div style={{ width: 50 }}>
          <CircularProgressbar
            value={(currentStep / totalSteps) * 100}
            text={`${currentStep} of ${totalSteps}`}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 0,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "24px",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: "var(--main-color)",
              textColor: "#000",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
        <div className="text-end">
          <h2 className="h4">
            {data.find((el) => el.id === currentStep).title}
          </h2>
          <p className="mb-0">{getNextStep()}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutNav;
