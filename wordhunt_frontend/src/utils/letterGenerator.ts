import { WORD_DISTRIBUTION } from "./constants";

/**
 * Utility function to create the letter pool based on Scrabble distribution.
 * @returns {string[]} A flat array containing all letters based on their frequency.
 */
const createLetterPool = (): string[] => {
    const pool: string[] = [];
    Object.entries(WORD_DISTRIBUTION).forEach(([letter, count]) => {
        for (let i = 0; i < count; i++) {
            pool.push(letter);
        }
    });
    return pool;
};

const letterPool = createLetterPool();

/**
 * Checks if a given letter is a consonant.
 * @param {string} letter - The letter to check.
 * @returns {boolean} True if the letter is a consonant, otherwise false.
 */
const isConsonant = (letter: string): boolean => {
    return !['A', 'E', 'I', 'O', 'U'].includes(letter);
};

/**
 * Validates if placing a new letter will not create a large group of consonants.
 * @param {string[][]} board - The current state of the board.
 * @param {number} row - The row index where the letter will be placed.
 * @param {number} col - The column index where the letter will be placed.
 * @param {string} letter - The letter to place.
 * @returns {boolean} True if the placement is valid, otherwise false.
 */
const isValidPlacement = (board: string[][], row: number, col: number, letter: string): boolean => {
    if (!isConsonant(letter)) return true;

    const checkConsonant = (r: number, c: number) =>
        board[r]?.[c] && isConsonant(board[r][c]);

    let consonantCount = 0;

    // Check above and below.
    if (checkConsonant(row - 1, col)) consonantCount++;
    if (checkConsonant(row + 1, col)) consonantCount++;

    // Check left and right.
    if (checkConsonant(row, col - 1)) consonantCount++;
    if (checkConsonant(row, col + 1)) consonantCount++;

    // If more than two consonant neighbors exist, it's invalid.
    return consonantCount < 2;
};

/**
 * Generates a 2D board with random letters from the Scrabble letter pool,
 * ensuring no large groups of consonants are formed.
 * If the board contains fewer than 4 vowels, it regenerates until the condition is met.
 * @param {number} rows - Number of rows.
 * @param {number} cols - Number of columns.
 * @returns {string[][]} - A 2D array representing the board.
 */
export const generateBoard = (rows: number, cols: number): string[][] => {
    let board: string[][];
    let vowelsCount: number;

    do {
        board = [];
        vowelsCount = 0;
        const addedLetters: { [key: string]: number } = {};

        for (let i = 0; i < rows; i++) {
            const row: string[] = [];
            for (let j = 0; j < cols; j++) {
                let randomLetter: string;
                let validPlacement = false;

                // Keep trying until we get a valid letter placement.
                do {
                    const randomIndex = Math.floor(Math.random() * letterPool.length);
                    randomLetter = letterPool[randomIndex];

                    const maxReached = addedLetters[randomLetter] && addedLetters[randomLetter] >= 3;
                    validPlacement = !maxReached && isValidPlacement(board, i, j, randomLetter);
                } while (!validPlacement);

                // Track the usage of the letter.
                addedLetters[randomLetter] = (addedLetters[randomLetter] || 0) + 1;

                // Track the number of vowels
                if (!isConsonant(randomLetter)) {
                    vowelsCount += 1;
                }

                row.push(randomLetter);
            }
            board.push(row);
        }
    } while (vowelsCount < 4); // Regenerate the board if fewer than 4 vowels

    return board;
};