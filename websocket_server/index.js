const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
    },
});

const queue = [];

io.on("connection", (socket) => {
    console.log(`Player connected: ${socket.id}`);

    socket.on("joinLobby", () => {
        console.log(`Player joined the lobby: ${socket.id}`);
        socket.join("lobby");

        if (!queue.includes(socket.id)) {
            queue.push(socket.id);
        }

        const players = Array.from(io.sockets.adapter.rooms.get("lobby") || []);
        io.to("lobby").emit("lobbyUpdate", { players: players });

        if (queue.length >= 2){
            const player1Id = queue.shift();
            const player2Id = queue.shift();

            const player1 = io.sockets.sockets.get(player1Id);
            const player2 = io.sockets.sockets.get(player2Id);

            if (!player1 || !player2) {
                console.error(`One or both players not found: ${player1Id}, ${player2Id}`);
                return;
            }

            const roomName = `room-${player1Id}-${player2Id}`;
            player1.leave("lobby");
            player2.leave("lobby");
            player1.join(roomName);
            player2.join(roomName);
            io.to(roomName).emit("startGame", { room: roomName, players: [player1Id, player2Id] });
            console.log(`Room ${roomName} created for players: ${player1Id}, ${player2Id}`);
        } else {
            socket.emit("waitingForOpponent");
        }
    });
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = 3000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}