import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../utilis/CartSlice";

const Store = configureStore({
  reducer: {
    cart: CartSlice,
  },
});

export default Store;
