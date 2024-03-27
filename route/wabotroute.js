const express = require('express');
const { deviceConnect } = require('../controllers/wabot');

const app = express();
const connectdeviceroute = app.get('/connect-device', deviceConnect);
const wabotroute = app.get('/send-message', (req, res) => {

    res.send('Hello World!');
});

const api = app.get('/api', (req, res) => {
    res.send('Hello World!');
});
module.exports ={
    wabotroute,
    connectdeviceroute
}