import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
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
    },
    deleteItem: (state, action) => {
      const { id, size, color } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color)
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
