import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { SCORING, MAX_DISPLAYED_WORDS } from '../../../utils/constants';
import { useLocation } from 'react-router-dom';
import ReturnHomeButton from './ReturnHomeButton';
import WinPopup from './WinPopup';
import LosePopup from './LosePopup';

const MultiplayerEndScreen: React.FC = () => {
    const location = useLocation();
    const { players, playerId } = location.state || { players: {}, playerId: '' };
    const currentPlayerData = players[playerId] || { score: 0, words: [] };
    const opponentPlayerId = Object.keys(players).find((id) => id !== playerId);
    const opponentPlayerData = players[opponentPlayerId || ''] || { score: 0, words: [] };

    const [showWinPopup, setShowWinPopup] = useState<boolean>(false);
    const [showLosePopup, setShowLosePopup] = useState<boolean>(false);
    
    useEffect(() => {
        if (currentPlayerData.score > opponentPlayerData.score) {
            setShowWinPopup(true);
            setShowLosePopup(false);
        } else {
            setShowWinPopup(false);
            setShowLosePopup(true);
        }
    }, [currentPlayerData.score, opponentPlayerData.score]);

    const getSortedWordsWithPoints = (words: string[]) =>
        words
            .sort((a, b) => b.length - a.length || b.localeCompare(a))
            .map(word => [word, SCORING[word.length] || 0] as [string, number]);

    const playerWordsWithPoints = getSortedWordsWithPoints(currentPlayerData.words);
    const displayedPlayerWords = playerWordsWithPoints.slice(0, MAX_DISPLAYED_WORDS);
    const remainingPlayerWords = playerWordsWithPoints.length - displayedPlayerWords.length;

    const opponentWordsWithPoints = getSortedWordsWithPoints(opponentPlayerData.words);
    const displayedOpponentWords = opponentWordsWithPoints.slice(0, MAX_DISPLAYED_WORDS);
    const remainingOpponentWords = opponentWordsWithPoints.length - displayedOpponentWords.length;

    return (
        <Container className="d-flex flex-column align-items-center text-light mt-5 mb-5 bg-dark p-4 rounded shadow" style={{ maxWidth: '80vw' }}>
            {showWinPopup && <WinPopup />}
            {showLosePopup && <LosePopup />}
            <Row className="w-100">
                <Col xs={12} md={6} className="p-5">
                    <div className="text-center mb-4 border-bottom border-light pb-2">
                        <h5 className="mb-2 fw-bold">PLAYER WORDS: {currentPlayerData.words.length}</h5>
                        <h3 className="text-warning fw-bold">PLAYER SCORE: {currentPlayerData.score}</h3>
                    </div>
                    <div className="word-list w-100">
                        {displayedPlayerWords.map(([word, score], index) => (
                            <Row key={index} className="align-items-center mb-2">
                                <Col
                                    xs={8}
                                    className="text-dark bg-warning d-flex justify-content-center align-items-center rounded fw-bold"
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
                        <Button variant="link" className="text-warning mt-3 no-hover">
                            + {remainingPlayerWords} more
                        </Button>
                    )}
                </Col>

                <Col xs={12} md={6} className="p-5">
                    <div className="text-center mb-4 border-bottom border-light pb-2">
                        <h5 className="mb-2 fw-bold">OPPONENT WORDS: {opponentPlayerData.words.length}</h5>
                        <h3 className="text-warning fw-bold">OPPONENT SCORE: {opponentPlayerData.score}</h3>
                    </div>
                    <div className="word-list w-100">
                        {displayedOpponentWords.map(([word, score], index) => (
                            <Row key={index} className="align-items-center mb-2">
                                <Col
                                    xs={8}
                                    className="text-dark bg-warning d-flex justify-content-center align-items-center rounded fw-bold"
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
                        <Button variant="link" className="text-warning mt-3 no-hover">
                            + {remainingOpponentWords} more
                        </Button>
                    )}
                </Col>
            </Row>
            <div className="mt-4 d-flex gap-2 w-75 justify-content-center">
                <ReturnHomeButton />
            </div>
        </Container>
    );
};

export default MultiplayerEndScreen;
