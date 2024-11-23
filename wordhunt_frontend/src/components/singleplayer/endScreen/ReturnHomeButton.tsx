import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../../context/gameContext';
import { disconnectSocket } from '../../../utils/websocket';

const ReturnHomeButton: React.FC = () => {
    const { goToStartScreen } = useGameContext();
    const navigate = useNavigate();

    const goBack = () =>{
        navigate('/');
        goToStartScreen();
        disconnectSocket();
    }
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Button
                className="w-50 text-white"
                style={{
                    backgroundColor: 'red',
                    border: 'none',       
                    boxShadow: 'none',     
                }}
                onClick={goBack}
            >
                Return Home
            </Button>
        </Container>
    );
};

export default ReturnHomeButton;
