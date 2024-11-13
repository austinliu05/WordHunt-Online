function checkBounds(x,y,dimension) {
    if (x < 0 || x >= dimension || y < 0 || y >= dimension){
        return false;
    }
    return true;
}

function randomGenerate(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { checkBounds, randomGenerate };
