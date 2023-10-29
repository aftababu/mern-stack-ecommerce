import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Fragment, useEffect, useState } from "react";
import { Delete, Star } from "@mui/icons-material";
import MetaData from "../Layout/MetaData";
import { DataGrid } from "@mui/x-data-grid";
import {
  allReview,
  clearError,
  deleteReview,
} from "../../actions/productAction";
import SideBar from "./SideBar";
import "./ProductLists.css";
import { Button } from "@mui/material";
import { deleteReviewReset } from "../../slice/reviewController";
import { useNavigate } from "react-router-dom";
import "./ProductReview.css";

const ProductReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { error, reviews, loading, success, isDeleted } = useSelector(
    (state) => state.allReview
  );

  const [productId, setproductId] = useState("");
  const deleteProductHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };
  // console.log(products);
  const columns = [
    { field: "id", headerName: "Review id", minWidth: 220, flex: 0.6 },
    { field: "user", headerName: "User", minWidth: 220, flex: 0.6 },
    { field: "name", headerName: "User Name", minWidth: 220, flex: 0.5 },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 100,
      flex: 0.3,
      type: "number",
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 300,
      flex: 0.8,
      type: "number",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.5,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // console.log(params);
        return (
          <Fragment>
            <Button onClick={() => deleteProductHandler(params.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.user,
        name: item.name,
        rating: item.rating,
        comment: item.comment,
      });
    });
  console.log(reviews);
  useEffect(() => {
    if (productId.length === 24) {
      dispatch(allReview(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isDeleted) {
      alert.success("product deleted successfully");
      navigate("/admin/reviews");
      dispatch(deleteReviewReset());
    }
  }, [error, dispatch, alert, isDeleted, navigate, productId]);
  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(allReview(productId));
  };
  return (
    <div className="">
      <Fragment>
        <MetaData title={`Product review - ADMIN`} />

        <div className="dashboard">
          <SideBar />
          <div className="productReviewsContainer">
            <form
              className="productReviewsForm"
              onSubmit={productReviewSubmitHandler}
            >
              <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

              <div>
                <Star />
                <input
                  type="text"
                  placeholder="Product id"
                  required
                  value={productId}
                  onChange={(e) => setproductId(e.target.value)}
                />
              </div>
              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                search
              </Button>
            </form>

            {reviews && reviews.length > 0 ? (
              <DataGrid
                columns={columns}
                rows={rows}
                pageSizeOptions={10}
                // disableSelectionOnClick
                disableRowSelectionOnClick
                className="productListTable"
              />
            ) : (
              <h1 className="productReviewsFormHeading">No Reviews Found</h1>
            )}
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default ProductReview;
