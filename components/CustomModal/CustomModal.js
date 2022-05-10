// Bootstrap Components
import Modal from "react-bootstrap/Modal";

const CustomModal = (props) => {
  const {
    show = false,
    title = "",
    classes,
    handleClose,
    children,
    ...others
  } = props;

  return (
    <Modal onHide={handleClose} show={show} {...others}>
      <Modal.Header closeButton className={classes}>
        <Modal.Title className="text-main text-capitalize">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-2">{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
