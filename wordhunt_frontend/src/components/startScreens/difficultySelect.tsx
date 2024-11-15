import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useGameContext } from '../../context/gameContext';
import { useNavigate } from 'react-router-dom';

const DifficultySelect: React.FC = () => {
    const {setDifficultyLevel, startGame} = useGameContext();
    const navigate = useNavigate();

    const navigateToGame = (level: string) => {
        startGame();
        setDifficultyLevel(level);
        navigate('/game');
    };
    return (
        <Container className="mt-5">
            <div className='d-grid gap-3'>
                <Button onClick={() => navigateToGame('easy')}>Easy</Button>
                <Button onClick={() => navigateToGame('medium')}>Medium</Button>
                <Button variant='secondary' disabled>Hard (not available)</Button>
            </div>
        </Container>
    );
};

export default DifficultySelect;
