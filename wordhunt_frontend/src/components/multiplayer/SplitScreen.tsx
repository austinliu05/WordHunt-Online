import React, { useEffect, useRef } from 'react';
import { useGameContext } from '../../context/gameContext';
import Scoreboard from '../gameBoard/Scoreboard';
import Timer from '../gameBoard/Timer';
import CurrentPlayerBoard from '../singleplayer/CurrentPlayerBoard';
import OpponentPlayerBoard from './OpponentPlayerBoard';

const SplitScreen: React.FC = () => {
    const { currentPlayerScore, opponentPlayerScore } = useGameContext();

    return (
        <div className="container-fluid">
            <div className="row bg-dark py-2">
                <div className='col-6 text-center'>
                    <Scoreboard score={currentPlayerScore} player='Your' />
                </div>
                <div className='col-6 text-center'>
                    <Scoreboard score={opponentPlayerScore} player='Opponent' />
                </div>
            </div>
            <Timer />
            <div className='row'>
                <div className="col-md-6 d-flex justify-content-center">
                    <CurrentPlayerBoard />
                </div>
                <div className="col-md-1 d-none d-md-flex align-items-center">
                    <div className="border-start h-100" style={{ borderWidth: '2px' }}></div>
                </div>
                <div className="col-md-4 d-flex justify-content-center">
                    <OpponentPlayerBoard />
                </div>
            </div>

        </div>
    );
};

export default SplitScreen;
