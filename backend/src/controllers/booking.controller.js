const Booking = require("../models/Booking.model");
const Seat = require("../models/Seat.model");
const Travel = require("../models/Travel.model");
const stripe = require("../config/stripe");
/**
 * CREATE BOOKING
 */
const mongoose = require("mongoose");

exports.createBooking = async (req, res) => {
  try {
    const {
      travelId,
      seatIds,
      boardingPoint,
      droppingPoint
    } = req.body;

    // 0. Basic validation
    if (!travelId || !seatIds?.length) {
      return res.status(400).json({ message: "Invalid booking data" });
    }

    // Convert seatIds to ObjectId
    const seatObjectIds = seatIds.map(id => new mongoose.Types.ObjectId(id));

    // 1. Validate travel
    const travel = await Travel.findById(travelId);
    if (!travel) {
      return res.status(404).json({ message: "Travel not found" });
    }

    // 2. Validate seats (LOCKED by same user)
    const seats = await Seat.find({
      _id: { $in: seatObjectIds },
      status: "available",
      lockedBy: req.user._id
    });

    if (seats.length !== seatObjectIds.length) {
      return res.status(400).json({
        message: "Some seats are not available or not locked by you"
      });
    }

    // 3. Calculate fare
    const totalAmount = travel.fare * seatObjectIds.length;

    // 4. Create booking
    const booking = await Booking.create({
      userId: req.user._id,
      travelId,
      seats: seatObjectIds,
      boardingPoint,
      droppingPoint,
      totalAmount,
      status: "confirmed"
    });

    // 5. Mark seats as BOOKED (only locked ones)
    await Seat.updateMany(
      {
        _id: { $in: seatObjectIds },
        lockedBy: req.user._id
      },
      {
        status: "booked",
        lockedBy: null
      }
    );

    res.status(201).json({
      message: "Booking confirmed",
      bookingId: booking._id,
      totalAmount
    });

  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
};


exports.lockSeats = async (req, res) => {
  const { seatIds } = req.body;

  const result = await Seat.updateMany(
    {
      _id: { $in: seatIds },
      status: "available"
    },
    {
      status: "locked",
      lockedBy: req.user._id,
      lockedAt: new Date()
    }
  );

  if (result.modifiedCount !== seatIds.length) {
    return res.status(400).json({
      message: "Some seats already locked or booked"
    });
  }

  res.json({ message: "Seats locked successfully" });
};

// Confirm Payment
exports.confirmBookingAfterPayment = async (req, res) => {
  try {
    const {
      travelId,
      seatIds,
      boardingPoint,
      droppingPoint,
      paymentIntentId
    } = req.body;

    // 1️⃣ Verify payment
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: "Payment not successful"
      });
    }

    // 2️⃣ Validate locked seats
    const seats = await Seat.find({
      _id: { $in: seatIds },
      status: "locked",
      lockedBy: req.user._id
    });

    if (seats.length !== seatIds.length) {
      return res.status(400).json({
        message: "Seats not available"
      });
    }

    // 3️⃣ Calculate fare
    const travel = await Travel.findById(travelId);
    const totalAmount = travel.fare * seatIds.length;

    // 4️⃣ Create booking
    const booking = await Booking.create({
      userId: req.user._id,
      travelId,
      seats: seatIds,
      boardingPoint,
      droppingPoint,
      totalAmount,
      paymentStatus: "paid",
      paymentIntentId,
      status: "confirmed"
    });

    // 5️⃣ Update seats
    await Seat.updateMany(
      { _id: { $in: seatIds } },
      {
        status: "booked",
        lockedBy: null,
        lockedAt: null
      }
    );

    res.status(201).json({
      message: "Booking confirmed",
      bookingId: booking._id
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
