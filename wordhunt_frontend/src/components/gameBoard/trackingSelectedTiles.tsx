import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { SCORING } from '../../utils/constants';
import { validateWord } from '../../utils/validateWord';

interface Tile {
    row: number;
    col: number;
    letter: string;
    x: number;
    y: number;
}

interface SelectedTilesProps {
    selectedTiles: Tile[];
    usedWords: string[];
    selectedColor: string;
    isValidWord: boolean;
}

const TrackingSelectedTiles: React.FC<SelectedTilesProps> = ({ selectedTiles, usedWords, selectedColor, isValidWord }) => {
    const currentWord = selectedTiles.map(tile => tile.letter).join('');
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const checkValidity = async () => {
            if (currentWord.length > 2 && !usedWords.includes(currentWord)) {
                const isValid = await validateWord(currentWord);
                const wordPoints = isValid ? SCORING[currentWord.length] || 0 : 0;
                setPoints(wordPoints);
            } else {
                setPoints(0);
            }
        };

        checkValidity();
    }, [currentWord, usedWords]);

    return (
        <div className="position-relative mb-5" style={{ height: '30px' }}>
            {currentWord.length > 0 && (
                <Alert
                    className="text-center position-absolute start-50 translate-middle-x"
                    style={{
                        width: '200px',
                        backgroundColor: selectedColor === 'green' ? 'rgb(91, 243, 84)' : selectedColor === 'yellow' ? 'rgb(255, 244, 43)' : 'white',
                        color:'#000000',
                        fontWeight: 'bold',
                        border: '2px solid black',
                    }}
                >
                    {currentWord} {isValidWord && points > 0 && `(+${points})`}
                </Alert>
            )}
        </div>
    );
};

export default TrackingSelectedTiles;
