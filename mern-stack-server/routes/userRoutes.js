const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetail,
  updatePassword,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  getCookies,
  updateprofile,
} = require("../controllers/userController");
const { isAuthencateUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthencateUser, getUserDetail);

router.route("/password/update").put(isAuthencateUser, updatePassword);

router.route("/me/update").put(isAuthencateUser, updateprofile);

router
  .route("/admin/users")
  .get(isAuthencateUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthencateUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthencateUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthencateUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
