import React from 'react';
import { Button, Container } from 'react-bootstrap';
import tutorialImage from '../assets/images/tutorial.png';

interface StartScreenProps {
    onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="mb-4">WordHunt Online</h1>
            <p className='text-center text-muted mb-4'>Connect letters together by dragging your mouse/finger. Make as many words as possible.</p>
            <img
                src={tutorialImage}
                alt="Tutorial"
                className="img-fluid mb-4 w-25"
            />            
            <Button variant="primary" size="lg" onClick={onStart}>
                Start Game
            </Button>
        </Container>
    );
};

export default StartScreen;
