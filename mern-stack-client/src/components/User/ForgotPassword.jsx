import { Fragment, useEffect, useState } from "react";
import "./ForgotPassword.css";
import {   MailOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../Layout/Loader/Loader";

const ForgotPassword = () => {
    const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState("");

  const { error, message, loading } = useSelector((state) => state.forgotPassword);
  const forgotSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("email", email);

    console.log(myForm)
    dispatch(forgotPassword(myForm));
  };


  // console.log(useSelector(state=>state));
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  
    if (message) {
      alert.success(message);

    //   navigate("/account");
    }
  }, [dispatch, error, alert, message]);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <div className="forgotPasswordContainer">
          <div className="forgotPasswordBox">
            <form
              method="POST"
              encType="multipart/form-data"
              onSubmit={forgotSubmit}
              className="forgotPasswordForm"
            >
 
     <div className="loginEmail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
             
              <input
                type="submit"
                value="Sent"
                className="forgotPasswordBtn"
                // disabled={loading ? true : false}
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ForgotPassword