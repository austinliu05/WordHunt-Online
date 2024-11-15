const express = require('express');
const { processGameBoard } = require('./cpu/main');
const allowCors = require('./middleware/cors');

const app = express();
const PORT = 3000;

const handleGameBoardRequest = async (req, res) => {
    const { board, difficulty } = req.body;
    console.log('Board:', board);
    console.log('Difficulty:', difficulty);

    const result = processGameBoard(board, difficulty);
    res.json({ paths: result });
};

const testConnection = async(req, res) => {
    res.json({message: "SUCCESS! GET request made."})
}

app.use(express.json());
app.post('/api/data', allowCors(handleGameBoardRequest));
app.get('/api/data', allowCors(testConnection));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
