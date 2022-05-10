// Main Imports
import { useState } from "react";
// Components
import { withSessionSsr } from "../../lib/withSession";
import SideBar from "../../components/Dashboard/SideBar";
import MainButton from "../../components/MainButton/MainButton";
import CustomModal from "../../components/CustomModal/CustomModal";
// BS
import Form from "react-bootstrap/Form";
// Styles
import styles from "../../styles/dashboard/Addresses.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
});

const Addresses = ({ user }) => {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(1);

  return (
    <div className="container py-4">
      <div className={styles["addresses-wrapper"]}>
        <SideBar user={user} active={3} />
        <div className="flex-grow-1">
          <h2 className="fw-bold">Your Addresses</h2>
          <p className="lead fs-6 mb-3">
            Manage your saved addresses for fast and easy checkout across our
            marketplaces
          </p>
          <MainButton
            text="Add New Address"
            style={{ width: "fit-content" }}
            bg="alt"
            onClick={() => setShowAddressModal((prev) => !prev)}
          />
          <CustomModal
            show={showAddressModal}
            handleClose={() => setShowAddressModal((prev) => !prev)}
            centered
            title="Add New Address"
          >
            <div className="p-3">
              <Form>
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label className="mb-1">Your City:</Form.Label>
                  <Form.Control
                    type="text"
                    className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
                    // defaultValue="Select City"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="area">
                  <Form.Label className="mb-1">Your Area:</Form.Label>
                  <Form.Control
                    type="text"
                    className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
                    // defaultValue="Select Area"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="house">
                  <Form.Label className="mb-1">Building / House</Form.Label>
                  <Form.Control
                    type="text"
                    className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
                    // defaultValue="Select Area"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="street">
                  <Form.Label className="mb-1">Your Street</Form.Label>
                  <Form.Control
                    type="text"
                    className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
                    // defaultValue="Select Area"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phoneNumber">
                  <Form.Label className="mb-1">Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
                    // defaultValue="Select Area"
                  />
                </Form.Group>
              </Form>
              <div className="d-flex align-items-center justify-content-between g1">
                <MainButton
                  text="Cancel"
                  bg="alt-outline"
                  onClick={() => setShowAddressModal((prev) => !prev)}
                />
                <MainButton text="Add Address" bg="alt" />
              </div>
            </div>
          </CustomModal>
          <div className="p-3">
            <div className="row mb-3 p-3 g1 shadow align-items-center rounded-3">
              <div className="col d-flex justify-content-center">
                <input
                  type="radio"
                  name="user-address"
                  id="address-1"
                  className={styles["custom-check-input"]}
                  checked={selectedAddress === 1}
                  onChange={() => setSelectedAddress(1)}
                />
                <label
                  htmlFor="address-1"
                  className={styles["custom-check-label"]}
                ></label>
              </div>
              <div className="col-10 col-md-8">
                <div className="row mb-3">
                  <div className="col-3">
                    <span className="opacity-50">Address</span>
                  </div>
                  <div className="col">
                    <div>
                      El Raml, 6XQ3+P8 - El Raml 1 - Alexandria Governorate
                    </div>
                    <span>Alexandria, Egypt</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <span className="opacity-50">Phone</span>
                  </div>
                  <div className="col">
                    <span>+20-11-57735762</span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md">
                <div className="d-flex flex-wrap align-items-center g1 justify-content-between">
                  <MainButton
                    icon={<FontAwesomeIcon icon={faTrashAlt} />}
                    bg="alt"
                    style={{ minWidth: "auto" }}
                  />
                  <MainButton
                    icon={<FontAwesomeIcon icon={faEdit} />}
                    bg="alt-outline"
                    style={{ minWidth: "auto" }}
                  />
                </div>
              </div>
            </div>
            <div className="row p-3 g1 shadow align-items-center rounded-3">
              <div className="col d-flex justify-content-center">
                <input
                  type="radio"
                  name="user-address"
                  id="address-2"
                  className={styles["custom-check-input"]}
                  checked={selectedAddress === 2}
                  onChange={() => setSelectedAddress(2)}
                />
                <label
                  htmlFor="address-2"
                  className={styles["custom-check-label"]}
                ></label>
              </div>
              <div className="col-10 col-md-8">
                <div className="row mb-3">
                  <div className="col-3">
                    <span className="opacity-50">Address</span>
                  </div>
                  <div className="col">
                    <div>
                      El Raml, 6XQ3+P8 - El Raml 1 - Alexandria Governorate
                    </div>
                    <span>Alexandria, Egypt</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <span className="opacity-50">Phone</span>
                  </div>
                  <div className="col">
                    <span>+20-11-57735762</span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md">
                <div className="d-flex flex-wrap align-items-center g1 justify-content-between">
                  <MainButton
                    icon={<FontAwesomeIcon icon={faTrashAlt} />}
                    bg="alt"
                    style={{ minWidth: "auto" }}
                  />
                  <MainButton
                    icon={<FontAwesomeIcon icon={faEdit} />}
                    bg="alt-outline"
                    style={{ minWidth: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
