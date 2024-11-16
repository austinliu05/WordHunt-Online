import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useGameContext } from '../../context/gameContext';
import { useNavigate } from 'react-router-dom';
import ReturnHomeButton from '../returnHomeButton';

const DifficultySelect: React.FC = () => {
    const {setDifficultyLevel, startGame} = useGameContext();
    const navigate = useNavigate();

    const navigateToGame = (level: string) => {
        startGame();
        setDifficultyLevel(level);
        navigate('/game');
    };
    return (
        <Container className="d-flex align-items-center justify-content-center mt-5 w-50 bg-dark border rounded" style={{ height: '50vh' }}>
            <div className='d-grid gap-3'>
                <p className="fs-2 bg-white text-black p-3 rounded">Select Your Difficulty</p>
                <Button onClick={() => navigateToGame('easy')}>Easy</Button>
                <Button onClick={() => navigateToGame('medium')}>Medium</Button>
                <Button variant='secondary' disabled>Hard (not available)</Button>
                <ReturnHomeButton/>
            </div>
        </Container>
    );
};

export default DifficultySelect;
