// Main Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const product = state.cart.find((el) => el.id === action.payload.id);
      if (product) {
        state.status = "exist";
        return state;
      }
      action.payload.quantity = 1;
      state.cart.push(action.payload);
    },
    deleteFromCart: (state, action) => {
      const cart = state.cart.filter((el) => el.id !== action.payload.id);
      state.cart = cart;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    handleIncrement: (state, action) => {
      const cart = state.cart.map((el) => {
        if (el.id === action.payload.id) {
          el.quantity += 1;
          return el;
        }
        return el;
      });
      state.cart = cart;
    },
    handleDecrement: (state, action) => {
      const cart = state.cart.map((el) => {
        if (el.id === action.payload.id) {
          if (el.quantity > 1) {
            el.quantity -= 1;
            return el;
          }
        }
        return el;
      });
      state.cart = cart;
    },
  },
});

export const {
  getCart,
  addToCart,
  deleteFromCart,
  clearCart,
  handleIncrement,
  handleDecrement,
} = cartSlice.actions;

export default cartSlice.reducer;
