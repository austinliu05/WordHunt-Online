const { DIRECTIONS, EASY_LIMITED_PATHS, EASY_LIMITED_DEPTH } = require('./constants');
const { checkBounds, randomGenerate, checkWordOrPrefixInTrie } = require('./utils');
const trie = require('../wordhunt_dictionary_script/trie_dictionary/trie_dictionary.json');

/**
 * Processes the game board to find valid word paths based on the selected difficulty level.
 * 
 * This function takes a 2D board of letters and searches for word paths while applying 
 * difficulty-specific constraints and algorithms. Words are validated against a trie dictionary.
 * 
 * @param {Array<Array<string>>} board - 2D array representing the game board, with each element being a single letter.
 * @param {string} difficulty - The difficulty level of the game ('easy', 'medium', or 'hard').
 * @returns {Object} An object containing word paths, where keys are words and values are arrays of [x, y] coordinates.
 * @throws {Error} Throws an error if the difficulty level is invalid.
 */
function processGameBoard(board, difficulty) {
    let paths;
    const lowerCaseBoard = board.map(row => row.map(cell => cell.toLowerCase()));

    if (difficulty === 'easy' || difficulty === 'medium') {
        paths = genericFindPaths(lowerCaseBoard);
    } else if (difficulty === 'hard') {
        paths = hardFindPaths(lowerCaseBoard);
    } else {
        throw new Error('Invalid difficulty level');
    }
    return paths;
}

/**
 * Performs a depth-first search (DFS) to find valid word paths on the board for "easy" and "medium" difficulties.
 * 
 * The search starts at random positions on the board and uses a trie dictionary to validate words
 * and prune invalid paths. Words must be at least three letters long to be considered valid.
 * 
 * @param {Array<Array<string>>} board - 2D array representing the game board.
 * @returns {Object} An object where keys are words and values are arrays of [x, y] coordinates representing paths.
 */
function genericFindPaths(board) {
    const max = board.length;
    const min = 0;
    let pathCount = 0;
    let paths = {};
    while (pathCount < EASY_LIMITED_PATHS) {
        const i = randomGenerate(min, max);
        const j = randomGenerate(min, max);
        const visited = new Set();
        const words = new Set();

        /**
         * Recursive depth-first search to explore all possible paths for valid words.
         * 
         * @param {number} x - The row index of the current cell.
         * @param {number} y - The column index of the current cell.
         * @param {number} depth - Remaining depth allowed for the current path.
         * @param {string} word - The word constructed so far along the path.
         * @param {Array<[number, number]>} path - The current path of [x, y] coordinates.
         */
        function dfs(x, y, depth, word, path) {
            if (!checkBounds(x, y, max) || visited.has(`${x},${y}`) || depth === 0) {
                return;
            }

            const newWord = word + board[x][y];
            const { isWord, isPrefix } = checkWordOrPrefixInTrie(newWord, trie);

            if (!isPrefix) {
                return;
            }

            if (isWord && !words.has(newWord) && newWord.length > 2) {
                words.add(newWord);
                paths[newWord] = [...path, [x, y]];
                pathCount++;
            }

            visited.add(`${x},${y}`);
            path.push([x, y]);
            for (let k = 0; k < DIRECTIONS.length; k++) {
                const [r, c] = DIRECTIONS[k];
                dfs(x + r, y + c, depth - 1, newWord, path);
            }
            path.pop();
            visited.delete(`${x},${y}`);
        }

        dfs(i, j, EASY_LIMITED_DEPTH, "", []);
    }
    return paths;
}

/**
 * Placeholder function for implementing the pathfinding algorithm for the "hard" difficulty level.
 * 
 * The "hard" difficulty will involve more advanced pathfinding logic, potentially with 
 * different constraints or heuristics for word selection.
 * 
 * @param {Array<Array<string>>} board - 2D array representing the game board.
 * @returns {Object} An object where keys are words and values are arrays of [x, y] coordinates representing paths.
 */
function hardFindPaths(board) {
    return {}; // Placeholder return for paths on "hard" difficulty
}

module.exports = { processGameBoard };
