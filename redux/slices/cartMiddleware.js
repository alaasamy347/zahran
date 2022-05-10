import {
  addToCart,
  deleteFromCart,
  clearCart,
  handleIncrement,
  handleDecrement,
} from "./cartSlice";

export const cartSession = (store) => (next) => (action) => {
  if (action.type.match(addToCart)) {
    if (localStorage.getItem("cart") !== null) {
      const sessionCart = JSON.parse(localStorage.getItem("cart"));
      const cart = [...sessionCart, action.payload];
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.setItem("cart", JSON.stringify([action.payload]));
    }
  } else if (action.type.match(deleteFromCart)) {
    if (localStorage.getItem("cart") !== null) {
      const cart = JSON.parse(localStorage.getItem("cart")).filter(
        (el) => el.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  } else if (action.type.match(clearCart)) {
    if (localStorage.getItem("cart") !== null) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  } else if (action.type.match(handleIncrement)) {
    if (localStorage.getItem("cart") !== null) {
      const el = JSON.parse(localStorage.getItem("cart")).find(
        (el) => el.id === action.payload.id
      );
      const newEl = { ...el, quantity: el.quantity + 1 };
      const cart = JSON.parse(localStorage.getItem("cart")).filter(
        (el) => el.id !== action.payload.id
      );
      const newCart = [...cart, newEl];
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  } else if (action.type.match(handleDecrement)) {
    if (localStorage.getItem("cart") !== null) {
      const el = JSON.parse(localStorage.getItem("cart")).find(
        (el) => el.id === action.payload.id
      );
      const newEl = { ...el, quantity: el.quantity - 1 };
      const cart = JSON.parse(localStorage.getItem("cart")).filter(
        (el) => el.id !== action.payload.id
      );
      const newCart = [...cart, newEl];
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  }
  return next(action);
};
