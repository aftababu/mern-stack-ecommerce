import { Fragment, useState } from "react";
import Loader from "../Layout/Loader/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import { Box, Container, Slider, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Pagination, Stack } from "@mui/material";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import "./Products.css";

const categories = [
  "Laptop",
  "Footer",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];
const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState([0, 25000]);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keyword } = useParams();

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, price, category, rating, alert, error]);

  // console.log(products);
  const totalPages = Math.floor(productsCount / resultPerPage + 1);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    // Fetch data for the new page using newPage value
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const count = filteredProductsCount;
  console.log(useSelector((state) => state));
  console.log(totalPages, productsCount, resultPerPage, filteredProductsCount);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS __ECOMMERCE" />

          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category, key) => (
                <li
                  className={"category-link"}
                  key={key}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component={"legend"}>Ratings Above</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => {
                  setRating(newRating);
                }}
                aria-lebelleby="continuous-slider"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <Container>
              <Box mt={3} display="flex" justifyContent="center">
                <Stack spacing={2} direction="row" justifyContent="center">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                    siblingCount={1}
                    boundaryCount={1}
                    prevIcon={<ArrowBackIos />}
                    nextIcon={<ArrowForwardIos />}
                  />
                </Stack>
              </Box>
            </Container>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
