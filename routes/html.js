const html = require('express').Router();

// Get Route for index.html
html.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get Route for notes.html
html.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

module.exports = html;