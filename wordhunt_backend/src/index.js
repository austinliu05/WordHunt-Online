const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());

app.post('/api/data', (req, res) => {
    console.log('Request body:', req.body);
    const { board, difficulty } = req.body;
    console.log('Board from React:', board);
    console.log('Difficulty from React:', difficulty);

    res.json({ reply: 'Message received successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
