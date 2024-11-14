import React from 'react';
import Scoreboard from './scoreBoard';
import Timer from './timer';
import CurrentPlayerBoard from './gameBoard/currentPlayerBoard';
import CPUOpponentPlayerBoard from './gameBoard/cpuOpponentPlayerBoard';
import { useGameContext } from '../context/gameContext';

const SplitScreen: React.FC = () => {
    const {currentPlayerScore, opponentPlayerScore} = useGameContext();
    return (
        <div className="container-fluid">
            <div className="row bg-dark py-2">
                <div className='col-6 text-center'>
                    <Scoreboard score={currentPlayerScore}/>
                </div>
                <div className='col-6 text-center'>
                    <Scoreboard score={opponentPlayerScore}/>
                </div>
            </div>
            <Timer />

            <div className='row mt-3'>
                <div className="col-md-6 d-flex justify-content-center">
                    <CurrentPlayerBoard />
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
