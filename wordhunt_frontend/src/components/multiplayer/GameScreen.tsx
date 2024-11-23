import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SplitScreen from "./SplitScreen";
import { getSocket } from "../../utils/websocket";

const GameScreen = () => {
    const location = useLocation();
    const { room, players, board } = location.state || {};
    const [playerId, setPlayerId] = useState<string>("");
    const [player2ID, setPlayer2ID] = useState<string>("");

    useEffect(() => {
        const socket = getSocket();

        if (socket && socket.id) {
            const currentPlayerId = socket.id;
            console.log("Current player:", currentPlayerId)
            setPlayerId(currentPlayerId);
        } else {
            console.error("Socket is not connected or ID is unavailable.");
        }
    }, [players]);

    if (!room || !players || !board) {
        return (
            <div className="container text-center mt-5">
                <h1>Error: Missing game data</h1>
                <p>Please return to the lobby and try again.</p>
            </div>
        );
    }

    return (
        <div className="container text-center mt-5">
            <SplitScreen room={room} player={playerId}  board={board} />
        </div>
    );
};

export default GameScreen;
