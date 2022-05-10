// Main Imports
import { useRouter } from "next/router";
// Components
import CheckoutHeader from "../../components/CheckoutSteps/Header/CheckoutHeader";
import SignupForm from "../../components/FormModal/SignupForm/SignupForm";
import CheckoutFooter from "../../components/CheckoutSteps/Footer/CheckoutFooter";

const Signup = () => {
  const router = useRouter();

  return (
    <>
      <CheckoutHeader backTo="checkout" />
      <div className="container py-4">
        <SignupForm
          loginHandler={() => router.push("/checkout/login")}
          redirect="/checkout"
        />
      </div>
      <CheckoutFooter />
    </>
  );
};

export default Signup;

Signup.checkOut = function PageLayout(page) {
  return { page };
};
