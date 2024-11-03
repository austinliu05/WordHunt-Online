import React, { useState, useEffect } from 'react';

interface TimerProps {
    onTimeUp?: () => void; // Optional callback for when time is up
}

const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
    const [time, setTime] = useState(90); 

    useEffect(() => {
        if (time <= 0) {
            if (onTimeUp) onTimeUp(); 
            return;
        }

        const timerId = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [time, onTimeUp]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};

export default Timer;
