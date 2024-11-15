const express = require('express');
const { processGameBoard } = require('./cpu/main');

const app = express();
const PORT = 3000;

const allowedOrigins = ['http://localhost:3001', 'https://wordhunt-online.vercel.app'];
// Custom CORS Middleware
const allowCors = (fn) => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Uncomment if you want to use the origin from the request
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    return await fn(req, res);
};

// Handler Function
const handleGameBoardRequest = async (req, res) => {
    const { board, difficulty } = req.body;
    console.log('Board:', board);
    console.log('Difficulty:', difficulty);

    const result = processGameBoard(board, difficulty);
    res.json({ paths: result });
};

// Use CORS Wrapper on the Route
app.use(express.json());
app.post('/api/data', allowCors(handleGameBoardRequest));

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
