const { rooms } = require("./lobbyEvents");
const { SCORING } = require("../utils/constants")

function handleGameEvents(io, socket) {
    socket.on("tileUpdate", (data) => {
        const { room, playerId, word, tile, isFirstTile, isLastTile, isValid, selectedColor} = data;

        if (!rooms[room] || !rooms[room].players[playerId]) return;

        const player = rooms[room].players[playerId];
        console.log(selectedColor)
        if (isFirstTile) {
            console.log(`Player ${playerId} started a move in room ${room} at tile:`, tile);
        }

        console.log(`Player ${playerId} updated tile in room ${room}:`, tile);

        if (isLastTile) {
            console.log(`Player ${playerId} ended a move in room ${room} at tile:`, tile, " Validiy: ", isValid);

            if (isValid) {
                player.moves.push(word);
                player.score += SCORING[word.length];
                console.log(`Player ${playerId}'s word "${word}" is valid. Updated score: ${player.score}`);
            }
        }

        io.to(room).emit("tileUpdate", {
            playerId,
            tile,
            score: player.score,
            isFirstTile,
            isLastTile,
            selectedColor
        });
    });

    socket.on("disconnect", () => {
        const room = Object.keys(socket.rooms).find((r) => r.startsWith("room-") && r !== socket.id);
        if (room && rooms[room]) {
            delete rooms[room].players[socket.id];

            if (Object.keys(rooms[room].players).length === 0) {
                delete rooms[room];
                console.log(`Room ${room} deleted`);
            } else {
                io.to(room).emit("playerDisconnected", { playerId: socket.id });
            }
        }
    });
}

module.exports = { handleGameEvents };
