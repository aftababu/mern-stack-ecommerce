import { CheckCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import  './OrderSuccess.css'
import { Link } from "react-router-dom";

const orderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircle />
      <Typography>Your Order has been placed successFully </Typography>
      <Link to={"/order/me"}>View Orders</Link>
    </div>
  );
};

export default orderSuccess;
