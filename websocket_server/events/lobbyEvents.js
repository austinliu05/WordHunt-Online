const { addToQueue, removeFromQueue, getQueueSize } = require("../utils/queueManager");
const { generateBoard } = require("../utils/letterGenerator");
const { BOARD_SIZE } = require("../utils/constants");

const rooms = {}; 

function handleLobbyEvents(io, socket) {
    socket.on("joinLobby", () => {
        console.log(`Player joined the lobby: ${socket.id}`);
        socket.join("lobby");

        addToQueue(socket.id);

        const players = Array.from(io.sockets.adapter.rooms.get("lobby") || []);
        io.to("lobby").emit("lobbyUpdate", { players });

        if (getQueueSize() >= 2) {
            const [player1Id, player2Id] = [removeFromQueue(), removeFromQueue()];
            const roomName = `room-${player1Id}-${player2Id}`;

            rooms[roomName] = {
                board: generateBoard(BOARD_SIZE, BOARD_SIZE), 
                players: {
                    [player1Id]: { score: 0, moves: [] },
                    [player2Id]: { score: 0, moves: [] },
                },
            };

            const player1Socket = io.sockets.sockets.get(player1Id);
            const player2Socket = io.sockets.sockets.get(player2Id);

            if (player1Socket && player2Socket) {
                player1Socket.leave("lobby");
                player2Socket.leave("lobby");

                player1Socket.join(roomName);
                player2Socket.join(roomName);

                io.to(roomName).emit("startGame", {
                    room: roomName,
                    players: Object.keys(rooms[roomName].players),
                    board: rooms[roomName].board,
                });

                console.log(`Created room: ${roomName} with players: ${player1Id}, ${player2Id}`);
            }
        } else {
            socket.emit("waitingForOpponent");
        }
    });
}

module.exports = { handleLobbyEvents, rooms };
