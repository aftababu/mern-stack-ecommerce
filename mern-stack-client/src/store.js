// store.js
import productDetailSlice from "./slice/productDetailSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import profileSlice from "./slice/profileSlice";
import forgotPasswordSlice from "./slice/forgotPasswordSlice";
import cartSlice from "./slice/cartSlice";
import orderSlice from "./slice/orderSlice";
import myOrderSlice from "./slice/myOrderSlice";
import orderDetailSlice from "./slice/orderDetailSlice";
import newReviewSlice from "./slice/newReviewSlice";
import newProductSlice from "./slice/newProductSlice";
import productsSlice from "./slice/productsSlice";
import productSlice from "./slice/productSlice";
import adminOrderControlSlice from "./slice/adminOrderControlSlice";
import allUserSlice from "./slice/allUserSlice";
import userDetailSlice from "./slice/userDetailSlice";
import userControllerSlice from "./slice/userControllerSlice";
import allReviewSlice from './slice/reviewController'
const store = configureStore({
  reducer: {
    products: productsSlice,
    productDetail: productDetailSlice,
    user: userSlice,
    profile: profileSlice,
    forgotPassword: forgotPasswordSlice,
    cart: cartSlice,
    order: orderSlice,
    myOrder: myOrderSlice,
    orderDetail: orderDetailSlice,
    newReview: newReviewSlice,
    newProduct: newProductSlice,
    product:productSlice,
    adminOrderControll:adminOrderControlSlice,
    allUser:allUserSlice,
    userDetails:userDetailSlice,
    userControll:userControllerSlice,
    allReview:allReviewSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), // Ignore the serializable check for now
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
