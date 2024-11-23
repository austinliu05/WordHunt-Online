const WORD_DISTRIBUTION = {
    A: 9, B: 4, C: 4, D: 6, E: 9, F: 4, G: 4,
    H: 4, I: 9, J: 2, K: 4, L: 4, M: 3, N: 6,
    O: 8, P: 4, Q: 1, R: 6, S: 6, T: 6, U: 4,
    V: 2, W: 2, X: 1, Y: 2, Z: 2
};

const BOARD_SIZE = 4;

const SCORING = {
    3: 100,
    4: 400,
    5: 800,
    6: 1400,
    7: 1800,
    8: 2200,
};

module.exports = { BOARD_SIZE, WORD_DISTRIBUTION, SCORING };
