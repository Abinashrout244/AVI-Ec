import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    items: [],
  },
  reducers: {
    addToast: (state, action) => {
      const payload = action.payload || {};
      const toast = {
        id: payload.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        message: payload.message || "Done",
        type: payload.type || "info",
        duration: payload.duration || 2200,
      };
      state.items.push(toast);
    },
    removeToast: (state, action) => {
      const { id } = action.payload || {};
      state.items = state.items.filter((toast) => toast.id !== id);
    },
    clearToasts: (state) => {
      state.items = [];
    },
  },
});

export const { addToast, removeToast, clearToasts } = toastSlice.actions;
export default toastSlice.reducer;
