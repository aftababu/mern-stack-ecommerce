import { createSlice } from "@reduxjs/toolkit";

const allReviewSlice = createSlice({
  name: "AllReview",
  initialState: {},
  reducers: {
    allReviewRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    allReviewSuccess: (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        reviews: action.payload.reviews,
      };
    },
    deleteReviewSuccess: (state, action) => {
      return {
        loading: false,
        isDeleted: action.payload.success,
      };
    },
    allReviewReset: (state) => {
      return {
        ...state,
        success: false,
      };
    },
    deleteReviewReset: (state) => {
      return {
        ...state,
        isDeleted: false,
      };
    },
    allReviewFail: (state, action) => {
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
  allReviewRequest,
  allReviewSuccess,
  allReviewFail,
  allReviewReset,
  deleteReviewReset,
  deleteReviewSuccess,
  clearErrors,
} = allReviewSlice.actions;

export default allReviewSlice.reducer;
