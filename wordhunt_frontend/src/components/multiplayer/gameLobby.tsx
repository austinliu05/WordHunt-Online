import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectSocket, getSocket, disconnectSocket } from "../../utils/websocket";
import { useGameContext } from "../../context/gameContext";

const GameLobby = () => {
    const [status, setStatus] = useState<string>("Waiting for another player");
    const [players, setPlayers] = useState<string[]>([]);
    const [room, setRoom] = useState<string | null>(null);
    const { goToStartScreen } = useGameContext();
    const navigate = useNavigate();

    useEffect(() => {
        const serverURL = process.env.REACT_APP_WEBSOCKET_URL;
        const socket = connectSocket(`${serverURL}`);

        socket.emit("joinLobby");

        socket.on("lobbyUpdate", (data: { players: string[] }) => {
            setPlayers(data.players);

            if (data.players.length === 2) {
                setStatus("Player found! Starting game...");
            }
        });

        socket.on("startGame", (data: { room: string, players: string[] }) => {
            setRoom(data.room);
            navigate(`/game/${data.room}`, { state: { room: data.room, players: data.players } });
        });

        return () => {
            disconnectSocket();
        };
    }, [navigate])

    const goBack = () => {
        navigate('/');
        goToStartScreen();
    }
    const renderLobby = () => (
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
                    </div>
                </div>
            </div>
        </div>
    );

    const renderGameRoom = () => (
        <div className="container text-center mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="card p-4 shadow-sm">
                        <h1 className="mb-4">Game Room</h1>
                        <p className="alert alert-success">
                            Room: {room}
                        </p>
                        <h2>Game is starting...</h2>
                        <p>Good luck!</p>
                        <button
                            className="btn btn-danger mt-3"
                            onClick={goBack}
                        >
                            Leave Game
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
    return room ? renderGameRoom() : renderLobby();
}

export default GameLobby;