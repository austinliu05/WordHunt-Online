import React from 'react';
import GameBoard from './gameBoard/gameBoard';

const SplitScreen: React.FC = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center">
                    <GameBoard isCPU={false} />
                </div>

                <div className="col-md-1 d-none d-md-flex align-items-center">
                    <div className="border-start h-100" style={{ borderWidth: '2px' }}></div>
                </div>

                <div className="col-md-5 d-flex justify-content-center">
                    <GameBoard isCPU={true} />
                </div>
            </div>
        </div>
    );
};

export default SplitScreen;
