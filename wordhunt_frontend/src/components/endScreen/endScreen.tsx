import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { SCORING, MAX_DISPLAYED_WORDS } from '../../utils/constants';
import { useWordContext } from '../../context/wordContext';
import { useGameContext } from '../../context/gameContext';

const EndScreen: React.FC = () => {
    const {words, } = useWordContext();
    const {currentPlayerScore, goToStartScreen} = useGameContext();
    const sortedWordsWithPoints: [string, number][] = words
        .sort((a, b) => b.length - a.length || b.localeCompare(a))
        .map(word => [word, SCORING[word.length] || 0]);

    const displayedWords = sortedWordsWithPoints.slice(0, MAX_DISPLAYED_WORDS);
    const remainingWords = sortedWordsWithPoints.length - displayedWords.length;

    return (
        <Container
            className="d-flex flex-column align-items-center text-light mt-5 mb-5 p-4 bg-dark rounded shadow"
            style={{ maxWidth: '350px' }} 
        >
            <div className="text-center mb-4 border-bottom border-light pb-2">
                <h5 className="mb-2 fw-bold">WORDS: {words.length}</h5>
                <h3 className="text-warning fw-bold">SCORE: {currentPlayerScore}</h3>
            </div>

            <div className="word-list w-100">
                {displayedWords.map(([word, score], index) => (
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

            {remainingWords > 0 && (
                <Button variant="link" className="text-warning mt-3">
                    + {remainingWords} more
                </Button>
            )}

            <div className="mt-4 d-flex gap-2 w-100 justify-content-center">
                <Button variant="primary" onClick={goToStartScreen} className="fw-bold">
                    Return to Start
                </Button>
            </div>
        </Container>
    );
};

export default EndScreen;
