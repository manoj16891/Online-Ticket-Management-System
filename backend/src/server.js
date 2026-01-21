require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const seatSocket = require('./sockets/seat.socket');
const {Server} = require('socket.io');
// Connect to the database
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});


io.on("connection", (socket) => {
  console.log("Socket Connected:", socket.id);
  seatSocket(io, socket);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});