// utils/letterGenerator.ts

const scrabbleDistribution: { [letter: string]: number } = {
    A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3,
    H: 2, I: 9, J: 1, K: 1, L: 4, M: 2, N: 6,
    O: 8, P: 2, Q: 1, R: 6, S: 4, T: 6, U: 4,
    V: 2, W: 2, X: 1, Y: 2, Z: 1
};

/**
 * Creates a pool of letters based on Scrabble distribution.
 * @returns {string[]} An array containing all letters based on their frequency.
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
 * Generates a 2D board with random letters from the Scrabble letter pool.
 * @param {number} rows - Number of rows.
 * @param {number} cols - Number of columns.
 * @returns {string[][]} - A 2D array representing the board.
 */
export const generateBoard = (rows: number, cols: number): string[][] => {
    const board: string[][] = [];
    for (let i = 0; i < rows; i++) {
        const row: string[] = [];
        for (let j = 0; j < cols; j++) {
            const randomIndex = Math.floor(Math.random() * letterPool.length);
            row.push(letterPool[randomIndex]);
        }
        board.push(row);
    }
    return board;
};
