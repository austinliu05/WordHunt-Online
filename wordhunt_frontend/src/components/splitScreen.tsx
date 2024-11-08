import React from 'react';
import GameBoard from './gameBoard/gameBoard';

const SplitScreen: React.FC = () => {
    return (
        <div className="split-screen">
            <div className="left-pane">
                <GameBoard/>
            </div>
            <div className="right-pane">
                <GameBoard/>
            </div>
        </div>
    );
};

export default SplitScreen;
