// Components
import MainButton from "../../MainButton/MainButton";
// BS Components
import Form from "react-bootstrap/Form";
// Styles
import styles from "./ForgotForm.module.css";

const ForgotForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Email Submitted");
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Forgot your password?</h2>
      <p className="text-center">
        Enter your email address and we&apos;ll send you a link to reset your
        password
      </p>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="mb-1">Email address:</Form.Label>
          <Form.Control
            type="email"
            className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
            required
          />
        </Form.Group>
        <MainButton text="submit email" classes="w-50 mx-auto mb-2" />
      </Form>
    </div>
  );
};

export default ForgotForm;
