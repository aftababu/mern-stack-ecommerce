const express = require("express");
const {
  getAllProducts,
  createProducts,
  updateProduct,
  deleteProduct,
  getProductDetail,
  createProductReview,
  getAllproductReview,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthencateUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthencateUser, authorizeRoles("admin"), createProducts);
router
  .route("/admin/products")
  .get(isAuthencateUser, authorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/product/:id")
  .put(isAuthencateUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthencateUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetail);

router.route("/review").put(isAuthencateUser, createProductReview);

router
  .route("/reviews")
  .get(getAllproductReview)
  .delete(isAuthencateUser, deleteReview);

module.exports = router;
