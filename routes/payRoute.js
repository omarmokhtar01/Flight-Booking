const express = require("express");

const { authProtect, allowedTo } = require("../Controller/authService");

const {
  createCheckoutSession, c
} = require("../Controller/paymentServices");

const router = express.Router();
router.use(authProtect);
// router
//   .route("/")
//   .get(allowedTo("user", "admin"), filterUserOrders, getAllOrders);

// router.get("/:id", allowedTo("user", "admin"), getSpecificOrder);

// router.put(
//   "/:id/deliverd",
//   allowedTo("admin"),
//   updateOrderIsDelivered
// );
// router.put("/:id/paid", allowedTo("admin"), updateOrderIsPaid);

router.post(
  "/create-checkout-session/:bookingId",
  allowedTo("user"),
  createCheckoutSession
);

module.exports = router;
