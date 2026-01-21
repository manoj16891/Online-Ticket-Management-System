const Seat = require("../models/Seat.model");

module.exports = (io, socket) => {

  // Lock seat
  socket.on("lockSeat", async ({ seatId, userId }) => {
    const seat = await Seat.findOne({
      _id: seatId,
      status: "available"
    });

    if (!seat) return;

    seat.status = "locked";
    seat.lockedBy = userId;
    await seat.save();

    io.emit("seatUpdated", seat);
  });

  // Unlock seat
  socket.on("unlockSeat", async ({ seatId, userId }) => {
    const seat = await Seat.findOne({
      _id: seatId,
      lockedBy: userId,
      status: "locked"
    });

    if (!seat) return;

    seat.status = "available";
    seat.lockedBy = null;
    await seat.save();

    io.emit("seatUpdated", seat);
  });

};
