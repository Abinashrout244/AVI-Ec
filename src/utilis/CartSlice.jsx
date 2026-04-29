import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    userId: null,
  },
  reducers: {
    setUserId: (state, action) => {
      const uid = action.payload;
      state.userId = uid;
      if (uid) {
        const localData = localStorage.getItem(`cartItems_${uid}`);
        state.items = localData ? JSON.parse(localData) : [];
      } else {
        state.items = [];
      }
    },
    addItem: (state, action) => {
      const { id, size, color } = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size && item.color === color
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      if (state.userId) {
        localStorage.setItem(`cartItems_${state.userId}`, JSON.stringify(state.items));
      } else {
        localStorage.setItem("cartItems_guest", JSON.stringify(state.items));
      }
    },

    removeItem: (state, action) => {
      const { id, size, color } = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size && item.color === color
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) =>
              !(item.id === id && item.size === size && item.color === color)
          );
        }
      }
      if (state.userId) {
        localStorage.setItem(`cartItems_${state.userId}`, JSON.stringify(state.items));
      } else {
        localStorage.setItem("cartItems_guest", JSON.stringify(state.items));
      }
    },
    deleteItem: (state, action) => {
      const { id, size, color } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color)
      );
      if (state.userId) {
        localStorage.setItem(`cartItems_${state.userId}`, JSON.stringify(state.items));
      } else {
        localStorage.setItem("cartItems_guest", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      if (state.userId) {
        localStorage.removeItem(`cartItems_${state.userId}`);
      } else {
        localStorage.removeItem("cartItems_guest");
      }
    },
  },
});

export const { addItem, removeItem, deleteItem, clearCart, setUserId } = cartSlice.actions;
export default cartSlice.reducer;
