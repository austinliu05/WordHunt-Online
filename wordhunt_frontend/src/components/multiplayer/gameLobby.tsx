import React, { useEffect, useState } from "react";
import { connectSocket, getSocket } from "../../utils/websocket";
import { useNavigate } from "react-router-dom";

const GameLobby = () => {
    const [status, setStatus] = useState<string>("Waiting for another player");
    const [players, setPlayers] = useState<string[]>([]);
    const [room, setRoom] = useState<string | null>(null);
    const navigate = useNavigate();

    return (
        <div className="container text-center mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="card p-4 shadow-sm">
                        <h1 className="mb-4">Game Lobby</h1>
                        <p className={`alert ${players.length === 2 ? "alert-success" : "alert-info"}`}>
                            {status}
                        </p>

                        <h2 className="mb-3">Players in Room:</h2>
                        <ul className="list-group mb-4">
                            {players.length > 0 ? (
                                players.map((player, index) => (
                                    <li className="list-group-item" key={index}>
                                        Player {index + 1}: {player}
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item text-muted">No players connected yet</li>
                            )}
                        </ul>

                        {players.length < 2 && (
                            <p className="text-muted">Waiting for another player to join...</p>
                        )}
                        {players.length === 2 && <p className="text-success">Game will start shortly!</p>}

                        <button
                            className="btn btn-danger mt-3"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameLobby;