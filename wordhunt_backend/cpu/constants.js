const ALPHA = 2.5;

const BETA = 1.0;

const DIRECTIONS = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]];

const LIMITED_PATHS = 400;

const EASY_LIMITED_DEPTH = 5;

const GAMMA = 6.0;

const MEDIUM_LIMITED_DEPTH = 8;

const VOWELS = 'aeio';

const WORD_PRIORITY = 'estrainolchdpbmfgwykvjqxzu';

const WORD_PREFIXES = new Set([
    're', 'un', 'in', 'de', 'en', 'an', 'ex',
    'be', 'co', 'di', 'im', 'pr', 'tr'
]);

module.exports = { ALPHA, BETA, GAMMA, WORD_PREFIXES, DIRECTIONS, LIMITED_PATHS, EASY_LIMITED_DEPTH, MEDIUM_LIMITED_DEPTH, VOWELS, WORD_PRIORITY };


