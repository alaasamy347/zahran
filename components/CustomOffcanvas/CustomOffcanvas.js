// Bootstrap Components
import Offcanvas from "react-bootstrap/Offcanvas";

const CustomOffcanvas = (props) => {
  const {
    show = false,
    handleClose,
    title = "",
    children,
    placement,
    subHeader,
    ...others
  } = props;

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={placement}
        {...others}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-main">
            {title} {subHeader}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomOffcanvas;
