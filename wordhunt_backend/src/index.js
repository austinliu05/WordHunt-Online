const express = require('express');
const cors = require('cors');
const { processGameBoard } = require('./cpu/main');

const app = express();
const PORT = 3000;

const allowedOrigins = ['http://localhost:3001', 'https://wordhunt-online.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
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
