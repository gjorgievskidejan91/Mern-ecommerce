import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //the item to add to the cart
      const item = action.payload;
      //check if the item is alredy in the cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        //If exist update quantity
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        //If not exist , add new item to cartItems
        state.cartItems = [...state.cartItems, item];
      }

      //Update the price and save to storage
      return updateCart(state, item);
    },
    removeFromCart: (state, action) => {
      //Filter out the item to remove from cart
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      //Update the prices and save to storage
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
