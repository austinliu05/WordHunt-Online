import React from 'react';
import tutorialImage from '../assets/images/tutorial.png';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StartScreen: React.FC = () => {
    const navigate = useNavigate();

    const navigateToDifficulty = () => {
        navigate('/difficulty');
    };
    const navigateToMultiplayer = () => {
        navigate('/lobby');
    };
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-50 p-3">
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
            <div className='d-flex'>
                <Button className='m-2' variant="primary" size="lg" onClick={navigateToDifficulty}>
                    Singleplayer
                </Button>
                {/* <Button className='m-2' variant="primary" size="lg" onClick={navigateToMultiplayer}>
                    Multiplayer
                </Button> */}
            </div>
        </Container>
    );
};

export default StartScreen;
