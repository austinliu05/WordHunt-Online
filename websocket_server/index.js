const http = require("http");
const { Server } = require("socket.io");
const { configureSocket } = require("./config/socketConfig");

const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Configure socket events
configureSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
