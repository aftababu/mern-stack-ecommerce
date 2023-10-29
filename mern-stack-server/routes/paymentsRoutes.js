const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const router = express.Router();
const {isAuthencateUser} = require("../middleware/auth");

router.route("/payment/process").post(isAuthencateUser, processPayment);

router.route("/stripeapikey").get(isAuthencateUser, sendStripeApiKey);

module.exports = router;
