const path = require('path');
const express = require('express');

const app = express(),
	    PUBLIC_DIR = __dirname,
	    HTML_FILE = path.join(PUBLIC_DIR, './html/index.html')
app.use(express.static(PUBLIC_DIR));

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE)
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}...`);
    console.log('Press Ctrl+C to quit.');
});
