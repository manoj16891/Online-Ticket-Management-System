
const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    agentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
   
    travelName: String,
    source: String,
    destination: String,
    departureTime: Date,
    arrivalTime: Date,
    fare: Number,

    boardingPoints: [String],
    droppingPoints: [String],
    totalSeats: Number,
    seatLayout: {
        lowerDeck: Number,
        upperDeck: Number
    },
    
},{timestamps: true});
module.exports = mongoose.model("Travel", travelSchema);