import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "Order",
  initialState: {},
  reducers: {
    orderRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    orderSuccess: (state, action) => {
      return {
        loading: false,
        newOrder: action.payload,
      };
    },

    orderFail: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    clearErrors: (state) => {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const { orderRequest, orderSuccess, orderFail, clearErrors } =
  orderSlice.actions;

export default orderSlice.reducer;
