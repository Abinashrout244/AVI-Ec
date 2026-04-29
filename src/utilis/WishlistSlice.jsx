import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    userId: null,
  },
  reducers: {
    setWishlistUserId: (state, action) => {
      const uid = action.payload;
      state.userId = uid;
      if (uid) {
        const localData = localStorage.getItem(`wishlistItems_${uid}`);
        state.items = localData ? JSON.parse(localData) : [];
      } else {
        state.items = [];
      }
    },
    toggleWishlist: (state, action) => {
      const { id } = action.payload;
      const exists = state.items.find((item) => item.id === id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        state.items.push(action.payload);
      }
      
      if (state.userId) {
        localStorage.setItem(`wishlistItems_${state.userId}`, JSON.stringify(state.items));
      } else {
        localStorage.setItem("wishlistItems_guest", JSON.stringify(state.items));
      }
    },
    removeWishlist: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      if (state.userId) {
        localStorage.setItem(`wishlistItems_${state.userId}`, JSON.stringify(state.items));
      } else {
        localStorage.setItem("wishlistItems_guest", JSON.stringify(state.items));
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      if (state.userId) {
        localStorage.removeItem(`wishlistItems_${state.userId}`);
      } else {
        localStorage.removeItem("wishlistItems_guest");
      }
    },
  },
});

export const { toggleWishlist, removeWishlist, clearWishlist, setWishlistUserId } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
