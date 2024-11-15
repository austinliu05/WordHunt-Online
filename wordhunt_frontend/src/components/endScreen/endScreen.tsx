import React, { useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { SCORING, MAX_DISPLAYED_WORDS } from '../../utils/constants';
import { useWordContext } from '../../context/wordContext';
import { useGameContext } from '../../context/gameContext';
import { useNavigate } from 'react-router-dom';

const EndScreen: React.FC = () => {
    const { words: playerWords, cpuWords: opponentWords} = useWordContext();
    const { currentPlayerScore, opponentPlayerScore, goToStartScreen} = useGameContext();
    const navigate = useNavigate();

    const navigateToGame = () => {
        goToStartScreen();
        navigate('/');
    };
    const getSortedWordsWithPoints = (words: string[]) =>
        words
            .sort((a, b) => b.length - a.length || b.localeCompare(a))
            .map(word => [word, SCORING[word.length] || 0] as [string, number]);

    const playerWordsWithPoints = getSortedWordsWithPoints(playerWords);
    const displayedPlayerWords = playerWordsWithPoints.slice(0, MAX_DISPLAYED_WORDS);
    const remainingPlayerWords = playerWordsWithPoints.length - displayedPlayerWords.length;

    const opponentWordsWithPoints = getSortedWordsWithPoints(opponentWords || []);
    const displayedOpponentWords = opponentWordsWithPoints.slice(0, MAX_DISPLAYED_WORDS);
    const remainingOpponentWords = opponentWordsWithPoints.length - displayedOpponentWords.length;

    return (
        <Container className="d-flex flex-column align-items-center text-light mt-5 mb-5 p-4 bg-dark rounded shadow">
            <Row className="w-100">
                <Col xs={12} md={6} className="p-3">
                    <div className="text-center mb-4 border-bottom border-light pb-2">
                        <h5 className="mb-2 fw-bold">PLAYER WORDS: {playerWords.length}</h5>
                        <h3 className="text-warning fw-bold">PLAYER SCORE: {currentPlayerScore}</h3>
                    </div>
                    <div className="word-list w-100">
                        {displayedPlayerWords.map(([word, score], index) => (
                            <Row key={index} className="align-items-center mb-2">
                                <Col
                                    xs={8}
                                    className="text-dark bg-warning d-flex justify-content-center align-items-center rounded fw-bold py-2 shadow-sm"
                                >
                                    {word.toUpperCase()}
                                </Col>
                                <Col xs={4} className="text-end fw-bold">
                                    {score}
                                </Col>
                            </Row>
                        ))}
                    </div>
                    {remainingPlayerWords > 0 && (
                        <Button variant="link" className="text-warning mt-3">
                            + {remainingPlayerWords} more
                        </Button>
                    )}
                </Col>

                <Col xs={12} md={6} className="p-3">
                    <div className="text-center mb-4 border-bottom border-light pb-2">
                        <h5 className="mb-2 fw-bold">CPU WORDS: {opponentWords.length}</h5>
                        <h3 className="text-warning fw-bold">CPU SCORE: {opponentPlayerScore}</h3>
                    </div>
                    <div className="word-list w-100">
                        {displayedOpponentWords.map(([word, score], index) => (
                            <Row key={index} className="align-items-center mb-2">
                                <Col
                                    xs={8}
                                    className="text-dark bg-warning d-flex justify-content-center align-items-center rounded fw-bold py-2 shadow-sm"
                                >
                                    {word.toUpperCase()}
                                </Col>
                                <Col xs={4} className="text-end fw-bold">
                                    {score}
                                </Col>
                            </Row>
                        ))}
                    </div>
                    {remainingOpponentWords > 0 && (
                        <Button variant="link" className="text-warning mt-3">
                            + {remainingOpponentWords} more
                        </Button>
                    )}
                </Col>
            </Row>

            <div className="mt-4 d-flex gap-2 w-100 justify-content-center">
                <Button variant="primary" onClick={navigateToGame} className="fw-bold">
                    Return to Start
                </Button>
            </div>
        </Container>
    );
};

export default EndScreen;
