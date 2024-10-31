import { send } from "process";
import { sendBoard } from "../api/api";

const scrabbleDistribution: { [letter: string]: number } = {
    A: 9, B: 4, C: 4, D: 6, E: 9, F: 4, G: 4,
    H: 4, I: 9, J: 2, K: 4, L: 4, M: 3, N: 6,
    O: 8, P: 4, Q: 1, R: 6, S: 6, T: 6, U: 4,
    V: 2, W: 2, X: 1, Y: 2, Z: 2
};

/**
 * Utility function to create the letter pool based on Scrabble distribution.
 * @returns {string[]} A flat array containing all letters based on their frequency.
 */
const createLetterPool = (): string[] => {
    const pool: string[] = [];
    Object.entries(scrabbleDistribution).forEach(([letter, count]) => {
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

    // If more than two consonant neighbor exists, it's invalid.
    return consonantCount < 2;
};

/**
 * Generates a 2D board with random letters from the Scrabble letter pool,
 * ensuring no large groups of consonants are formed.
 * @param {number} rows - Number of rows.
 * @param {number} cols - Number of columns.
 * @returns {string[][]} - A 2D array representing the board.
 */
export const generateBoard = (rows: number, cols: number): string[][] => {
    const board: string[][] = [];
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
            if (randomLetter in addedLetters) {
                addedLetters[randomLetter] += 1;
            } else {
                addedLetters[randomLetter] = 1;
            }

            row.push(randomLetter);
        }
        board.push(row);
    }
    sendBoard({ board: board });
    return board;
};