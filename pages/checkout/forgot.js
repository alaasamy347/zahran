// Components
import CheckoutHeader from "../../components/CheckoutSteps/Header/CheckoutHeader";
import ForgotForm from "../../components/FormModal/ForgotForm/ForgotForm";
import CheckoutFooter from "../../components/CheckoutSteps/Footer/CheckoutFooter";

const Forgot = () => {
  return (
    <>
      <CheckoutHeader backTo="checkout" />
      <div className="container py-4">
        <ForgotForm />
      </div>
      <CheckoutFooter />
    </>
  );
};

export default Forgot;

Forgot.checkOut = function PageLayout(page) {
  return { page };
};
