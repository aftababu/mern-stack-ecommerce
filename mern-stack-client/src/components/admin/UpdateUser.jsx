import { Fragment, useEffect, useState } from "react";
import MetaData from "../Layout/MetaData";
import SideBar from "./SideBar";
import { AttachMoney, Description, Spellcheck } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearError } from "../../actions/productAction";
import "./NewProduct.css";
import { getUserDetail, updateUser } from "../../actions/userAction";
import { userUpdateReset } from "../../slice/userControllerSlice";
import Loader from '../Layout/Loader/Loader'

const UpdateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.userControll
  );
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // console.log(user._id, id);
  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetail(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("user updated Successfully");
      navigate("/admin/users");
      dispatch(userUpdateReset());
    }
  }, [error, isUpdated, alert, dispatch, navigate, updateError, id, user]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {
            loading?<Loader/>:<form
            className="createProductForm"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Create Product</h1>
            <div>
              <Spellcheck />
              <input
                type="text"
                placeholder="user Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoney />
              <input
                type="email"
                placeholder="user Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Description />
              <select onChange={(e) => setRole(e.target.value)} value={role}>
                <option value="select An option">select option</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false || role === "" ? true : false}
            >
              Create
            </Button>
          </form>
          }
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
