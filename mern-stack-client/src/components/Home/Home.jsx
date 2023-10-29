import  { Fragment, useEffect } from "react";
import ProductCard from "../Product/ProductCard.jsx";
import "./Home.css";
import MetaData from "../Layout/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction.js";
import Loader from "../Layout/Loader/Loader.jsx";
import {useAlert} from 'react-alert'
import { Mouse } from "@mui/icons-material";

const Home = () => {
  const alert=useAlert()
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if(error){
       alert.error(error)
       dispatch(clearError())
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);
  // console.log(useSelector((state) => state),error);
  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <MetaData title={"ECOMMERCE"} />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <Mouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
