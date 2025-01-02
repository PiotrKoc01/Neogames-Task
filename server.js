import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 8000;

// get current path
const __filename = fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename);

// Static folder conection
app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));

