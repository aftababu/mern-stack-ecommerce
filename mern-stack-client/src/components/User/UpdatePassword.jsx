import { Fragment, useEffect, useState } from "react";
import "./UpdatePassword.css";
import {  Lock, LockOpen, VpnKey } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../Layout/Loader/Loader";
import { profileReset } from "../../slice/profileSlice";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [oldPassword, setOldpassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    console.log(myForm)
    dispatch(updatePassword(myForm));
  };


  // console.log(useSelector(state=>state));
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  
    if (isUpdated) {
      alert.success("Password Updated Successfully");
      dispatch(loadUser());

      navigate("/account");
      dispatch(profileReset());
    }
  }, [dispatch, error, alert, navigate, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <form
                method="PUT"
                encType="application/json"
                onSubmit={updateSubmit}
                className="updatePasswordForm"
              >
                <div className="loginPassword">
                  <VpnKey />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldpassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="new Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <Lock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="update"
                  className="updatePasswordBtn"
                  // disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
