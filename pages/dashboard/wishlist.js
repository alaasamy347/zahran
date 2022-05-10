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
import Image from "next/image";
// Components
import { withSessionSsr } from "../../lib/withSession";
import SideBar from "../../components/Dashboard/SideBar";
import MainButton from "../../components/MainButton/MainButton";
import Offer from "../../components/Product/Offer/Offer";
// BS
import Toast from "react-bootstrap/Toast";
// Styles
import styles from "../../styles/dashboard/Wishlist.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

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

const Wishlist = ({ user }) => {
  const [showSocialShare, setShowSocialShare] = useState(false);

  return (
    <div className="container py-4">
      <div className={styles["wishlist-wrapper"]}>
        <SideBar user={user} active={5} />
        <div className="flex-grow-1">
          <div className="mb-3 position-relative">
            <h2 className="fw-bold d-flex align-items-center justify-content-between">
              <span>Wishlist</span>
              <FontAwesomeIcon
                icon={faShareSquare}
                className={`btn ${styles["share-btn"]}`}
                onClick={() => setShowSocialShare((prev) => !prev)}
              />
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
            <p className="lead fs-6">Show your wishlist items</p>
          </div>
          <div className="p-3">
            <div
              className={`row flex-column flex-lg-row align-items-start g1 p-2 mb-4 shadow ${styles["order"]}`}
            >
              <div className="col-auto align-self-center">
                <MainButton
                  icon={<FontAwesomeIcon icon={faTrashAlt} />}
                  style={{ minWidth: "auto" }}
                  bg="alt-outline"
                />
              </div>
              <div
                className="col-auto mx-auto text-center position-relative"
                style={{ backgroundColor: "#ddd" }}
              >
                <Image
                  src="/images/sub-prod-3.png"
                  alt=""
                  width="80"
                  height="80"
                />
                <Offer text="Soldout" position="start" bg="alt" />
              </div>
              <div className="col text-center">
                <h2 className="h6 text-uppercase mb-1">Product Title</h2>
                <span className="lead fs-sm d-block">
                  lorem ipsum dolor amet
                </span>
                <span>price</span>
              </div>
              <div className="col align-self-center d-flex align-items-center g1 flex-wrap justify-content-center">
                <MainButton text="Find Similar" bg="alt-outline" />
              </div>
            </div>
            <div
              className={`row flex-column flex-lg-row align-items-start g1 p-2 shadow ${styles["order"]}`}
            >
              <div className="col-auto align-self-center">
                <MainButton
                  icon={<FontAwesomeIcon icon={faTrashAlt} />}
                  style={{ minWidth: "auto" }}
                  bg="alt-outline"
                />
              </div>
              <div
                className="col-auto mx-auto text-center position-relative"
                style={{ backgroundColor: "#ddd" }}
              >
                <Image
                  src="/images/sub-prod-3.png"
                  alt=""
                  width="80"
                  height="80"
                />
              </div>
              <div className="col text-center">
                <h2 className="h6 text-uppercase mb-1">Product Title</h2>
                <span className="lead fs-sm d-block">
                  lorem ipsum dolor amet
                </span>
                <span>price</span>
              </div>
              <div className="col align-self-center d-flex align-items-center g1 flex-wrap justify-content-center">
                <MainButton text="Find Similar" bg="alt-outline" />
                <MainButton text="Add To Cart" bg="alt" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
