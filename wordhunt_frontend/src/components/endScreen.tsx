import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { SCORING, MAX_DISPLAYED_WORDS } from '../utils/constants';

interface EndScreenProps {
    words: string[];
    totalScore: number;
    goToStartScreen: () => void;
    goToLeaderboard: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ words, totalScore, goToStartScreen, goToLeaderboard }) => {
    const sortedWordsWithPoints: [string, number][] = words
        .sort((a, b) => b.length - a.length || b.localeCompare(a))
        .map(word => [word, SCORING[word.length] || 0]);

    const displayedWords = sortedWordsWithPoints.slice(0, MAX_DISPLAYED_WORDS);
    const remainingWords = sortedWordsWithPoints.length - displayedWords.length;

    return (
        <Container
            className="d-flex flex-column align-items-center text-light mt-5"
            style={{ backgroundColor: '#2c5f2d', padding: '2rem', borderRadius: '8px', width: '300px' }}
        >
            <div className="mb-4 text-center">
                <h5>WORDS: {words.length}</h5>
                <h5>SCORE: {totalScore}</h5>
            </div>

            <div className="word-list w-100">
                {displayedWords.map(([word, score], index) => (
                    <Row key={index} className="mb-2">
                        <Col
                            xs={8}
                            className="text-dark bg-warning d-flex justify-content-center align-items-center"
                            style={{ borderRadius: '4px', fontWeight: 'bold', padding: '5px' }}
                        >
                            {word.toUpperCase()}
                        </Col>
                        <Col xs={4} className="text-end">{score}</Col>
                    </Row>
                ))}
            </div>

            {remainingWords > 0 && (
                <Button variant="link" className="text-warning mt-3" onClick={() => alert("Show all words feature coming soon!")}>
                    + {remainingWords} more
                </Button>
            )}
            <div className="mt-4 d-flex gap-2">
                <Button variant="primary" onClick={goToStartScreen}>Return to Start</Button>
                {/* <Button variant="secondary" onClick={goToLeaderboard}>Go to Leaderboard</Button> */}
            </div>
        </Container>
    );
};

export default EndScreen;
