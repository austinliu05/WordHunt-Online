import React from 'react';
import './scoreIncrease.css';

interface ScoreIncreaseProps {
    increment: number;
    visible: boolean;
}

export const ScoreIncreaseA: React.FC<ScoreIncreaseProps> = ({ increment, visible }) => (
    <div className={`score-increase ${visible ? 'fade-in' : 'fade-out'} position-absolute custom-score-position`}>
        +{increment}
    </div>
);

export const ScoreIncreaseB: React.FC<ScoreIncreaseProps> = ({ increment, visible }) => (
    <div className={`score-increase ${visible ? 'fade-in' : 'fade-out'} position-absolute custom-score-position`}>
        +{increment}
    </div>
);
