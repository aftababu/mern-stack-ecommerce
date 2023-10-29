import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "Profile",
  initialState: {},
  reducers: {
    profileRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    profileSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },

    profileReset: (state, action) => {
      return {
        ...state,
        isUpdated: false,
      };
    },
    profileFail: (state, action) => {
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
  profileRequest,
  profileSuccess,
  clearErrors,
  profileReset,
  profileFail
} = profileSlice.actions;

export default profileSlice.reducer;
