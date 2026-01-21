const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./config/passport')(passport); // ✅ Register JWT strategy

require('dotenv').config();
const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser()); // Add this line to use cookie-parser

app.use(passport.initialize());

// Define a simple route to test the server
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use("/api/travels", require("./routes/travel.routes"));
app.use("/api/seats", require("./routes/seat.routes"));
app.use("/api/bookings", require("./routes/booking.routes"));
app.use("/api/payment", require("./routes/payment.routes"));


// app.get("/", (req, res) => {
//   res.send("Ticket Management API Running");
// });

module.exports = app;