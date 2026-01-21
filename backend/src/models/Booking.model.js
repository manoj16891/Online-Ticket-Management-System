const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  travelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Travel"
  },

  seats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seat"
  }],

  boardingPoint: String,
  droppingPoint: String,

  totalAmount: Number,

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  },
  paymentStatus: {
  type: String,
  enum: ["pending", "paid", "failed"],
  default: "pending"
},
paymentIntentId: String

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
