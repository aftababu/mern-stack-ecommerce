import { createSlice } from "@reduxjs/toolkit";

const newReviewSlice = createSlice({
  name: "Review",
  initialState: {},
  reducers: {
    newReviewRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    newReviewSuccess: (state, action) => {
      return {
        loading: false,
        success: action.payload,
      };
    },
    newReviewReset: (state) => {
      return {
        ...state,
        success: false
      };
    },
    newReviewFail: (state, action) => {
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
  newReviewRequest,
  newReviewSuccess,
  newReviewFail,
  newReviewReset,
  clearErrors,
} = newReviewSlice.actions;

export default newReviewSlice.reducer;
