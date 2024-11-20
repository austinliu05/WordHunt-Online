const { DIRECTIONS, VOWELS, WORD_PRIORITY, ALPHA, BETA, GAMMA, WORD_PREFIXES} = require('./constants');

/**
 * Checks if given coordinates are within the bounds of a specified dimension.
 * @param {number} x - The x-coordinate to check.
 * @param {number} y - The y-coordinate to check.
 * @param {number} dimension - The boundary limit for x and y (assumes a square grid).
 * @returns {boolean} True if coordinates are within bounds, false otherwise.
 */
function checkBounds(x, y, dimension) {
    if (x < 0 || x >= dimension || y < 0 || y >= dimension) {
        return false;
    }
    return true;
}

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 * @param {number} min - The minimum integer value.
 * @param {number} max - The maximum integer value.
 * @returns {number} A random integer between min and max, inclusive.
 */
function randomGenerate(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Checks if a word or prefix exists in the trie.
 * @param {string} word - The word or prefix to search for.
 * @param {Object} trie - The root node of the trie data structure.
 * @returns {Object} An object containing `isWord` and `isPrefix` flags.
 *                   - `isWord`: true if the exact word exists in the trie.
 *                   - `isPrefix`: true if the word is a valid prefix in the trie.
 */
function checkWordOrPrefixInTrie(word, trie) {
    let currentNode = trie;

    for (let char of word) {
        if (!currentNode.children || !(char in currentNode.children)) {
            return { isWord: false, isPrefix: false }; // Not a valid word or prefix
        }
        currentNode = currentNode.children[char];
    }

    return {
        isWord: currentNode.isWord === true, // True if this is a complete word
        isPrefix: true                       // True because we reached this point without breaking
    };
}

/**
 * A custom heuristic that assigns each tile a custom value before returning a list of prioritized tiles.
 * @param {string[][]} board - The board.
 * @returns {Array<number>} A list of tiles in order of priority. 
 */
function heuristic(board) {
    const n = board.length
    let evaluations = [];
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            let evaluation = 0;
            evaluation += countVowels(board, i, j);
            evaluation += letterPriority(board[i][j]);
            evaluation += countPrefix(board, i, j);
            evaluations.push({ index: { row: i, col: j}, letter: board[i][j], score: evaluation});
        }
    }
    console.log("Heuristic evaluations: ", evaluations);
    return evaluations.sort((a,b) => b.score - a.score).map(e => e.index);
}

function countVowels(board, x, y){
    const n = board.length
    let vowelCount = 0
    DIRECTIONS.forEach(function(element){
        const [r,c] = element;
        if (checkBounds(x + r, y + c, n) ){
            vowelCount++;
        }
    });
    return ALPHA * vowelCount;
}

function letterPriority(letter){
    return BETA * WORD_PRIORITY.indexOf(letter);
}

function countPrefix(board, x, y){
    const n = board.length
    let prefixCount = 0
    DIRECTIONS.forEach(function(element){
        const [r,c] = element;
        if (checkBounds(x + r, y + c, n) && WORD_PREFIXES.has(board[x][y] + board[x + r][y + c])){
            prefixCount++;
        }
    });
    return GAMMA * prefixCount;
}

/**
 * Checks if there is an 's' in any adjacent tile around the given coordinates.
 *
 * @param {string[][]} board - The board as a 2D array of letters.
 * @param {number} x - The x-coordinate of the current tile.
 * @param {number} y - The y-coordinate of the current tile.
 * @param {Array<Array<number>>} directions - The directions to check for neighbors.
 * @returns {Object} An object containing:
 *                   - `found`: boolean indicating if an 's' was found.
 *                   - `coordinates`: the [r, c] coordinates of the found 's' or null if none was found.
 */
function checkForS(board, x, y, directions) {
    const n = board.length; // Assumes a square grid
    for (let [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (checkBounds(nx, ny, n) && board[nx][ny] === 's') {
            return { found: true, coordinates: [nx, ny] }; // Found an 's'
        }
    }
    return { found: false, coordinates: null }; // No 's' found
}

module.exports = { checkBounds, randomGenerate, checkWordOrPrefixInTrie, heuristic, checkForS };
