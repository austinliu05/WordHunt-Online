import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/gameContext';
import Scoreboard from './Scoreboard';
import Timer from './Timer';
import CurrentPlayerBoard from './gameBoard/CurrentPlayerBoard';
import CPUOpponentPlayerBoard from './gameBoard/CPUOpponentPlayerBoard';
import ReturnHomeButton from './endScreen/ReturnHomeButton';

const SplitScreen: React.FC = () => {
    const { currentPlayerScore, opponentPlayerScore } = useGameContext();
    const navigate = useNavigate();
    const isPageActive = useRef(true);

    return (
        <div className="container-fluid">
            <div className="row bg-dark py-2">
                <div className='col-6 text-center'>
                    <Scoreboard score={currentPlayerScore} />
                </div>
                <div className='col-6 text-center'>
                    <Scoreboard score={opponentPlayerScore} />
                </div>
            </div>
            <Timer />
            <div className='row'>
                <div className="col-md-6 d-flex justify-content-center">
                    <CurrentPlayerBoard />
                    {/* <ReturnHomeButton/> */}
                </div>
                <div className="col-md-1 d-none d-md-flex align-items-center">
                    <div className="border-start h-100" style={{ borderWidth: '2px' }}></div>
                </div>
                <div className="col-md-4 d-flex justify-content-center">
                    <CPUOpponentPlayerBoard />
                </div>
            </div>

        </div>
    );
};

export default SplitScreen;
