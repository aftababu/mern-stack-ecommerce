import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    cartItems: sessionStorage.getItem("cartItem")
      ? JSON.parse(sessionStorage.getItem("cartItem"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const isItemExist = state.cartItems.find((i) => i._id === item._id);

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i._id === isItemExist._id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    },
    removeFromCart: (state, action) => {
      const filter = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, cartItems: filter };
    },
    shippingInfo: (state, action) => {
      return {
        ...state,
        shippingInfo: action.payload,
      };
    },
  },
});

export const { addToCart, removeFromCart, shippingInfo } = cartSlice.actions;

export default cartSlice.reducer;
