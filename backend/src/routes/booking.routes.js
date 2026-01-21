const router = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const { createBooking, lockSeats, confirmBookingAfterPayment } = require("../controllers/booking.controller");

router.post("/", protect, createBooking);
router.post("/locked", protect, lockSeats);
router.post("/confirm", protect, confirmBookingAfterPayment );


module.exports = router;
