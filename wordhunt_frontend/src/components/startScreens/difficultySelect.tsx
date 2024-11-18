import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useGameContext } from '../../context/gameContext';
import { useNavigate } from 'react-router-dom';
import ReturnHomeButton from '../endScreen/returnHomeButton';

const DifficultySelect: React.FC = () => {
    const { setDifficultyLevel, startGame } = useGameContext();
    const navigate = useNavigate();

    const navigateToGame = (level: string) => {
        startGame();
        setDifficultyLevel(level);
        navigate('/game');
    };

    return (
        <Container
            className="d-flex flex-column align-items-center justify-content-center bg-dark text-light border rounded shadow mt-5"
            style={{ height: '60vh', maxWidth: '500px' }}
        >
            <p className="fs-1 fw-bold text-white mb-4">Select Your Difficulty</p>
            <div className="d-grid gap-3 w-100">
                <Button
                    variant="success"
                    className="py-3 fs-5 fw-bold"
                    onClick={() => navigateToGame('easy')}
                >
                    Easy
                </Button>
                <Button
                    variant="warning"
                    className="py-3 fs-5 fw-bold"
                    onClick={() => navigateToGame('medium')}
                >
                    Medium
                </Button>
                <Button
                    variant="secondary"
                    className="py-3 fs-5 fw-bold"
                    disabled
                >
                    Hard (not available)
                </Button>
                <div className="mt-4">
                    <ReturnHomeButton />
                </div>
            </div>
        </Container>
    );
};

export default DifficultySelect;
