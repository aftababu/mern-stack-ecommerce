import axios from "../axios";
import { deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, updateOrderSuccess } from "../slice/adminOrderControlSlice";
import {
  myOrderFail,
  myOrderRequest,
  myOrderSuccess,
} from "../slice/myOrderSlice";
import {
  adminAllOrderSuccess,
  orderDetailFail,
  orderDetailRequest,
  orderDetailSuccess,
} from "../slice/orderDetailSlice";

import {
  clearErrors,
  orderFail,
  orderRequest,
  orderSuccess,
} from "../slice/orderSlice";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(orderRequest());
    const { data } = await axios.post("/api/v1/order/new", order, {
      headers: "application/json",
    });
    console.log(order, data);
    dispatch(orderSuccess(data));
  } catch (error) {
    dispatch(orderFail(error.response.data.message));
  }
};

// ---------- my order--------
export const myOrder = () => async (dispatch) => {
  try {
    dispatch(myOrderRequest());
    const { data } = await axios.get("/api/v1/orders/me");
    // console.log(data)
    dispatch(myOrderSuccess(data.order));
  } catch (error) {
    dispatch(myOrderFail(error.response.data.message));
  }
};

// ---------- get order detail --------
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailRequest());
    const { data } = await axios.get(`/api/v1/order/${id}`);
    console.log(data);
    dispatch(orderDetailSuccess(data.order));
  } catch (error) {
    dispatch(orderDetailFail(error.response.data.message));
  }
};


// ---------- get all order admin --------
export const getAllOrder = () => async (dispatch) => {
  try {
    dispatch(orderDetailRequest());
    const { data } = await axios.get("/api/v1/admin/orders");
  
    dispatch(adminAllOrderSuccess(data));
  } catch (error) {
    dispatch(orderDetailFail(error.response.data.message));
  }
};
// ---------- delete order admin --------
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());
    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
  
    dispatch(deleteOrderSuccess(data));
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};
// ---------- update order admin --------
export const updateOrder = (id,updateData) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());
    const { data } = await axios.put(`/api/v1/admin/order/${id}`,updateData,{
      headers:'application/json'
    });
  console.log(data)
    dispatch(updateOrderSuccess(data));
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};
// clearing errors
export const clearError = () => async (dispatch) => {
  dispatch(clearErrors());
};
