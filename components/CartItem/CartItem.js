// Main Imports
import Link from "next/link";
import Image from "next/image";
// Components
import InputNumber from "../InputNumber/InputNumber";
// Redux
import { useDispatch } from "react-redux";
import {
  handleIncrement,
  handleDecrement as decreaseQuantity,
  deleteFromCart,
} from "../../redux/slices/cartSlice";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
// Styles
import styles from "./CartItem.module.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const {
    to = "/",
    imgURL = "/images/cart-prod-1.webp",
    title = "",
    defaultPrice,
    discount = 0,
    quantity = 1,
  } = item;

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      dispatch(deleteFromCart(item));
    } else {
      dispatch(decreaseQuantity(item));
    }
  };

  const calcPrice = () => {
    const price = parseFloat(defaultPrice) * (1 - parseInt(discount) / 100);
    return (price * quantity).toFixed(2);
  };

  return (
    <li className={`${styles.item} position-relative p-2 mb-4`}>
      <div className="row g-0">
        <div className="col-4 align-self-center">
          <Link href={to}>
            <a className="d-block">
              <Image src={imgURL} alt={title} width="80" height="80" />
            </a>
          </Link>
        </div>
        <div className="col-8">
          <Link href={to}>
            <a className="d-block">
              <h3 className={`${styles.title} h6 fw-bold text-center`}>
                {title}
              </h3>
            </a>
          </Link>
          <div className="mb-3 text-center">
            <span className="text-main mx-1">{calcPrice()} EGP</span>
            {discount && (
              <del className="text-muted mx-1">
                {parseInt(defaultPrice)} EGP
              </del>
            )}
          </div>
          <InputNumber
            handleIncrement={() => dispatch(handleIncrement(item))}
            handleDecrement={() => handleDecrement(item)}
            quantity={quantity}
          />
        </div>
      </div>
      <button
        className={styles.remove}
        onClick={() => dispatch(deleteFromCart(item))}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </li>
  );
};

export default CartItem;
