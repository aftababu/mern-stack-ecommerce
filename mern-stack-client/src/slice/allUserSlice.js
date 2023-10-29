import { createSlice } from "@reduxjs/toolkit";

const allUserSlice = createSlice({
  name: "AllUser",
  initialState: {
    users:[]
  },
  reducers: {
    allUserRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    allUserSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    },
    allUserFail: (state, action) => {
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
  allUserRequest,
  allUserSuccess,
  clearErrors,
  allUserFail
} = allUserSlice.actions;

export default allUserSlice.reducer;
