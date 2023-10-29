import { createSlice } from "@reduxjs/toolkit";

const userControllerSlice = createSlice({
  name: "UserController",
  initialState: {},
  reducers: {
    userUpdateRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    userUpdateSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };
    },
    userDeleteSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };
    },
    userUpdateReset: (state, action) => {
        return {
          ...state,
          isUpdated: false,
        };
      },
    userDeleteReset: (state, action) => {
        return {
          ...state,
          isDeleted: false,
        };
      },

    userUpdateFail: (state, action) => {
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
  userUpdateRequest,
  userUpdateSuccess,
  userDeleteSuccess,
  userDeleteReset,
  userUpdateReset,
  clearErrors,
  userUpdateFail
} = userControllerSlice.actions;

export default userControllerSlice.reducer;
