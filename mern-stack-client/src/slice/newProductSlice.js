import { createSlice } from "@reduxjs/toolkit";

const newProductSlice = createSlice({
  name: "NewProduct",
  initialState: {},
  reducers: {
    newProductRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    newProductSuccess: (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    },
    newProductReset: (state) => {
      return {
        ...state,
        success: false
      };
    },
    newProductFail: (state, action) => {
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
  newProductRequest,
  newProductSuccess,
  newProductFail,
  newProductReset,
  clearErrors,
} = newProductSlice.actions;

export default newProductSlice.reducer;
