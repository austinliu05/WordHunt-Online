const express = require('express');
const cors = require('cors');
const { processGameBoard } = require('./cpu/main');

const app = express();
const PORT = 3000;

const allowedOrigins = ['http://localhost:3001', 'https://wordhunt-online.vercel.app'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
    allowedHeaders: [
        'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 
        'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version'
    ]
}));

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
