import axios from "../../axios";
import { shippingInfo } from "../../slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useRef } from "react";
import MetaData from "../Layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@mui/material";
import { CreditCard, VpnKey } from "@mui/icons-material";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./Payment.css";
import { clearError, createOrder } from "../../actions/orderAction";

const PaymentExtra = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.order);
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  // shippingInfo,
  // orderItems,
  // paymentInfo,
  // itemsPrice,
  // taxPrice,
  // shippingPrice,
  // totalPrice,
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        {
          withCredentials: true,
          headers: config,
        }
      );
      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          alert.error("there is some issue during payment process");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <CreditCard />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            ref={payBtn}
            value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default PaymentExtra;
