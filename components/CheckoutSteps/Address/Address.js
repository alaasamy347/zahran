// Main Imports
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-dropdown-select";
import { toast } from "react-toastify";
// BS Components
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
// Components
import MainLink from "../../MainLink/MainLink";
import MainButton from "../../MainButton/MainButton";
// Styles
import styles from "./Address.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const cityOptions = [
  { id: 1, label: "Cairo", value: "cairo" },
  { id: 2, label: "Alexandria", value: "alex" },
];

const regionOptions = [
  { id: 1, label: "ABD EL MOTY EL KHOLY", value: "ABD EL MOTY EL KHOLY" },
  { id: 2, label: "ASAFRA 45", value: "ASAFRA 45" },
  { id: 3, label: "BAHARY", value: "BAHARY" },
];

const Address = (props) => {
  const { user, totalPrice, nextStep, handleCurrentStep, currentStep } = props;
  const [details, setDetails] = useState({
    status: false,
    city: "",
    region: "",
    addressError: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDetailsSubmit = (data) => {
    nextStep();
  };

  const onSubmit = async (data) => {
    nextStep();
  };

  useEffect(() => {
    handleCurrentStep(currentStep);
  }, [handleCurrentStep, currentStep]);

  return (
    <>
      {!user ? (
        <>
          <div className={styles["login"]}>
            <p className="mb-0">
              Please Log in to your account to use your saved Data
            </p>
            <MainLink text="Login" color="alt" to="/checkout/login" />
          </div>
          <div className={styles["details-wrapper"]}>
            <h2 className="h4">Get Your Details</h2>
            <Form
              onSubmit={handleSubmit(handleDetailsSubmit)}
              autoComplete="off"
              id="addressForm"
            >
              <div className="row g-3 mb-3">
                <div className="col-12 col-lg-6">
                  <Form.Group controlId="firstName">
                    <Form.Label className="mb-1">First Name:</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ backgroundColor: "#eee", borderColor: "#eee" }}
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
                </div>
                <div className="col-12 col-lg-6">
                  <Form.Group controlId="lastName">
                    <Form.Label className="mb-1">Last Name:</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ backgroundColor: "#eee", borderColor: "#eee" }}
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
                </div>
              </div>
              <div className="row g-3 mb-4">
                <div className="col-12 col-lg-6">
                  <Form.Group controlId="mobile">
                    <Form.Label className="mb-1">Mobile:</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ backgroundColor: "#eee", borderColor: "#eee" }}
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
                </div>
                <div className="col-12 col-lg-6">
                  <Form.Group controlId="email">
                    <Form.Label className="mb-1">Email address:</Form.Label>
                    <Form.Control
                      type="email"
                      style={{ backgroundColor: "#eee", borderColor: "#eee" }}
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
                  </Form.Group>
                </div>
              </div>
              <MainButton text="submit" classes="d-none" />
            </Form>
          </div>
        </>
      ) : (
        <div className={styles["details-wrapper"]}>
          <h2 className="h4">Your Information</h2>
          <div className="row mb-2">
            <div className="col-3">Name:</div>
            <div className="col">
              {user.firstName} {user.lastName}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-3">Email:</div>
            <div className="col">{user.email}</div>
          </div>
          <div className="row">
            <div className="col-3">Phone:</div>
            <div className="col">{user.mobile}</div>
          </div>
        </div>
      )}
      <div className={styles["address-wrapper"]}>
        <h2 className="h4">Get Your Address</h2>
        <div className={styles["get-location"]}>
          <p className="mb-0">Input Your Address Here</p>
          <MainButton
            icon={<FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />}
            text="Use My Current Location"
            bg="alt"
          />
        </div>
        <Form
          className="mb-4"
          form={user ? "" : "addressForm"}
          id={user ? "addressForm" : ""}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row">
            <div className="col-12 col-lg-6">
              <Form.Group controlId="city">
                <Form.Label className="mb-1">Select Your City:</Form.Label>
                <Form.Select
                  {...register("city", { required: true })}
                  className="custom-select"
                >
                  {cityOptions?.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
                {errors?.city && (
                  <Alert variant="danger" className="p-1 my-1">
                    <p className="mb-0 fs-sm text-capitalize">
                      Please, Select Your City.
                    </p>
                  </Alert>
                )}
              </Form.Group>
            </div>
            <div className="col-12 col-lg-6">
              <Form.Group controlId="region">
                <Form.Label className="mb-1">Select Your Region:</Form.Label>
                <Form.Select
                  {...register("region", { required: true })}
                  className="custom-select"
                >
                  {regionOptions?.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
                {errors?.region && (
                  <Alert variant="danger" className="p-1 my-1">
                    <p className="mb-0 fs-sm text-capitalize">
                      Please, Select Your Region.
                    </p>
                  </Alert>
                )}
              </Form.Group>
            </div>
          </div>
        </Form>
      </div>
      <MainButton
        text="Next"
        type="submit"
        form="addressForm"
        bg="alt-outline"
        classes="ms-auto d-none d-md-flex"
      />
      <div className={styles["mobile-action"]}>
        <div className="text-center">
          <span className="d-block fw-bold">Total</span>
          <strong>{totalPrice} EGP</strong>
        </div>
        <MainButton
          text="Next"
          type="submit"
          form="addressForm"
          bg="alt-outline"
          classes="flex-grow-1"
        />
      </div>
    </>
  );
};

export default Address;
