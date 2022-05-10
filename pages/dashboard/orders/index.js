// Main Imports
import { useState } from "react";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
// Components
import { withSessionSsr } from "../../../lib/withSession";
import SideBar from "../../../components/Dashboard/SideBar";
import MainLink from "../../../components/MainLink/MainLink";
import MainButton from "../../../components/MainButton/MainButton";
// BS
import Toast from "react-bootstrap/Toast";
// Styles
import styles from "../../../styles/dashboard/Orders.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareSquare,
  faStar,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

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

const Orders = ({ user }) => {
  const [showSocialShare, setShowSocialShare] = useState(false);

  return (
    <div className="container py-4">
      <div className={styles["orders-wrapper"]}>
        <SideBar user={user} active={4} />
        <div className="flex-grow-1">
          <h2 className="fw-bold">Orders History</h2>
          <p className="lead fs-6 mb-3">Show your orders.</p>
          <div className="p-3">
            <div
              className={`row flex-column flex-lg-row align-items-center g-2 mb-4 shadow ${styles["order"]}`}
            >
              <div className="col-auto">
                <MainButton
                  icon={<FontAwesomeIcon icon={faStar} />}
                  bg="alt-outline"
                  classes={styles["add-to-fav"]}
                />
              </div>
              <div className="col text-center">
                <h2 className="h6 text-uppercase">order Id</h2>
                <span>1</span>
              </div>
              <div className="col text-center">
                <h2 className="h6 text-uppercase">order date</h2>
                <span>3 March</span>
              </div>
              <div className="col text-center">
                <h2 className="h6 text-uppercase">Items</h2>
                <span>3</span>
              </div>
              <div className="col text-center">
                <h2 className="h6 text-uppercase">order status</h2>
                <span>delivered</span>
              </div>
              <div className="col-auto text-center">
                <MainLink
                  text="Details"
                  color="alt"
                  to="/dashboard/orders/details"
                />
              </div>
            </div>
            <div
              className={`row flex-column flex-lg-row align-items-center g-2 mb-4 shadow ${styles["order"]}`}
            >
              <div className="col-auto">
                <MainButton
                  icon={<FontAwesomeIcon icon={faStar} />}
                  bg="alt-outline"
                  classes={styles["add-to-fav"]}
                />
              </div>
              <div className="col text-center">
                <h2 className="h6 text-uppercase">order Id</h2>
                <span>1</span>
              </div>
              <div className="col text-center">
                <h2 className="h6 text-uppercase">order date</h2>
                <span>3 March</span>
              </div>
              <div className="col text-center">
                <h2 className="h6 text-uppercase">Items</h2>
                <span>3</span>
              </div>
              <div className="col text-center">
                <h2 className="h6 text-uppercase">order status</h2>
                <span>delivered</span>
              </div>
              <div className="col-auto text-center">
                <MainLink
                  text="Details"
                  color="alt"
                  to="/dashboard/orders/details"
                />
              </div>
            </div>
          </div>
          <div className="p-3" id="favourites">
            <div className="mb-3 position-relative">
              <h2 className="fw-bold d-flex align-items-center justify-content-between">
                <span>Favourites</span>
                <span
                  className={`btn ${styles["share-btn"]}`}
                  onClick={() => setShowSocialShare((prev) => !prev)}
                >
                  Share With Friends{" "}
                  <FontAwesomeIcon icon={faShareSquare} className="ms-2" />
                </span>
              </h2>
              <Toast
                show={showSocialShare}
                onClose={() => setShowSocialShare((prev) => !prev)}
                className={styles["social-share"]}
              >
                <Toast.Header>
                  <strong className="flex-grow-1">Share</strong>
                </Toast.Header>
                <Toast.Body>
                  <div className="d-flex align-items-center g1">
                    <FacebookShareButton url={"insert Key Here"}>
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    <FacebookMessengerShareButton url={"insert Key Here"}>
                      <FacebookMessengerIcon size={32} round={true} />
                    </FacebookMessengerShareButton>
                    <WhatsappShareButton url={"insert Key Here"}>
                      <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                  </div>
                </Toast.Body>
              </Toast>
              <p className="lead fs-6">Show your Favourite Orders</p>
            </div>
            <div className="p-3">
              <div
                className={`row flex-column flex-lg-row align-items-center g-2 mb-4 shadow ${styles["order"]}`}
              >
                <div className="col-auto">
                  <MainButton
                    icon={
                      <FontAwesomeIcon
                        icon={faStarSolid}
                        style={{ color: "var(--main-color)" }}
                      />
                    }
                    bg="alt-outline"
                    classes={styles["delete-button"]}
                  />
                </div>
                <div className="col text-center">
                  <h2 className="h6 text-uppercase">order Id</h2>
                  <span>1</span>
                </div>
                <div className="col text-center">
                  <h2 className="h6 text-uppercase">order date</h2>
                  <span>3 March</span>
                </div>
                <div className="col text-center">
                  <h2 className="h6 text-uppercase">Items</h2>
                  <span>3</span>
                </div>
                <div className="col text-center">
                  <h2 className="h6 text-uppercase">order status</h2>
                  <span>delivered</span>
                </div>
                <div className="col d-flex flex-wrap justify-content-center align-items-center g1">
                  <MainLink
                    text="Details"
                    color="alt"
                    to="/dashboard/orders/details"
                  />
                  <MainButton text="Buy Again" bg="alt-outline" />
                </div>
              </div>
              <div
                className={`row flex-column flex-lg-row align-items-center g-2 mb-4 shadow ${styles["order"]}`}
              >
                <div className="col-auto">
                  <MainButton
                    icon={
                      <FontAwesomeIcon
                        icon={faStarSolid}
                        style={{ color: "var(--main-color)" }}
                      />
                    }
                    bg="alt-outline"
                    classes={styles["delete-button"]}
                  />
                </div>
                <div className="col text-center">
                  <h2 className="h6 text-uppercase">order Id</h2>
                  <span>1</span>
                </div>
                <div className="col text-center">
                  <h2 className="h6 text-uppercase">order date</h2>
                  <span>3 March</span>
                </div>
                <div className="col text-center">
                  <h2 className="h6 text-uppercase">Items</h2>
                  <span>3</span>
                </div>
                <div className="col text-center">
                  <h2 className="h6 text-uppercase">order status</h2>
                  <span>delivered</span>
                </div>
                <div className="col d-flex flex-wrap justify-content-center align-items-center g1">
                  <MainLink
                    text="Details"
                    color="alt"
                    to="/dashboard/orders/details"
                  />
                  <MainButton text="Buy Again" bg="alt-outline" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
