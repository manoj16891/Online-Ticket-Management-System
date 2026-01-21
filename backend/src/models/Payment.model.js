const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  },

  paymentMethod: {
    type: String,
    enum: ["stripe", "phonepe", "gpay"]
  },

  transactionId: String,

  amount: Number,

  status: {
    type: String,
    enum: ["success", "failed"]
  }

}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
