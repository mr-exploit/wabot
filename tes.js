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
let sessionData;
// if(fs.existsSync(SESSION_FILE_PATH)) {
//     sessionData = require(SESSION_FILE_PATH);
// }

const client = new Client({
    authStrategy: new LocalAuth(),
    // authStrategy: new LegacySessionAuth({
    //     session:  sessionData
    // })
});
 
// Save session values to the file upon successful auth
// client.on('authenticated', (session) => {
//     sessionData = session;
//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
// });

// client.on('qr', qr => {
//     qrcode.generate(qr, {small: true});
//     console.log("cek qr", qr);
// });

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
	console.log(message.body);
});

client.on('message', message => {
	if(message.body === '!ping') {
		client.sendMessage(message.from, 'halo test');
	}
});
 
 
client.initialize();

app.use('/api', wabotroute, connectdeviceroute);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`App running on port ${port}..`);
});