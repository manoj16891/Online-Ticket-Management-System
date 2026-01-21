const Seat = require("../models/Seat.model");

exports.getSeatsByTravel = async (req, res) => {
  const seats = await Seat.find({
    travelId: req.params.travelId
  });

  res.json(seats);
};


// for testing

exports.lockSeatApi = async (req, res) => {
  const seat = await Seat.findOne({
    _id: req.params.seatId,
    status: "available"
  });

  if (!seat) {
    return res.status(400).json({ message: "Seat not available" });
  }

  seat.status = "locked";
  seat.lockedBy = req.user._id;
  await seat.save();

  res.json({ message: "Seat locked successfully" });
};
exports.unlockSeatApi = async (req, res) => {
  const seat = await Seat.findOne({
    _id: req.params.seatId,
    status: "locked",
    lockedBy: req.user._id
  });

  if (!seat) {
    return res.status(400).json({ message: "Seat not locked by you" });
  }

  seat.status = "available";
  seat.lockedBy = null;
  await seat.save();

  res.json({ message: "Seat unlocked successfully" });
};