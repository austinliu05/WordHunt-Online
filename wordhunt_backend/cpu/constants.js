const DIRECTIONS = [[1,0], [0,1], [-1,0], [0,-1], [1,1], [-1,-1], [1,-1], [-1,1]];

const LIMITED_PATHS = 200;

const EASY_LIMITED_DEPTH = 5;

const MEDIUM_LIMITED_DEPTH = 8;

const PREFIXES = ['a', 'be', 'de','dis','ex','in','mis','non','over','pre',
're','uni','with'];
const SCORING = {
    3: 100,
    4: 400,
    5: 800,
    6: 1400,
    7: 1800,
    8: 2200,
};

const VOWELS = 'AEIOU';

const WORD_PRIORITY = 'SCPABTMRDEFGLHINOWVKJQYZXU';

module.exports = { DIRECTIONS, EASY_LIMITED_PATHS, EASY_LIMITED_DEPTH, PREFIXES, VOWELS, WORD_PRIORITY };


