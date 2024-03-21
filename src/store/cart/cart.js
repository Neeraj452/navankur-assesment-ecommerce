// cart.js

import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "Cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
        state.items = [...state.items];
        return;
      }
      const newItem = {
        ...action.payload,
        quantity: 1,
      };
      state.items.push(newItem);
    },
    removeItemFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    increaseQuantityCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        existingItem.quantity++;
        state.items = [...state.items];
      }
    },
    decreaseQuantityCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        return;
      }
      existingItem.quantity--;
      state.items = [...state.items];
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  increaseQuantityCart,
  decreaseQuantityCart,
} = cartSlice.actions;

export default cartSlice.reducer;
