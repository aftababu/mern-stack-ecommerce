import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "Product",
  initialState: {},
  reducers: {
    deleteProductRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    deleteProductSuccess: (state, action) => {
      return {
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };
    },
    updateProductSuccess: (state, action) => {
      return {
        loading: false,
        isUpdated: action.payload.success,
        product: action.payload.product,
      };
    },
    deleteProductReset: (state) => {
      return {
        ...state,
        isDeleted: false
      };
    },
    updateProductReset: (state) => {
      return {
        ...state,
        isUpdated: false
      };
    },
    deleteProductFail: (state, action) => {
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
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  deleteProductReset,
  updateProductSuccess,
  updateProductReset,
  clearErrors,
} = productSlice.actions;

export default productSlice.reducer;
