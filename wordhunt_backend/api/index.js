const express = require('express');
const serverless = require('serverless-http');
const { processGameBoard } = require('../cpu/main');

const app = express();
app.use(express.json());

const allowedOrigins = ['http://localhost:3001', 'https://wordhunt-online.vercel.app'];

const allowCors = (req, res, next) => {
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PATCH, DELETE, PUT'
        );
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        );
    }

    if (req.method === 'OPTIONS') {
        res.status(200).end(); // Preflight response
        return;
    }
    
    next();
};

app.use(allowCors); // Apply CORS middleware to all routes

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Wordhunt API!');
});

app.post('/api/data', (req, res) => {
    const { board, difficulty } = req.body;
    console.log('Board:', board);
    console.log('Difficulty:', difficulty);

    const result = processGameBoard(board, difficulty);
    res.json({ paths: result });
});

app.get('/api/data', (req, res) => {
    res.json({ message: 'SUCCESS! GET request made.' });
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = 8000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // For local testing
module.exports.handler = serverless(app); // For Vercel deployment
