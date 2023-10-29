import { addToCart, removeFromCart, shippingInfo } from "../slice/cartSlice";
import axios from "../axios";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `http://localhost:4200/api/v1/product/${id}`
  );

  dispatch(
    addToCart({
      _id: data?.product._id,
      name: data?.product.name,
      Stock: data?.product.Stock,
      price: data?.product.price,
      images: [
        {
          url: data?.product.images[0].url,
        },
      ],
      quantity,
    })
  );
  sessionStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch(
    removeFromCart(id)
  );
  sessionStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch(
    shippingInfo(data)
  );
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
