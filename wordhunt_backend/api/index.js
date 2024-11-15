const express = require('express');
const serverless = require('serverless-http');
const cors = require("cors");
const { processGameBoard } = require('../cpu/main');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send(res.getHeaders());
    res.send('Welcome to the Wordhunt API! v1.0.0');
});

app.post('/api/data', (req, res) => {
    const { board, difficulty } = req.body;
    console.log('Board:', board);
    console.log('Difficulty:', difficulty);

    const result = processGameBoard(board, difficulty);
    res.json({ paths: result });
});

app.get('/api/data', (req, res) => {
    res.send(res.getHeaders());
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = 8000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // For local testing
module.exports.handler = serverless(app); // For Vercel deployment
