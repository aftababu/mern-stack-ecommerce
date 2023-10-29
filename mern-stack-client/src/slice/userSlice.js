import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    user: {},
  },
  reducers: {
    userRequest: () => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    },

    userSuccess: (state, action) => {
      // console.log(action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    },
    logoutSuccess:()=>{
      return {
        loading:false,
        user:null,
        isAuthenticated:false
      }
    },
    logoutFail:(state,action)=>{
      return {
        ...state,
        loading:false,
        error:action.payload
      }
    },
    userFail: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    },
    loadUserFail: (state) => {
      return { ...state, loading: false, isAuthenticated: false, user: null };
    },
    clearErrors: (state) => {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {logoutSuccess,logoutFail,loadUserFail, userFail, userRequest, userSuccess, clearErrors,loginSuccess,loginRequest } =
  userSlice.actions;

export default userSlice.reducer;
