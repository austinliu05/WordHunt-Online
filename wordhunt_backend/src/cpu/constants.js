const WORD_PRIORITY = 'SCPABTMRDEFGLHINOWVKJQYZXU';

const SCORING = {
    3: 100,
    4: 400,
    5: 800,
    6: 1400,
    7: 1800,
    8: 2200,
};

const directions = [[1,0], [0,1], [-1,0], [0,-1], [1,1], [-1,-1], [1,-1], [-1,1]];