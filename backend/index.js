const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { encryptMessage } = require('./encryption');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
res.send('Server is running');
});

app.post('/encrypt', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    const cyphertext = encryptMessage(message);
    res.json({ cyphertext });
});

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));