// Scoring values based on word length
export const SCORING: { [key: number]: number } = {
    3: 100,
    4: 400,
    5: 800,
    6: 1400,
    7: 1800,
    8: 2200,
};

// Maximum number of words to display in the EndScreen component
export const MAX_DISPLAYED_WORDS = 10;

// Number of rows for the board
export const BOARD_SIZE = 4;

export const TIMER_LENGTH = 90;

export const WORD_DISTRIBUTION: { [letter: string]: number } = {
    A: 9, B: 4, C: 4, D: 6, E: 9, F: 4, G: 4,
    H: 4, I: 9, J: 2, K: 4, L: 4, M: 3, N: 6,
    O: 8, P: 4, Q: 1, R: 6, S: 6, T: 6, U: 4,
    V: 2, W: 2, X: 1, Y: 2, Z: 2
};