const queue = [];

function addToQueue(playerId) {
    if (!queue.includes(playerId)) {
        queue.push(playerId);
    }
}

function removeFromQueue() {
    return queue.shift();
}

function getQueueSize() {
    return queue.length;
}

module.exports = { addToQueue, removeFromQueue, getQueueSize };
