import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Fragment, useEffect } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import { DataGrid } from "@mui/x-data-grid";
import {
  clearError,
  deleteProduct,
  getAdminProduct,
} from "../../actions/productAction";
import SideBar from "./SideBar";
import "./ProductLists.css";
import { Button } from "@mui/material";
import { deleteProductReset } from "../../slice/productSlice";

const ProductLists = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, products } = useSelector((state) => state.products);
  const {
    error: deleteError,
    isDeleted,
    message: deleteMessage,
  } = useSelector((state) => state.product);
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  // console.log(products);
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 150,
      flex: 0.3,
      type: "number",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/product/${params.id}`}>
              <Edit />
            </Link>
            <Button onClick={() => deleteProductHandler(params.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }
    if (isDeleted) {
      alert.success(deleteMessage);
      dispatch(deleteProductReset());
    }
    dispatch(getAdminProduct());
  }, [error, dispatch, alert,deleteError,deleteMessage,isDeleted]);

  return (
    <div className="">
      <Fragment>
        <MetaData title={`ALL PRODUCTS - ADMIN`} />

        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <h1 id="productListHeading">ALL PRODUCTS</h1>
            <DataGrid
              columns={columns}
              rows={rows}
              pageSizeOptions={10}
              // disableSelectionOnClick
              disableRowSelectionOnClick
              className="productListTable"
            />
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default ProductLists;
