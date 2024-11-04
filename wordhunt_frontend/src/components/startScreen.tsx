import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import tutorialImage from '../assets/images/tutorial.png';

interface StartScreenProps {
    onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-50 pb-3">
            <h1 className="mt-5">WordHunt Online</h1>
            <p className="text-center text-muted mb-3">
                Connect letters together by dragging your mouse/finger. Make as many words as possible.
            </p>

            <Row className="justify-content-center mb-4">
                <Col xs={8} sm={6} md={4} lg={3}>
                    <img
                        src={tutorialImage}
                        alt="Tutorial"
                        className="img-fluid" 
                    />
                </Col>
            </Row>

            <Button variant="primary" size="lg" onClick={onStart}>
                Start Game
            </Button>
        </Container>
    );
};

export default StartScreen;
