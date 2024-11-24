import React, { useState, useEffect } from 'react';
import { getSocket } from '../../utils/websocket';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Timer: React.FC = () => {
    const [time, setTime] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const socket = getSocket();

        socket.on('timerStarted', ({ duration }) => {
            console.log(`Timer started with duration: ${duration}`);
            setTime(duration);
        });

        socket.on('timerUpdate', ({ timeRemaining }) => {
            setTime(timeRemaining);
        });

        socket.on('timerEnded', ({ players }) => {
            console.log('Timer ended');
        
            navigate('/end', {
                state: {
                    players,
                    playerId: socket.id,
                },
            });
        });
        

        return () => {
            socket.off('timerStarted');
            socket.off('timerUpdate');
            socket.off('timerEnded');
        };
    }, [navigate]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className="d-flex justify-content-center align-items-center display-6 fw-bold mt-3">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};

export default Timer;
