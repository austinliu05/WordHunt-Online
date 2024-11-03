import React from 'react';
import { Button, Container } from 'react-bootstrap';

interface StartScreenProps {
    onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="mb-4">Welcome to WordHunt Online!</h1>
            <p className="text-muted mb-4">Press the button below to begin.</p>
            <Button variant="primary" size="lg" onClick={onStart}>
                Start Game
            </Button>
        </Container>
    );
};

export default StartScreen;
