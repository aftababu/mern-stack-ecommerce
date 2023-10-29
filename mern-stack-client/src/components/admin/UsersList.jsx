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
import { clearError, deleteUser, getAllUser } from "../../actions/userAction";
import { userDeleteReset } from "../../slice/userControllerSlice";

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, users } = useSelector((state) => state.allUser);
  const {
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.userControll);
  const deleteProductHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 180, flex: 0.8 },
    { field: "email", headerName: "Email", minWidth: 200, flex: .7 },
    {
        field: "name",
        headerName: "Name",
        minWidth: 150,
        flex: 0.5,
        type: "number",

    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      cellClassName: (params) => {
        console.log(params)
        return params.value === "admin"
        ? "greenColor"
        : "redColor";
    },
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
            <Link to={`/admin/user/${params.id}`}>
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
  console.log(users)
  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
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
      alert.success('user deleted successfully');
      dispatch(userDeleteReset());
    }
    dispatch(getAllUser());
  }, [error, dispatch, alert,deleteError,isDeleted]);

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
              disableRowSelectionOnClick
              className="productListTable"
            />
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default UsersList;
