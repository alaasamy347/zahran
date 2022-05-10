// Main Imports
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
// Components
import MainButton from "../../MainButton/MainButton";
// Styles
import styles from "./OrderPlaced.module.css";

const OrderPlaced = (props) => {
  const router = useRouter();
  const { handleCurrentStep, currentStep } = props;
  const [viewFav, setViewFav] = useState(false);

  useEffect(() => {
    handleCurrentStep(currentStep);
  }, [handleCurrentStep, currentStep]);

  const handleAddToFav = () => {
    console.log("added");
    toast.success("Added To Favourites Successfully");
    setViewFav(true);
  };

  return (
    <div className={styles["placed-wrapper"]}>
      <h2>Thank You</h2>
      <p className="lead">
        for contacting us, we will get in touch with you soon..
      </p>
      <div className={styles["details"]}>
        <div className={styles["detail-section"]}>
          <h3 className="h5">Your Information</h3>
          <div className="row mb-2">
            <div className="col-4">Name:</div>
            <div className="col">Lorem Ipsum</div>
          </div>
          <div className="row mb-2">
            <div className="col-4">Email:</div>
            <div className="col">test@test.com</div>
          </div>
          <div className="row mb-2">
            <div className="col-4">Phone:</div>
            <div className="col">0123456789</div>
          </div>
          <div className="row">
            <div className="col-4">Address:</div>
            <div className="col">Cairo Abd El Moty El Kholy</div>
          </div>
        </div>
        <div className={styles["detail-section"]}>
          <h3 className="h5">Items</h3>
          <div className="row mb-2 border-bottom">
            <div className="col-auto text-center">
              <Image
                src="/images/product-thum.webp"
                alt=""
                width="60"
                height="60"
              />
            </div>
            <div className="col">
              <h4 className="h6">Lorem Ipsum Dolor.</h4>
              <span>Quantity: 1</span>
            </div>
          </div>
          <div className="row">
            <div className="col-auto text-center">
              <Image
                src="/images/product-thum.webp"
                alt=""
                width="60"
                height="60"
              />
            </div>
            <div className="col">
              <h4 className="h6">Lorem Ipsum Dolor.</h4>
              <span>Quantity: 1</span>
            </div>
          </div>
        </div>
        <div className={styles["detail-section"]}>
          <h3 className="h5">Payment Method</h3>
          <p className="lead mb-0">Credit Card</p>
        </div>
      </div>
      <div className={styles["options"]}>
        {viewFav ? (
          <MainButton
            text="View Favourites"
            bg="alt-outline"
            onClick={console.log("view fav")}
          />
        ) : (
          <MainButton
            text="Add To Favourite"
            bg="alt-outline"
            onClick={handleAddToFav}
          />
        )}
        <MainButton
          text="Continue Shopping"
          bg="alt"
          onClick={() => router.replace("/")}
        />
      </div>
    </div>
  );
};

export default OrderPlaced;
