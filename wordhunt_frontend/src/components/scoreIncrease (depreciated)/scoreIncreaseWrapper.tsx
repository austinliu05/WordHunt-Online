import React, { useEffect, useState } from 'react';
import { ScoreIncreaseA, ScoreIncreaseB } from './scoreIncrease';

interface ScoreIncreaseWrapperProps {
    increment: number;
}

const ScoreIncreaseWrapper: React.FC<ScoreIncreaseWrapperProps> = ({ increment }) => {
    const [toggle, setToggle] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setToggle((prev) => !prev);
        setVisible(true);

        const timeout = setTimeout(() => setVisible(false), 300);

        return () => clearTimeout(timeout);
    }, [increment]);

    return (
        <>
            <ScoreIncreaseA increment={increment} visible={toggle && visible} />
            <ScoreIncreaseB increment={increment} visible={!toggle && visible} />
        </>
    );
};

export default ScoreIncreaseWrapper;
