import React, { useEffect, useState } from 'react';
import './scoreIncrease.css';

interface ScoreIncreaseProps {
    increment: number;
}

const ScoreIncrease: React.FC<ScoreIncreaseProps> = ({ increment }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Show the increment and hide it after 1 second
        setVisible(true);
        const timeout = setTimeout(() => setVisible(false), 1000); // 1 second duration
        return () => clearTimeout(timeout);
    }, [increment]);

    return (
        <div className={`score-increase ${visible ? 'fade-in' : 'fade-out'} position-absolute custom-score-position`}>
            +{increment}
        </div>
    );
};

export default ScoreIncrease;
