const express = require('express');
const path = require('path');
const apiRoute = require('./routes/api');
const indexRoute = require('./routes/html');
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use('/api', apiRoute);
app.use(express.static('public'));

// Get Route for index.html
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get Route for notes.html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
