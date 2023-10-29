import { createSlice } from "@reduxjs/toolkit";

const myOrderSlice = createSlice({
  name: "Order",
  initialState: {
    orders:[]
  },
  reducers: {
    myOrderRequest: () => {
      return {
        loading:true
      };
    },
    myOrderSuccess: (state, action) => {
      return {
        loading: false,
        orders: action.payload,
      };
    },
    myOrderFail: (state, action) => {
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

export const { myOrderRequest, myOrderSuccess, myOrderFail, clearErrors } =
myOrderSlice.actions;

export default myOrderSlice.reducer;
