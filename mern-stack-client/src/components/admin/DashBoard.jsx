import SideBar from "./SideBar.jsx";
import "./DashBoard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { getAdminProduct } from "../../actions/productAction.js";
import Loader from '../Layout/Loader/Loader.jsx'
import { getAllOrder } from "../../actions/orderAction.js";
import { getAllUser } from "../../actions/userAction.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const DashBoard = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.orderDetail);
  const { users } = useSelector((state) => state.allUser);

  console.log(products);
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrder())
    dispatch(getAllUser())
  }, [dispatch]);
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        data: [0, totalAmount],
        backgroundColor: "tomato",
        hoverBackgroundColor: "rgb(197,72,49)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  const doughtnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <SideBar />
          <div className="dashboardContainer">
            <Typography component={"h1"}>DashBoard</Typography>
            <div className="dashboardSummary">
              <div>
                <p>
                  Total Amount <br /> ${totalAmount}
                </p>
              </div>
              <div className="dashboardSummaryBox2">
                <Link to={"/admin/products"}>
                  <p>Product</p>
                  <p>{products.length}</p>
                </Link>
                <Link to={"/admin/orders"}>
                  <p>Orders</p>
                  <p>{orders&&orders.length}</p>
                </Link>
                <Link to={"/admin/users"}>
                  <p>Users</p>
                  <p>{users.length}</p>
                </Link>
              </div>
            </div>
            <div className="lineChart">
              <Line data={lineState} options={options} />
            </div>
            <div className="doughnutChart">
              <Doughnut data={doughtnutState} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DashBoard;
