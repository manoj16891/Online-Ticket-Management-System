const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { createPaymentIntent } = require("../controllers/payment.controller");
const { webhookHandler } = require("../controllers/payment.webhook");
const routerPayment = express.Router();

routerPayment.post(
  "/create-intent",
  protect,
  createPaymentIntent
);

routerPayment.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookHandler
);

module.exports = routerPayment;