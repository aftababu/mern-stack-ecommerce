import { createSlice } from "@reduxjs/toolkit";

const forgotPasswordSlice = createSlice({
  name: "ForgotPassword",
  initialState: {},
  reducers: {
    forgotPasswordRequest: (state, action) => {
      return {
        ...state,
        loading: true,
        error:null
      };
    },
    forgotPasswordSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    },


    forgotPasswordFail: (state, action) => {
      return {
        ...state,
        loading:false,
        error:action.payload
      };
    },
    clearErrors: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  clearErrors,
  forgotPasswordFail
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
