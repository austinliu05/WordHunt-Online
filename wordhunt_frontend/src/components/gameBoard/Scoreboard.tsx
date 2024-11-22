import React, { useEffect, useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';

interface ScoreboardProps {
    player: string;
    score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, player }) => {
    const [displayScore, setDisplayScore] = useState(score);

    useEffect(() => {
        if (displayScore < score) {
            const incrementAmount = Math.ceil((score - displayScore) / 3);

            const interval = setInterval(() => {
                setDisplayScore((prevScore) => {
                    const newScore = prevScore + incrementAmount;
                    if (newScore >= score) {
                        clearInterval(interval);
                        return score; 
                    }
                    return newScore;
                });
            }, 50);

            return () => clearInterval(interval);
        }
    }, [score, displayScore]);

    return (
        <Navbar bg="dark" variant="dark" className="position-relative">
            <Container className="justify-content-center">
                <Navbar.Text className="fs-4 text-white position-relative">
                    {player} Score: {displayScore.toString()}
                </Navbar.Text>
            </Container>
        </Navbar>
    );
};

export default Scoreboard;
