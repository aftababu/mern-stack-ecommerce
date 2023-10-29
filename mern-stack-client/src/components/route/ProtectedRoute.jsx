
import  { Fragment } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { loading,  isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <Fragment>
      {!loading ? (
        isAuthenticated ? (
          <Outlet />
        ) : (
          <Navigate to="/login" replace state={{ from: location }} />
        )
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
