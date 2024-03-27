const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, LocalAuth, LegacySessionAuth } = require('whatsapp-web.js');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { wabotroute, connectdeviceroute } = require('./route/wabotroute');
dotenv.config();

const port = process.env.PORT;
// Path where the session data will be stored
console.log("cek port", port);
const app = express();


app.use('/api', wabotroute, connectdeviceroute);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`App running on port ${port}..`);
});