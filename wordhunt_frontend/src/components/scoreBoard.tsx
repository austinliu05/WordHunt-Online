import React, { useEffect, useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';

interface ScoreboardProps {
    score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score }) => {
    const [previousScore, setPreviousScore] = useState(score);
    const [scoreIncrement, setScoreIncrement] = useState<number | null>(null);

    useEffect(() => {
        if (score > previousScore) {
            const increment = score - previousScore;
            setScoreIncrement(increment);
            setPreviousScore(score);
        }
    }, [score, previousScore]);

    return (
        <Navbar bg="dark" variant="dark" className="position-relative">
            <Container className="justify-content-center">
                <Navbar.Text className="fs-4 text-white position-relative">
                    Score: {score.toString()}
                </Navbar.Text>
            </Container>
        </Navbar>
    );
};

export default Scoreboard;
