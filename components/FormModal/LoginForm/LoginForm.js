// Main Imports
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
// Components
import MainButton from "../../MainButton/MainButton";
// BS Components
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
// Styles
import styles from "./LoginForm.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
// Redux
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slices/users/userSlice";

const LoginForm = ({
  signupHandler,
  forgotHandler,
  closeModal,
  redirect,
  ...other
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState({ email: "", password: "" });

  const onSubmit = async (data) => {
    const res = await fetch(`${process.env.PUBLIC_URL}/api/users/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const jsonRes = await res.json();

    if (res.ok) {
      toast.success(`Welcome, ${jsonRes.firstName}`);
      setErrMsg({ email: "", password: "" });
      dispatch(updateUser(jsonRes));
      closeModal && closeModal();
      redirect && router.replace(redirect);
    } else {
      setErrMsg((prev) => ({
        email: jsonRes.message.toLowerCase().includes("email")
          ? jsonRes.message
          : "",
        password: jsonRes.message.toLowerCase().includes("password")
          ? jsonRes.message
          : "",
      }));
    }
  };

  return (
    <div className={styles.wrapper} {...other}>
      <h2 className={styles.title}>Sign In</h2>
      <p className={styles["sign-up"]}>
        Don&apos;t Have an Account? <span onClick={signupHandler}>Sign Up</span>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="Email">
          <Form.Label className="mb-1">Email address:</Form.Label>
          <Form.Control
            type="email"
            className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
            {...register("email", {
              required: true,
            })}
          />
          {errors?.email && (
            <Alert variant="danger" className="p-1 my-1">
              <p className="mb-0 fs-sm text-capitalize">
                Please, Enter a valid email.
              </p>
            </Alert>
          )}
          {errMsg?.email && (
            <Alert variant="danger" className="p-1 my-1">
              <p className="mb-0 fs-sm">{errMsg?.email}</p>
            </Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="Password">
          <Form.Label className="mb-1">Password:</Form.Label>
          <div className="position-relative">
            <Form.Control
              type={showPassword ? "text" : "password"}
              className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
              name="password"
              {...register("password", {
                required: true,
              })}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles["show-password"]}
            />
          </div>
          {errors?.password && (
            <Alert variant="danger" className="p-1 my-1">
              <p className="mb-0 fs-sm text-capitalize">
                Please, Enter a valid password.
              </p>
            </Alert>
          )}
          {errMsg?.password && (
            <Alert variant="danger" className="p-1 my-1">
              <p className="mb-0 fs-sm">{errMsg?.password}</p>
            </Alert>
          )}
          <span className={styles.forgot} onClick={forgotHandler}>
            Forogt Password?
          </span>
        </Form.Group>
        <MainButton text="sign in" classes="w-50 mx-auto mb-2" />
      </form>
    </div>
  );
};

export default LoginForm;
