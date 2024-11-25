import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectSocket, getSocket, disconnectSocket } from "../../utils/websocket";
import { useGameContext } from "../../context/gameContext";

const GameLobby = () => {
    const [status, setStatus] = useState<string>("Waiting for another player");
    const [players, setPlayers] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
    const { goToStartScreen } = useGameContext();
    const navigate = useNavigate();

    useEffect(() => {
        const serverURL = process.env.REACT_APP_WEBSOCKET_URL;

        connectSocket(`${serverURL}`)
            .then((socket) => {
                socket.emit("joinLobby");

                socket.on("lobbyUpdate", (data: { players: string[] }) => {
                    setPlayers(data.players);
                    setStatus(data.players.length === 2 ? "Player found! Starting game..." : "Waiting for another player...");
                });

                socket.on("startGame", (data: { room: string; players: string[]; board: string[][] }) => {
                    setIsLoading(true); // Show loading popup
                    setTimeout(() => {
                        navigate(`/game/${data.room}`, {
                            state: {
                                room: data.room,
                                players: data.players,
                                board: data.board,
                            },
                        });
                    }, 2000);
                });
            })
            .catch((error) => {
                console.error("Socket connection error:", error);
            });

        return () => {
            const socket = getSocket();
            if (socket) {
                socket.off("lobbyUpdate");
                socket.off("startGame");
            }
        };
    }, [navigate]);

    const goBack = () => {
        navigate('/');
        goToStartScreen();
    };

    return (
        <div className="container text-center mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="card p-4 shadow-sm">
                        <h1 className="mb-4">Game Lobby</h1>
                        <p className={`alert ${players.length === 2 ? "alert-success" : "alert-info"}`}>
                            {status}
                        </p>

                        <h2 className="mb-3">Players in Lobby:</h2>
                        <ul className="list-group mb-4">
                            {players.map((player, index) => (
                                <li className="list-group-item" key={index}>
                                    Player {index + 1} {player === getSocket()?.id && <span className="text-primary">(You)</span>}
                                </li>
                            ))}
                        </ul>
                        <p className="text-muted">Waiting for another player to join...</p>
                        <button className="btn btn-danger mt-3" onClick={goBack}>
                            Leave Lobby
                        </button>
                    </div>
                </div>
            </div>

            {/* Loading popup */}
            {isLoading && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
                >
                    <div className="p-4 bg-white rounded shadow-lg">
                        <h4>Player found...</h4>
                        <div className="spinner-border text-primary mt-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameLobby;
