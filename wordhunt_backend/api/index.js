const express = require('express');
const serverless = require('serverless-http');
const { processGameBoard } = require('../cpu/main');
const allowCors = require('../middleware/cors');

const app = express();

const handleGameBoardRequest = async (req, res) => {
    const { board, difficulty } = req.body;
    console.log('Board:', board);
    console.log('Difficulty:', difficulty);

    const result = processGameBoard(board, difficulty);
    res.json({ paths: result });
};

const testConnection = async (req, res) => {
    res.json({ message: 'SUCCESS! GET request made.' });
};

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Wordhunt API!');
});
app.post('/api/data', allowCors(handleGameBoardRequest));
app.get('/api/data', allowCors(testConnection));

if (process.env.NODE_ENV !== 'production') {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running locally on http://localhost:${PORT}`);
    });
}

module.exports = app; // For local testing
module.exports.handler = serverless(app); // For Vercel
