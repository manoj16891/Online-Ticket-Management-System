const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  travelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Travel"
  },

  seatNumber: String,

  deck: {
    type: String,
    enum: ["lower", "upper"]
  },

  status: {
    type: String,
    enum: ["available", "locked", "booked"],
    default: "available"
  },

  lockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }

}, { timestamps: true });

module.exports = mongoose.model("Seat", seatSchema);
