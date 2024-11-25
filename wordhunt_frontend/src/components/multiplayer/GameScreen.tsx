import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SplitScreen from "./SplitScreen";
import { connectSocket, getSocket } from "../../utils/websocket";
import { Modal, Button } from "react-bootstrap";

const GameScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { room, players, board } = location.state || {};
    const [playerId, setPlayerId] = useState<string>("");
    const [socketReady, setSocketReady] = useState<boolean>(false);
    const [opponentDisconnected, setOpponentDisconnected] = useState<boolean>(false);

    useEffect(() => {
        const initializeSocket = async () => {
            try {
                const socket = await connectSocket(process.env.REACT_APP_WEBSOCKET_URL || "");

                if (socket && socket.id) {
                    setPlayerId(socket.id);

                    socket.emit("timerStart", { room: room });

                    socket.on("reconnect", () => {
                        console.log("Reconnected to the game");
                        socket.emit("rejoinGame", { room, playerId: socket.id });
                    });

                    setSocketReady(true);
                } else {
                    console.error("Socket is not connected or ID is unavailable.");
                    navigate("/"); 
                }
            } catch (error) {
                console.error("Failed to initialize socket:", error);
                navigate("/");
            }
        };

        if (!room || !players || !board) {
            console.error("Missing game data. Redirecting to lobby.");
            navigate("/"); 
        } else {
            initializeSocket();
        }

        return () => {
            const socket = getSocket();
            if (socket) {
                socket.off("timerStart");
                socket.off("reconnect");
            }
        };
    }, [room, players, board, navigate]);

    const handlePopupClose = () => {
        navigate("/"); 
    };

    if (!socketReady) {
        return (
            <div className="container text-center mt-5">
                <h1>Connecting to the game...</h1>
                <p>Please wait while we set up the game for you.</p>
            </div>
        );
    }

    return (
        <div className="container text-center mt-5">
            <SplitScreen room={room} player={playerId} board={board} />

            {opponentDisconnected && (
                <Modal show={opponentDisconnected} onHide={handlePopupClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Opponent Disconnected</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Your opponent has disconnected. The game will now end.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handlePopupClose}>
                            Return to Lobby
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default GameScreen;
