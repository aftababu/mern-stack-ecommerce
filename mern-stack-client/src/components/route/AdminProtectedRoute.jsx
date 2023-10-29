import { Fragment } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <Fragment>
      {user.role !== "admin" ? (
        <Navigate to="/" replace state={{ from: location }} />
      ) : (
        <Outlet />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
