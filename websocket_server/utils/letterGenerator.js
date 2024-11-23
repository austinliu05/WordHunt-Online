const { WORD_DISTRIBUTION } = require("./constants");

/**
 * Utility function to create the letter pool based on Scrabble distribution.
 * @returns {string[]} A flat array containing all letters based on their frequency.
 */
function createLetterPool(){
    const pool = [];
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
function isConsonant (letter) {
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
function isValidPlacement (board, row, col, letter) {
    if (!isConsonant(letter)) return true;

    const checkConsonant = (r, c) =>
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
function generateBoard (rows, cols) {
    let board;
    let vowelsCount;

    do {
        board = [];
        vowelsCount = 0;
        const addedLetters = {};

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                let randomLetter;
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
    } while (vowelsCount < 3); // Regenerate the board if fewer than 3 vowels

    return board;
};

module.exports = { generateBoard };
