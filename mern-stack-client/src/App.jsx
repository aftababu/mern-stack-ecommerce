import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header/Header";
import WebFont from "webfontloader";
import Footer from "./components/Layout/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignupUser from "./components/User/LoginSignupUser";
import store from "./store";
import ProductDetail from "./components/Product/ProductDetail";
import { loadUser } from "./actions/userAction";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import UserOption from "./components/Layout/Header/UserOption";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx";
import Payment from "./components/Cart/Payment.jsx";
import OrderSuccess from "./components/Cart/OrderSuccess.jsx";
import MyOrder from "./components/Order/MyOrder.jsx";
import OrderDetails from "./components/Order/OrderDetails.jsx";
import DashBoard from "./components/admin/DashBoard.jsx";
import axios from "./axios";
import AdminProtectedRoute from "./components/route/AdminProtectedRoute";
import ProductLists from "./components/admin/ProductLists.jsx";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct.jsx";
import OrderLists from "./components/admin/OrderList";
import ProccessOrder from "./components/admin/ProccessOrder";
import UsersList from "./components/admin/UsersList.jsx";
import UpdateUser from "./components/admin/UpdateUser.jsx";
import ProductReview from "./components/admin/ProductReview.jsx";
import NotFound from "./components/Layout/Not Found/NotFound";
import Contact from "./components/Layout/Contact/Contact";
import About from "./components/Layout/About/About";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey", {
      withCredentials: true,
    });
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <>
      <Header />
      {isAuthenticated && <UserOption user={user} />}
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/products" Component={Products} />
        <Route path="/products/:keyword" Component={Products} />
        <Route path="/product/:id" Component={ProductDetail} />
        <Route path="/search" Component={Search} />
        <Route path="/login" Component={LoginSignupUser} />
        {/* --------------protected route------------------ */}
        <Route element={<ProtectedRoute />}>
          <Route path="/account" Component={Profile} />
          <Route path="/me/update" Component={UpdateProfile} />
          <Route path="/password/update" Component={UpdatePassword} />
          <Route path="/shipping" Component={Shipping} />
          <Route path="/order/confirm" Component={ConfirmOrder} />
          {stripeApiKey && (
            <Route
              path="/process/payment"
              element={<Payment stripeApiKey={stripeApiKey} />}
            ></Route>
          )}
          <Route path="/success" Component={OrderSuccess} />
          <Route path="/order/me" Component={MyOrder} />
          <Route path="/order/:id" Component={OrderDetails} />
          <Route Component={AdminProtectedRoute}>
            <Route
              path="/admin/dashboard"
              Component={DashBoard} // Pass isAdmin prop when path is /admin/dashboard
            />
            <Route
              path="/admin/products"
              Component={ProductLists} // Pass isAdmin prop when path is /admin/dashboard
            />
            <Route
              path="/admin/product"
              Component={NewProduct} // Pass isAdmin prop when path is /admin/dashboard
            />
            <Route
              path="/admin/product/:id"
              Component={UpdateProduct} // Pass isAdmin prop when path is /admin/dashboard
            />
            <Route
              path="/admin/orders"
              Component={OrderLists} // Pass isAdmin prop when path is /admin/dashboard
            />
            <Route
              path="/admin/order/:id"
              Component={ProccessOrder} // Pass isAdmin prop when path is /admin/dashboard
            />
            <Route
              path="/admin/users"
              Component={UsersList} // Pass isAdmin prop when path is /admin/dashboard
            />
            <Route
              path="/admin/user/:id"
              Component={UpdateUser} // Pass isAdmin prop when path is /admin/dashboard
            />
            <Route
              path="/admin/reviews"
              Component={ProductReview} // Pass isAdmin prop when path is /admin/dashboard
            />
          </Route>
        </Route>
        {/* --------------end------------------ */}

        <Route path="/password/forgot" Component={ForgotPassword} />
        <Route path="/cart" Component={Cart} />
        <Route path="/contact" Component={Contact} />
        <Route path="/about" Component={About} />
        <Route path="*" Component={NotFound} exact />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
