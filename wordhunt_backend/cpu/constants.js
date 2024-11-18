const DIRECTIONS = [[1,0], [0,1], [-1,0], [0,-1], [1,1], [-1,-1], [1,-1], [-1,1]];

const LIMITED_PATHS = 350;

const EASY_LIMITED_DEPTH = 5;

const MEDIUM_LIMITED_DEPTH = 8;

const PREFIXES = ['a', 'be', 'de','dis','ex','in','mis','non','over','pre',
're','uni','with'];

const VOWELS = 'AEIOU';

const WORD_PRIORITY = 'SCPABTMRDEFGLHINOWVKJQYZXU';

module.exports = { DIRECTIONS, LIMITED_PATHS, EASY_LIMITED_DEPTH, MEDIUM_LIMITED_DEPTH, PREFIXES, VOWELS, WORD_PRIORITY };


