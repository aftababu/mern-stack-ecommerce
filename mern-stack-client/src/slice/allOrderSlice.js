import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "Orders",
  initialState: {
    // loading:true,
    orders: [],
    // OrdersCount:null,
    // error:null
  },
  reducers: {
    allOrderRequest: () => {
      return {
        loading: true,
        Orders: [],
      };
    },
    allOrderSuccess: (state, action) => {
      // console.log(action.payload.Orders);
      return {
        loading: false,
        orders: action.payload.orders,
        // ordersCount: action.payload.orderCount,
        // resultPerPage: action.payload.resultPerpage,
        // filteredOrdersCount: action.payload.filteredOrdersCount,
      };
    },
    adminOrderSuccess: (state, action) => {
      // console.log(action.payload.Orders);
      return {
        loading: false,
        orders: action.payload,
      };
    },
    allOrderFail: (state, action) => {
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

export const {
  allOrderFail,
  allOrderRequest,
  allOrderSuccess,
  clearErrors,
  adminOrderSuccess
} = ordersSlice.actions;

export default ordersSlice.reducer;
