import axios from "../axios";
import {
  adminProductSuccess,
  allProductFail,
  allProductRequest,
  allProductSuccess,
  clearErrors,
} from "../slice/productsSlice";
import {
  // clearDetailErrors,
  productDetailRequest,
  productDetailSuccess,
  productDetailFail,
} from "../slice/productDetailSlice";
import {
  newReviewFail,
  newReviewRequest,
  newReviewSuccess,
} from "../slice/newReviewSlice";
import {
  newProductFail,
  newProductRequest,
  newProductSuccess,
} from "../slice/newProductSlice";
import {
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  updateProductSuccess,
} from "../slice/productSlice";
import { allReviewFail, allReviewRequest, allReviewSuccess, deleteReviewSuccess } from "../slice/reviewController";

export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch(allProductRequest());
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lt]=${price[1]}&ratings[gte]=${rating}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lt]=${price[1]}&category=${category}`;
      }

      const { data } = await axios.get(link);
      dispatch(allProductSuccess(data));
    } catch (error) {
      dispatch(allProductFail(error.response.data.message));
    }
  };

////// get admin product
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch(allProductRequest());

    const { data } = await axios.get("/api/v1/admin/products");
    dispatch(adminProductSuccess(data.products));
  } catch (error) {
    dispatch(allProductFail(error.response.data.message));
  }
};
//// create product admin
export const newProduct = (product) => async (dispatch) => {
  try {
    dispatch(newProductRequest());
    const { data } = await axios.post(`/api/v1/admin/product/new`, product, {
      headers: "application/json",
    });
    dispatch(newProductSuccess(data));
  } catch (error) {
    dispatch(newProductFail(error.response.data.message));
  }
};
///////////////////
//// create product admin
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch(deleteProductSuccess(data));
  } catch (error) {
    dispatch(deleteProductFail(error.response.data.message));
  }
};
///////////////////
//// create product admin
export const updateProduct = (id,formData) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    const { data } = await axios.put(`/api/v1/admin/product/${id}`, formData, {
      headers: "application/json",
    });
    // console.log(data)
    dispatch(updateProductSuccess(data));
  } catch (error) {
    dispatch(deleteProductFail(error.response.data.message));
    // console.log(error.response.data.message)
  }
};
///////////////////

export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch(productDetailRequest());
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch(productDetailSuccess(data.product));
  } catch (error) {
    dispatch(productDetailFail(error.response.data.message));
  }
};

// clearing errors
export const clearError = () => async (dispatch) => {
  dispatch(clearErrors());
};

// product review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(newReviewRequest());
    const { data } = await axios.put(`/api/v1/review`, reviewData, {
      headers: "application/json",
    });
    dispatch(newReviewSuccess(data.success));
  } catch (error) {
    dispatch(newReviewFail(error.response.data.message));
  }
};
// get all review
export const allReview = (id) => async (dispatch) => {
  try {
    dispatch(allReviewRequest());
    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
    dispatch(allReviewSuccess(data));
  } catch (error) {
    dispatch(allReviewFail(error.response.data.message));
  }
};
export const deleteReview = (reviewId,productId) => async (dispatch) => {
  try {
    dispatch(allReviewRequest());
    const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);
    dispatch(deleteReviewSuccess(data));
  } catch (error) {
    dispatch(allReviewFail(error.response.data.message));
  }
};
