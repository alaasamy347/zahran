// Main Imports
import { useState } from "react";
import { useRouter } from "next/router";
// Components
import { withSessionSsr } from "../../lib/withSession";
import SideBar from "../../components/Dashboard/SideBar";
import MainButton from "../../components/MainButton/MainButton";
// BS
import Form from "react-bootstrap/Form";
// Styles
import styles from "../../styles/dashboard/Password.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

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

const ChangePassword = ({ user }) => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState({
    value: "",
    isShow: false,
  });
  const [newPassword, setNewPassword] = useState({
    value: "",
    isShow: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isShow: false,
  });

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    console.log("currentPassword: ", currentPassword);
    console.log("newPassword: ", newPassword);
    console.log("confirmPassword: ", confirmPassword);
  };

  return (
    <div className="container py-4">
      <div className={styles["password-wrapper"]}>
        <SideBar user={user} active={2} />
        <div className="flex-grow-1">
          <h2 className="fw-bold">Change Password</h2>
          <p className="lead fs-6 mb-0">Update Your Password</p>
          <div className="p-3">
            <Form onSubmit={handleSecuritySubmit}>
              <Form.Group className="mb-3" controlId="currentPassword">
                <Form.Label className="mb-1">Current Password:</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={currentPassword.isShow ? "text" : "password"}
                    className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
                    name="currentPassword"
                    value={currentPassword.value}
                    onChange={(e) =>
                      setCurrentPassword((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                  />
                  <FontAwesomeIcon
                    icon={currentPassword.isShow ? faEyeSlash : faEye}
                    onClick={() =>
                      setCurrentPassword((prev) => ({
                        ...prev,
                        isShow: !prev.isShow,
                      }))
                    }
                    className={styles["show-password"]}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="newPassword">
                <Form.Label className="mb-1">New Password:</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={newPassword.isShow ? "text" : "password"}
                    className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
                    name="newPassword"
                    value={newPassword.value}
                    onChange={(e) =>
                      setNewPassword((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                  />
                  <FontAwesomeIcon
                    icon={newPassword.isShow ? faEyeSlash : faEye}
                    onClick={() =>
                      setNewPassword((prev) => ({
                        ...prev,
                        isShow: !prev.isShow,
                      }))
                    }
                    className={styles["show-password"]}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label className="mb-1">Confirm Password:</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={confirmPassword.isShow ? "text" : "password"}
                    className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
                    name="newPassword"
                    value={confirmPassword.value}
                    onChange={(e) =>
                      setConfirmPassword((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                  />
                  <FontAwesomeIcon
                    icon={confirmPassword.isShow ? faEyeSlash : faEye}
                    onClick={() =>
                      setConfirmPassword((prev) => ({
                        ...prev,
                        isShow: !prev.isShow,
                      }))
                    }
                    className={styles["show-password"]}
                  />
                </div>
              </Form.Group>
              <div className="d-flex align-items-center g1 mt-4">
                <MainButton text="Save Edits" classes="mb-2" />
                <MainButton
                  text="cancel"
                  classes="mb-2"
                  bg="alt"
                  onClick={() => router.push("/")}
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
