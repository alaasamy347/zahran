// Main Imports
import { useForm } from "react-hook-form";
// Components
import { withSessionSsr } from "../../lib/withSession";
import SideBar from "../../components/Dashboard/SideBar";
import MainButton from "../../components/MainButton/MainButton";
// BS
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
// Styles
import styles from "../../styles/dashboard/Profile.module.css";

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

const Profile = ({ user }) => {
  const { firstName, lastName, email, mobile } = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container my-4">
      <div className={styles["profile-wrapper"]}>
        <SideBar user={user} active={1} />
        <div className="flex-grow-1">
          <h2 className="fw-bold">Profile</h2>
          <p className="lead fs-6 mb-0">Update your personal informaiton.</p>
          <div className="p-3">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label className="mb-1">First Name:</Form.Label>
                <Form.Control
                  type="text"
                  className="border-0 border-bottom border-dark p-0 pb-1 fs-sm rounded-0"
                  defaultValue={firstName}
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
                  defaultValue={lastName}
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
                  defaultValue={mobile}
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
                  defaultValue={email}
                  disabled
                />
              </Form.Group>
              <div className="d-flex align-items-center g1 mt-4">
                <MainButton text="update info" classes="mb-2" />
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

export default Profile;
