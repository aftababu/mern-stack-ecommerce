import { createSlice } from "@reduxjs/toolkit";

const productDeatilSlice = createSlice({
  name: "ProductDeatail",
  initialState: {
    product: [],
  },
  reducers: {
    productDetailRequest: (state, action) => {
      return {
        loading: true,
        ...state,
      };
    },
    productDetailSuccess: (state, action) => {
      // console.log(action.payload.products);
      return {
        loading: false,
        product: action.payload,
      };
    },
    productDetailFail: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    // clearDetailErrors: (state, action) => {
    //   return {
    //     ...state,
    //     error: null,
    //   };
    // },
  },
});

export const {
  productDetailRequest,
  productDetailSuccess,
  productDetailFail,
  // clearDetailErrors,
} = productDeatilSlice.actions;

export default productDeatilSlice.reducer;
