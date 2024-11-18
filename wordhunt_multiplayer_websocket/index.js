const { Server } = require("socket.io");

const createWebSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`Player connected: ${socket.id}`);

        socket.on("joinLobby", () => {
            console.log(`Player joined the lobby: ${socket.id}`);
            socket.join("lobby");

            const players = Array.from(io.sockets.adapter.rooms.get("lobby") || []);
            io.to("lobby").emit("lobbyUpdate", { players });
        });

        socket.on("submitWord", (data) => {
            console.log(`Player ${socket.id} submitted word: ${data.word}`);
            io.to("lobby").emit("wordSubmitted", { playerId: socket.id, word: data.word });
        });

        socket.on("disconnect", () => {
            console.log(`Player disconnected: ${socket.id}`);
            const players = Array.from(io.sockets.adapter.rooms.get("lobby") || []);
            io.to("lobby").emit("lobbyUpdate", { players });
        });
    });

    return io;
};

module.exports = createWebSocketServer;
