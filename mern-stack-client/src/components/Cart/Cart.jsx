import { Fragment } from "react";
import "./Cart.css";
import CartItem from "./CartItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Typography } from '@mui/material'
import { RemoveShoppingCart } from '@mui/icons-material'

const Cart = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addItemToCart(id, newQty));
  };
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addItemToCart(id, newQty));
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCart />
          <Typography>no item in your cart</Typography>
          <Link to={"/products"}>View Product</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                
                  <div className="cartContainer" key={item._id}>
                    <CartItem
                      item={item}
                      deleteCartItems={removeItemFromCart}
                    />
                    <div className="cartInput">
                      <button
                        onClick={() =>
                          decreaseQuantity(item._id, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input type="number" value={item.quantity} readOnly />
                      <button
                        onClick={() =>
                          increaseQuantity(item._id, item.quantity, item.Stock)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="cartSubtotal">
                      ${item.price * item.quantity}
                    </p>
                  </div>
          
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`$${cartItems.reduce((a,b)=>a+(b.price*b.quantity),0)}`}</p>
                <div></div>
                <div className="checkOutBtn">
                  <button onClick={()=>navigate('/shipping')}>Check Out</button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
