// Main Imports
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
// Components
import MainButton from "../../MainButton/MainButton";
// BS Components
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
// Styles
import styles from "./SignupForm.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
// Redux
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slices/users/userSlice";

const SignupForm = ({ loginHandler, closeModal, redirect }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = async (data) => {
    const res = await fetch(`${process.env.PUBLIC_URL}/api/users/register`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const jsonRes = await res.json();
    if (res.ok) {
      setErrMsg("");
      dispatch(updateUser(jsonRes));
      closeModal && closeModal();
      redirect && router.replace(redirect);
    } else {
      setErrMsg(jsonRes.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Create an Account</h2>
      <p className={styles["sign-up"]}>
        Already have an account? <span onClick={loginHandler}>Sign In</span>
      </p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label className="mb-1">First Name:</Form.Label>
          <Form.Control
            type="text"
            className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
            {...register("firstName", { required: true })}
          />
          {errors?.firstName && (
            <Alert variant="danger" className="p-1 my-1">
              <p className="mb-0 fs-sm text-capitalize">
                Please, Enter your first name.
              </p>
            </Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label className="mb-1">Last Name:</Form.Label>
          <Form.Control
            type="text"
            className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
            {...register("lastName", { required: true })}
          />
          {errors?.lastName && (
            <Alert variant="danger" className="p-1 my-1">
              <p className="mb-0 fs-sm text-capitalize">
                Please, Enter your last name.
              </p>
            </Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="mobile">
          <Form.Label className="mb-1">Mobile:</Form.Label>
          <Form.Control
            type="text"
            className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
            {...register("mobile", {
              required: {
                value: true,
                message: "Please, Enter a availd Mobile number",
              },
              pattern: {
                value: /^[0-9]{11}$/,
                message: "Includes only numbers of length 11",
              },
            })}
          />
          {errors?.mobile && (
            <Alert variant="danger" className="p-1 my-1">
              <p className="mb-0 fs-sm text-capitalize">
                {errors?.mobile.message}
              </p>
            </Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
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
          {errMsg && (
            <Alert variant="danger" className="p-1 my-1">
              <p className="mb-0 fs-sm">{errMsg}</p>
            </Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="mb-1">Password:</Form.Label>
          <div className="position-relative">
            <Form.Control
              type={showPassword ? "text" : "password"}
              className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
              name="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Please, Enter a valid password.",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                  message:
                    "At least 8 characters with minimum 1 lowercase letter 1 uppercase letter 1 number 1 spacial character",
                },
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
                {errors?.password?.message}
              </p>
            </Alert>
          )}
        </Form.Group>
        <MainButton text="sign up" classes="w-50 mx-auto mb-2" />
      </Form>
    </div>
  );
};

export default SignupForm;
