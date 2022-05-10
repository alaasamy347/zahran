// Main Imports
import { configureStore } from "@reduxjs/toolkit";
// Reducers
import cartReducer from "./slices/cartSlice";
import sharedSlice from "./slices/shared/sharedSlice";
import userReducer from "./slices/users/userSlice";
// Middlewares
import { cartSession } from "./slices/cartMiddleware";
import { langSession } from "./slices/shared/sharedMiddleware";
import { userSession } from "./slices/users/userMiddleware";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    shared: sharedSlice,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartSession, langSession, userSession),
});
