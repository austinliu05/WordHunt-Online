const { findPathsFromPosition } = require('pathfinding');

// Load or define your dictionary of valid words
const dictionary = new Set(["apple", "banana", "cherry", "date", "fig", "grape"]);

/**
 * Searches for valid words from a starting position on the grid.
 * @param {Array<Array<string>>} grid - The letter grid.
 * @param {number} startX - Starting X position.
 * @param {number} startY - Starting Y position.
 * @returns {Array<string>} Array of found words.
 */
function searchWordsFromPosition(grid, startX, startY) {
    const foundWords = [];
    const paths = findPathsFromPosition(grid, startX, startY);

    for (const path of paths) {
        const word = pathToWord(grid, path);
        if (isValidWord(word)) {
            foundWords.push(word);
        }
    }

    return foundWords;
}

/**
 * Converts a path to a word based on grid coordinates.
 * @param {Array<Array<string>>} grid - The letter grid.
 * @param {Array<[number, number]>} path - Array of [x, y] coordinates.
 * @returns {string} The resulting word.
 */
function pathToWord(grid, path) {
    return path.map(([x, y]) => grid[x][y]).join('');
}

/**
 * Checks if a word is valid by looking it up in the dictionary.
 * @param {string} word - Word to check.
 * @returns {boolean} True if the word exists in the dictionary, otherwise false.
 */
function isValidWord(word) {
    return dictionary.has(word);
}

// Export functions
module.exports = { searchWordsFromPosition, pathToWord, isValidWord };
