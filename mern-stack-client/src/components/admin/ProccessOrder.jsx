import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import {
  clearError,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import { Button, Typography } from "@mui/material";
import "../Order/OrderDetail.css";
import SideBar from "./SideBar";
import "./ProccessOrder.css";
import { AccountTree } from "@mui/icons-material";
import { updateOrderReset } from "../../slice/adminOrderControlSlice";


const ProccessOrder = () => {
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetail);
  const { isUpdated, error: updateError } = useSelector(
    (state) => state.adminOrderControll
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch(updateOrderReset());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, id, alert, error, isUpdated, updateError]);
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };
  console.log(order);
  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - ADMIN`} />

      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading || !order ? (
            <Loader />
          ) : (
            <div className="confirmOrderPage"    style={{
              display: order.orderStatus === "Delivered" ? "block" : "grid",
            }}>
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="confirmshippingAreaBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>
                    <div>
                      <p>Amount : </p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>
                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item._id}>
                          <img src={item.images[0].url} alt="product" />
                          <p>{item.name}</p>
                          <p>{item._id}</p>
                          <span>
                            {item.quantity} x ${item.price} ={" "}
                            <b>${item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/* {} */}
              <div  style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}>
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <Typography>Order Summery</Typography>
                  <div>
                    <AccountTree />
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">select an option</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipment">In Shipment</option>
                      )}
                      {order.orderStatus === "Shipment" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button id="createProductBtn" type="submit"      disabled={
                      loading ? true : false || status === "" ? true : false
                    }>
                    Procees To Payment
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProccessOrder;
