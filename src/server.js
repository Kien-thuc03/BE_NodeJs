const express = require('express');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});