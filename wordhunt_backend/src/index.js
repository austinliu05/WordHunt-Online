const express = require('express');
const cors = require('cors');
const { processGameBoard } = require('./cpu/main');

const app = express();
const PORT = 3000;

const allowedOrigins = ['http://localhost:3001', 'https://wordhunt-online.vercel.app'];

const allowCors = (req, res, next) => {
    const origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
};

app.use(allowCors);
app.use(express.json());

app.post('/api/data', (req, res) => {
    const { board, difficulty } = req.body;
    console.log('Board:', board);
    console.log('Difficulty:', difficulty);

    const result = processGameBoard(board, difficulty);

    res.json({ paths: result });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
