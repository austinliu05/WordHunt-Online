import React, { useEffect, useState } from 'react';
import './scoreIncrease.css';

interface ScoreIncreaseProps {
    increment: number;
}

const ScoreIncrease: React.FC<ScoreIncreaseProps> = ({ increment }) => {
    const [visible, setVisible] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        setVisible(true);
        setAnimationKey((prevKey) => prevKey + 1);
        const timeout = setTimeout(() => setVisible(false), 1000);
        return () => clearTimeout(timeout);
    }, [increment]);

    return (
        <div 
            key={animationKey}
            className={`score-increase ${visible ? 'fade-in' : 'fade-out'} position-absolute custom-score-position`}>
            +{increment}
        </div>
    );
};

export default ScoreIncrease;
