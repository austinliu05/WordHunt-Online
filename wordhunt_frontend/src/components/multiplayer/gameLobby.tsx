import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectSocket, getSocket, disconnectSocket } from "../../utils/websocket";
import { useGameContext } from "../../context/gameContext";

const GameLobby = () => {
    const [status, setStatus] = useState<string>("Waiting for another player");
    const [players, setPlayers] = useState<string[]>([]);
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
                    console.log(`Game started in room ${data.room}`);
                    navigate(`/game/${data.room}`, {
                        state: {
                            room: data.room,
                            players: data.players,
                            board: data.board,
                        },
                    });
                });
            })
            .catch((error) => {
                console.error("Socket connection error:", error);
            });

        return () => {
            const socket = getSocket();
            if (socket){
                socket.off("lobbyUpdate");
                socket.off("startGame");
            }
        };
    }, [navigate]);

    const goBack = () => {
        const socket = getSocket();
        socket.emit("leaveLobby");
        disconnectSocket();
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
                                    Player {index + 1}: {player}
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
        </div>
    );
};

export default GameLobby;
