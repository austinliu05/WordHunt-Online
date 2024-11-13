const { DIRECTIONS, EASY_LIMITED_PATHS, EASY_LIMITED_DEPTH } = require('./constants');
const {checkBounds, randomGenerate} = require('./utils')
/**
 * Main function to handle game logic by combining word search and difficulty-specific pathfinding.
 * @param {Array<Array<string>>} board - 2D array representing the board, with each element being a letter.
 * @param {string} difficulty - Difficulty level, which affects the pathfinding algorithm.
 * @returns {Object} Result containing paths and words found on the board.
 */
function processGameBoard(board, difficulty) {
    let paths;

    if (difficulty === 'easy') {
        paths = easyFindPaths(board);
    } else if (difficulty === 'medium') {
        paths = mediumFindPaths(board);
    } else if (difficulty === 'hard') {
        paths = hardFindPaths(board);
    } else {
        throw new Error('Invalid difficulty level');
    }
    return paths;
}

/**
 * Finds paths on the board for the "easy" difficulty level. This is a blind search, a simple DFS that randomly builds possible words.
 * @param {Array<Array<string>>} board - 2D array representing the board.
 * @returns {Array<Array<[number, number]>>} Array of paths, where each path is an array of [x, y] coordinates.
 */
function easyFindPaths(board) {
    let max = board.length;
    let min = 0;
    let pathCount = 0;
    let paths = [];
    while (pathCount < EASY_LIMITED_PATHS) {
        let i = randomGenerate(min, max);
        let j = randomGenerate(min, max);
        let visited = new Set();
        let words = new Set();
        function dfs(x,y,depth,word){
            if (words.size >= 20) {
                return;
            }
            if (!words.has(word)){
                console.log(word)
                words.add(word);
                paths.push(word);
                pathCount++;
            }
            if (!checkBounds(x,y,max) || visited.has(`${x},${y}`) || depth == 0){
                return 
            }
            visited.add(`${x},${y}`);
            let newWord = word + board[x][y];
            for (let i = 0; i < DIRECTIONS.length; i++){
                const [r,c] = DIRECTIONS[i];
                dfs(x + r, y + c, depth - 1, newWord);
            }
            visited.delete(`${x},${y}`);
        }
        dfs(i,j,EASY_LIMITED_DEPTH,"")
    }
    return paths;
}

/**
 * Finds paths on the board for the "medium" difficulty level. This is a greedy approach where the CPU takes the optimal decision every time. (e.g. prioritizing vowels, prioritizing common prefixes)
 * @param {Array<Array<string>>} board - 2D array representing the board.
 * @returns {Array<Array<[number, number]>>} Array of paths, where each path is an array of [x, y] coordinates.
 */
function mediumFindPaths(board) {
    return []; // Placeholder return for paths on "medium" difficulty
}

/**
 * Finds paths on the board for the "hard" difficulty level.
 * @param {Array<Array<string>>} board - 2D array representing the board.
 * @returns {Array<Array<[number, number]>>} Array of paths, where each path is an array of [x, y] coordinates.
 */
function hardFindPaths(board) {
    return []; // Placeholder return for paths on "hard" difficulty
}

module.exports = { processGameBoard };
