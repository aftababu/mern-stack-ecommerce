import { createSlice } from "@reduxjs/toolkit";

const orderDetailSlice = createSlice({
  name: "OrderDetail",
  initialState: {
    order:{}
  },
  reducers: {
    orderDetailRequest: () => {
      return {
        loading:true
      };
    },

    orderDetailSuccess: (state, action) => {
      return {
        loading: false,
        order: action.payload,
      };
    },
    adminAllOrderSuccess: (state, action) => {
      return {
        loading: false,
        success:action.payload.success,
        orders: action.payload.orders,
      };
    },
    orderDetailFail: (state, action) => {
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

export const {orderDetailSuccess, orderDetailRequest, orderDetailFail, clearErrors,adminAllOrderSuccess } =
orderDetailSlice.actions;

export default orderDetailSlice.reducer;
