import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import ProductReducer from "./ProductReducer";
import AuthReducer from "./AuthReducer";

export default configureStore({
  reducer: {
    cart: CartReducer,
    product: ProductReducer,
    auth: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
