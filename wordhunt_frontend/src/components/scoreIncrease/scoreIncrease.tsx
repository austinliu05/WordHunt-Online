import React, { useEffect, useState } from 'react';
import './scoreIncrease.css';

interface ScoreIncreaseProps {
    increment: number;
}

const ScoreIncrease: React.FC<ScoreIncreaseProps> = ({ increment }) => {
    const [visible, setVisible] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        setAnimationKey((prevKey) => prevKey + 1);
        setVisible(true);
        
        const timeout = setTimeout(() => setVisible(false), 500);
        
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
