import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../utilis/CartSlice";
import WishlistSlice from "../utilis/WishlistSlice";
import ToastSlice from "../utilis/ToastSlice";

const Store = configureStore({
  reducer: {
    cart: CartSlice,
    wishlist: WishlistSlice,
    toast: ToastSlice,
  },
});

export default Store;
