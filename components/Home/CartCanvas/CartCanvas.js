// Components
import CustomOffcanvas from "../../CustomOffcanvas/CustomOffcanvas";
import TriggerButton from "../../TriggerButton/TriggerButton";
import EmptyCart from "./EmptyCart/EmptyCart";
import NotEmptyCart from "./NotEmptyCart/NotEmptyCart";
// Styles
import styles from "./CartCanvas.module.css";
// Redux
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/slices/cartSlice";

const CartCanvas = (props) => {
  const dispatch = useDispatch();

  const { show, handleClose, placement, cart } = props;

  return (
    <CustomOffcanvas
      show={show}
      handleClose={handleClose}
      title={cart.length ? `You Have ${cart.length} Items` : ""}
      placement={placement}
      subHeader={
        cart?.length > 1 && (
          <TriggerButton
            text="Clear Cart"
            classes={styles.clear}
            onClick={() => dispatch(clearCart())}
          />
        )
      }
    >
      <div>
        {cart?.length ? (
          <NotEmptyCart cart={cart} handleClose={handleClose} />
        ) : (
          <EmptyCart />
        )}
      </div>
    </CustomOffcanvas>
  );
};

export default CartCanvas;
