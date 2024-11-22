import React from "react";
import {useParams, useNavigate } from "react-router-dom";
import SplitScreen from "./SplitScreen";

const GameScreen = () => {
    const navigate = useNavigate();
    const { room: paramRoom } = useParams<{ room: string }>();

    const { room } = { room: paramRoom};

    if (!room) {
        navigate("/");
        return null;
    }

    return (
        <div className="container text-center mt-5">
            <h1>Game Room: {room}</h1>
            <SplitScreen></SplitScreen>
        </div>
    );
};

export default GameScreen;
