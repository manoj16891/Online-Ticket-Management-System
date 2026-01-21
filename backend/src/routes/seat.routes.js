const express = require("express");
const seatRouter = express.Router();
const { getSeatsByTravel, lockSeatApi, unlockSeatApi } = require("../controllers/seat.controller");

seatRouter.get("/:travelId", getSeatsByTravel);

seatRouter.put("/lock/:seatId", lockSeatApi);
seatRouter.put("/unlock/:seatId", unlockSeatApi);

module.exports = seatRouter;