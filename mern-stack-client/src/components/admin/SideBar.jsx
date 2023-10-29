import { Link } from "react-router-dom";
import {
  Add,
  ChevronRight,
  Dashboard,
  ExpandMore,
  ListAlt,
  People,
  PostAdd,
  RateReview,
} from "@mui/icons-material";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import logo from "/images/logo.png";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Eccomarce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <Dashboard />
          Dashboard
        </p>
      </Link>
      <TreeView
        aria-label="file system navigator"
        u
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        <TreeItem nodeId="1" label="Products">
          <Link to={"/admin/products"}>
            <TreeItem icon={<PostAdd />} nodeId="2" label="All" />
          </Link>
          <Link to={"/admin/product"}>
            <TreeItem icon={<Add />} nodeId="3" label="Create" />
          </Link>
     
        </TreeItem>
        <Link to={"/admin/orders"}>
            <p>
              <ListAlt /> Orders
            </p>
          </Link>
          <Link to={"/admin/users"}>
            <p>
              <People /> Users
            </p>
          </Link>
          <Link to={"/admin/reviews"}>
            <p>
              <RateReview /> Reviews
            </p>
          </Link>
      </TreeView>
    </div>
  );
};

export default SideBar;
