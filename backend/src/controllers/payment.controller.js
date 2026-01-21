const stripe = require("../config/stripe");
const SeatModel = require("../models/Seat.model");
const TravelModel = require("../models/Travel.model");

exports.createPaymentIntent = async (req, res) => {
  try {
    const { travelId, seatIds } = req.body;

    // 1️⃣ Validate locked seats
    const seats = await SeatModel.find({
      _id: { $in: seatIds },
      status: "locked",
      lockedBy: req.user._id
    });

    if (seats.length !== seatIds.length) {
      return res.status(400).json({
        message: "Seats not locked"
      });
    }

    // 2️⃣ Get travel fare
    const travel = await TravelModel.findById(travelId);
    const amount = travel.fare * seatIds.length * 100; // paisa

    // 3️⃣ Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      metadata: {
        userId: req.user._id.toString(),
        travelId,
        seatCount: seatIds.length
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amount / 2
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
