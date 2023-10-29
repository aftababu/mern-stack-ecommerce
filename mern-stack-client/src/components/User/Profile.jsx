import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import './Profile.css'
const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div className="">
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to={"/me/update"}>Edit Profile</Link>
            </div>
            <div className="">
              <div className="">
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div className="">
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div className="">
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>
              <div className="">
                <Link to={"/orders"}>My Orders</Link>
                <Link to={"/password/update"}>Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Profile;
