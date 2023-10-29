import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Fragment, useEffect } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import { DataGrid } from "@mui/x-data-grid";

import SideBar from "./SideBar";
import "./ProductLists.css";
import { Button } from "@mui/material";
import { clearError, deleteOrder, getAllOrder } from "../../actions/orderAction";
import { deleteOrderReset } from "../../slice/adminOrderControlSlice";

const OrderLists = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, orders } = useSelector((state) => state.orderDetail);
  const {
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.adminOrderControll);
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
    console.log(id)
  };
  // console.log(products);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        console.log(params);
        return params.row.status === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/order/${params.id}`}>
              <Edit />
            </Link>
            <Button onClick={() => deleteOrderHandler(params.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
        itemsQty: item.orderItems.length,
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
      alert.success('order deleted successfully');
      dispatch(deleteOrderReset());
    }
    dispatch(getAllOrder());
  }, [error, dispatch, alert,deleteError,isDeleted]);

  return (

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
  
  );
};

export default OrderLists;
