// Main Imports
import { useRouter } from "next/router";
// Components
import CheckoutHeader from "../../components/CheckoutSteps/Header/CheckoutHeader";
import LoginForm from "../../components/FormModal/LoginForm/LoginForm";
import CheckoutFooter from "../../components/CheckoutSteps/Footer/CheckoutFooter";

const Login = () => {
  const router = useRouter();

  return (
    <>
      <CheckoutHeader backTo="checkout" />
      <div className="container py-4">
        <LoginForm
          signupHandler={() => router.push("/checkout/signup")}
          forgotHandler={() => router.push("/checkout/forgot")}
          redirect="/checkout"
        />
      </div>
      <CheckoutFooter />
    </>
  );
};

export default Login;

Login.checkOut = function PageLayout(page) {
  return { page };
};
