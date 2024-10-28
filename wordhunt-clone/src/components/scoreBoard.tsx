import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

interface ScoreboardProps {
    score: number
}

const Scoreboard: React.FC<ScoreboardProps> = ({score}) => {
    return (
        <Navbar bg='dark' variant='dark'>
            <Container className='justify-content-center'>
                <Navbar.Text className='fs-4 text-white'>
                    Score: {score.toString()}
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default Scoreboard;