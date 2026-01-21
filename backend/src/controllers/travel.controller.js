const Travel = require("../models/Travel.model");
const Seat = require("../models/Seat.model");

/**
 * CREATE TRAVEL (AGENT)
 */
exports.createTravel = async (req, res) => {
  const {
    travelName,
    source,
    destination,
    departureTime,
    arrivalTime,
    fare,
    boardingPoints,
    droppingPoints,
    seatLayout
  } = req.body;

  const travel = await Travel.create({
    agentId: req.user._id,
    travelName,
    source,
    destination,
    departureTime,
    arrivalTime,
    fare,
    boardingPoints,
    droppingPoints,
    seatLayout
  });

  // Auto-create seats
  const seats = [];

  for (let i = 1; i <= seatLayout.lowerDeck; i++) {
    seats.push({
      travelId: travel._id,
      seatNumber: `L${i}`,
      deck: "lower"
    });
  }

  for (let i = 1; i <= seatLayout.upperDeck; i++) {
    seats.push({
      travelId: travel._id,
      seatNumber: `U${i}`,
      deck: "upper"
    });
  }

  await Seat.insertMany(seats);

  res.status(201).json({
    message: "Travel created successfully",
    travelId: travel._id
  });
};

/**
 * GET AGENT TRAVELS
 */
exports.getAgentTravels = async (req, res) => {
  const travels = await Travel.find({ agentId: req.user._id })
    .sort({ createdAt: -1 });

  res.json(travels);
};


exports.searchTravels = async (req, res) => {
  const { source, destination, page = 1, limit = 5 } = req.query;

  const query = {
    source,
    destination
  };

  const travels = await Travel.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ departureTime: 1 });

  const total = await Travel.countDocuments(query);

  res.json({
    total,
    page: Number(page),
    travels
  });
};
