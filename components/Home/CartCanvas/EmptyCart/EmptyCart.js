// Main Imports
import Image from "next/image";
// Components
import MainLink from "../../../MainLink/MainLink";

const EmptyCart = () => {
  return (
    <div className="empty-cart d-flex flex-column align-items-center py-3">
      <Image
        src="/images/empty-state-cart.svg"
        alt="Empty Cart"
        width="235"
        height="183"
      />
      <h3 className="h4 text-center mb-1">Your shopping cart looks empty</h3>
      <p className="lead text-center text-secondary fs-6">
        What are you waiting for?
      </p>
      <MainLink to="/" text="Start Shopping" />
    </div>
  );
};

export default EmptyCart;
