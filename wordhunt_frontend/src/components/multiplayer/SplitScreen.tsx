import React, { useEffect, useState } from "react";
import CurrentPlayerBoard from "./CurrentPlayerBoard";
import OpponentPlayerBoard from "./OpponentPlayerBoard";
import Timer from "./Timer";
import Scoreboard from "../gameBoard/Scoreboard";
import { getSocket } from "../../utils/websocket";
import { useMultiplayerGameContext } from "../../context/multiplayerGameContext";

const SplitScreen: React.FC<{ room: string; player: string; board: string[][] }> = ({ room, player, board }) => {
    const [playerScore, setPlayerScore] = useState<number>(0);
    const [opponentScore, setOpponentScore] = useState<number>(0);

    const {tick} = useMultiplayerGameContext();
    
    useEffect(() => {
        const socket = getSocket();
        if (!socket.connected) {
            console.error("WebSocket not connected. Ensure connectSocket is called in GameLobby.");
        }
    
        const handlePlayerMove = ({ playerId, word, score }: { playerId: string; word: string; score: number }) => {
            if (playerId === socket.id) {
                setPlayerScore(score); 
            } else {
                setOpponentScore(score);
            }
        };

        socket.on("tileUpdate", handlePlayerMove);

        return () => {
            socket.off("tileUpdate", handlePlayerMove);
        };
    }, [tick]);

    return (
        <div className="container-fluid">
            <div className="row bg-dark py-2">
                <div className="col-6 text-center">
                    <Scoreboard score={playerScore} player="Your" />
                </div>
                <div className="col-6 text-center">
                    <Scoreboard score={opponentScore} player="Opponent" />
                </div>
            </div>
            <Timer />
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center">
                    <CurrentPlayerBoard room={room} board={board} playerId={player} />
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                    <OpponentPlayerBoard room={room} board={board} playerId={player} />
                </div>
            </div>
        </div>
    );
};

export default SplitScreen;
