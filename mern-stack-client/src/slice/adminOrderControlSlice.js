import { createSlice } from "@reduxjs/toolkit";

const adminOrderControllSlice = createSlice({
  name: "OrderControll",
  initialState: {},
  reducers: {
    deleteOrderRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    deleteOrderSuccess: (state, action) => {
      return {
        loading: false,
        isDeleted: action.payload.success,
      };
    },
    updateOrderSuccess: (state, action) => {
      return {
        loading: false,
        isUpdated: action.payload.success,
        order: action.payload.order,
      };
    },
    deleteOrderReset: (state) => {
      return {
        ...state,
        isDeleted: false
      };
    },
    updateOrderReset: (state) => {
      return {
        ...state,
        isUpdated: false
      };
    },
    deleteOrderFail: (state, action) => {
      return {
        ...state,
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
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  deleteOrderReset,
  updateOrderSuccess,
  updateOrderReset,
  clearErrors,
} = adminOrderControllSlice.actions;

export default adminOrderControllSlice.reducer;
