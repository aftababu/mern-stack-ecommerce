import { createSlice } from "@reduxjs/toolkit";

const userDetailSlice = createSlice({
  name: "UserDetail",
  initialState: {user:{}},
  reducers: {
    userDetailRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    userDetailSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    },


    userDetailFail: (state, action) => {
      return {
        ...state,
        loading:false,
        error:action.payload
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
  userDetailRequest,
  userDetailSuccess,
  clearErrors,
  userDetailFail
} = userDetailSlice.actions;

export default userDetailSlice.reducer;
