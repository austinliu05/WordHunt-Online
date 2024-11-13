const exampleGrid = [
    ['A', 'B', 'C', 'D'],
    ['E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'P']
];

/**
 * Finds all paths from a given starting position on the grid.
 * @param {Array<Array<string>>} grid - The letter grid.
 * @param {number} startX - Starting X position.
 * @param {number} startY - Starting Y position.
 * @returns {Array<Array<[number, number]>>} Array of paths, each path is an array of [x, y] coordinates.
 */
function findPathsFromPosition(grid, startX, startY) {
    // Skeleton for pathfinding logic
    const paths = [];
    
    // Implement recursive or iterative DFS/BFS to find all paths here

    return paths;
}

/**
 * Checks if a given coordinate is within grid bounds.
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {Array<Array<string>>} grid - The letter grid.
 * @returns {boolean} True if within bounds, otherwise false.
 */
function isInBounds(x, y, grid) {
    return x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;
}

/**
 * Retrieves all valid neighboring cells for a given position.
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {Array<Array<string>>} grid - The letter grid.
 * @returns {Array<[number, number]>} Array of valid neighboring coordinates.
 */
function getNeighbors(x, y, grid) {
    const directions = [
        [0, 1], [1, 0], [0, -1], [-1, 0], // Cardinal directions
        [-1, -1], [-1, 1], [1, -1], [1, 1] // Diagonals
    ];
    
    const neighbors = directions
        .map(([dx, dy]) => [x + dx, y + dy])
        .filter(([nx, ny]) => isInBounds(nx, ny, grid));
    
    return neighbors;
}

// Export functions
module.exports = { findPathsFromPosition, isInBounds, getNeighbors };
