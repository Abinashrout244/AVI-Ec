import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const { id } = action.payload;
      const exists = state.items.find((item) => item.id === id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        state.items.push(action.payload);
      }
    },
    removeWishlist: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleWishlist, removeWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
