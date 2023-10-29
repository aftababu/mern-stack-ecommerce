const express = require("express");
const router = express.Router();
const { isAuthencateUser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  myOrder,
  getSingleOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/order/new").post(isAuthencateUser, newOrder);
router.route("/orders/me").get(isAuthencateUser, myOrder);

router.route("/order/:id").get(isAuthencateUser, getSingleOrder);

router
  .route("/admin/orders")
  .get(isAuthencateUser, authorizeRoles("admin"), getAllOrder);

router
  .route("/admin/order/:id")
  .put(isAuthencateUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthencateUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
