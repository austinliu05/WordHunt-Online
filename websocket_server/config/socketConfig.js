const { handleLobbyEvents } = require("../events/lobbyEvents");
const { handleGameEvents } = require("../events/gameEvents");

function configureSocket(io) {
    io.on("connection", (socket) => {
        console.log(`Player connected: ${socket.id}`);
        handleLobbyEvents(io, socket);
        handleGameEvents(io, socket);

        socket.on("disconnect", () => {
            console.log(`Player disconnected: ${socket.id}`);
        });
    });
}

module.exports = { configureSocket };
