const { DIRECTIONS, LIMITED_PATHS, EASY_LIMITED_DEPTH, MEDIUM_LIMITED_DEPTH } = require('./constants');
const {checkBounds, randomGenerate, checkWordOrPrefixInTrie, heuristic} = require('./utils')
const trie = require('../wordhunt_dictionary_script/trie_dictionary/trie_dictionary.json');
/**
 * Main function to handle game logic by combining word search and difficulty-specific pathfinding.
 * @param {Array<Array<string>>} board - 2D array representing the board, with each element being a letter.
 * @param {string} difficulty - Difficulty level, which affects the pathfinding algorithm.
 * @returns {Object} Result containing paths and words found on the board.
 */
function processGameBoard(board, difficulty) {
    let paths;
    const lowerCaseBoard = board.map(row => row.map(cell => cell.toLowerCase()));

    if (difficulty === 'easy') {
        paths = easyFindPaths(lowerCaseBoard);
    } else if (difficulty === 'medium') {
        paths = mediumFindPaths(lowerCaseBoard);
    } else if (difficulty === 'hard') {
        paths = hardFindPaths(lowerCaseBoard);
    } else {
        throw new Error('Invalid difficulty level');
    }
    return paths;
}

/**
 * Finds paths on the board for the "easy" difficulty level. Uses trie to prune search paths.
 * @param {Array<Array<string>>} board - 2D array representing the board.
 * @returns {Array<Array<[number, number]>>} Array of paths, where each path is an array of [x, y] coordinates.
 */
function easyFindPaths(board) {
    const max = board.length;
    const min = 0;
    let pathCount = 0;
    let paths = {};
    while (pathCount < LIMITED_PATHS) {
        const i = randomGenerate(min, max);
        const j = randomGenerate(min, max);
        const visited = new Set();
        const words = new Set();

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
                paths[newWord] = [...path, [x,y]];
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
 * Finds paths on the board for the "medium" difficulty level. This is a greedy approach where the CPU takes the optimal decision every time. (e.g. prioritizing vowels, prioritizing common prefixes)
 * @param {Array<Array<string>>} board - 2D array representing the board.
 * @returns {Array<Array<[number, number]>>} Array of paths, where each path is an array of [x, y] coordinates.
 */
function mediumFindPaths(board) {
    const max = board.length;
    const min = 0;
    let pathCount = 0;
    let paths = {};
    while (pathCount < LIMITED_PATHS) {
        const i = randomGenerate(min, max);
        const j = randomGenerate(min, max);
        const visited = new Set();
        const words = new Set();

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
                paths[newWord] = [...path, [x,y]];
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

        dfs(i, j, MEDIUM_LIMITED_DEPTH, "", []);
    }
    return paths;
}

/**
 * Finds paths on the board for the "hard" difficulty level.
 * @param {Array<Array<string>>} board - 2D array representing the board.
 * @returns {Object} Result containing words and their corresponding paths, sorted by word length.
 */
function hardFindPaths(board) {
    const max = board.length;
    let pathCount = 0;
    let paths = {};
    const idealStartPositions = heuristic(board);
    const visited = new Set();
    const words = new Set();

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

    for (let pos of idealStartPositions) {
        if (pathCount >= LIMITED_PATHS) break;
        const { row, col } = pos;
        dfs(row, col, MEDIUM_LIMITED_DEPTH, "", []);
    }

    const sortedPaths = Object.entries(paths)
        .sort((a, b) => b[0].length - a[0].length)
        .reduce((sorted, [word, path]) => {
            sorted[word] = path;
            return sorted;
        }, {});

    return sortedPaths;
}

module.exports = { processGameBoard };