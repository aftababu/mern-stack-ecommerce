import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "Products",
  initialState: {
    // loading:true,
    products: [],
    // productsCount:null,
    // error:null
  },
  reducers: {
    allProductRequest: () => {
      return {
        loading: true,
        products: [],
      };
    },
    allProductSuccess: (state, action) => {
      // console.log(action.payload.products);
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerpage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
    },
    adminProductSuccess: (state, action) => {
      // console.log(action.payload.products);
      return {
        loading: false,
        products: action.payload,
      };
    },
    allProductFail: (state, action) => {
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
  allProductFail,
  allProductRequest,
  allProductSuccess,
  clearErrors,
  adminProductSuccess
} = productsSlice.actions;

export default productsSlice.reducer;
