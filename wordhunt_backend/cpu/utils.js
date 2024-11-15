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

module.exports = { checkBounds, randomGenerate, checkWordOrPrefixInTrie };
