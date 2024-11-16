import React, { useState, useEffect } from 'react';
import { TIMER_LENGTH } from '../utils/constants';
import { useGameContext } from '../context/gameContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Timer: React.FC= () => {
    const {timeIsUp} = useGameContext();
    const [time, setTime] = useState(TIMER_LENGTH); 
    const navigate = useNavigate();
    
    useEffect(() => {
        if (time <= 0) {
            if (timeIsUp) timeIsUp(); 
                navigate('/end');
            return;
        }

        const timerId = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [time, timeIsUp]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className='d-flex justify-content-center align-items-center display-6 fw-bold mt-3'>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};

export default Timer;
