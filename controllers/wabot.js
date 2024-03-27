const { Client, LocalAuth, LegacySessionAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();
// https://www.youtube.com/watch?v=4wraM6VYisM&t=830s&ab_channel=KarsimPedia
const deviceConnect = async(req, res) => {
    console.log("cek req qr");
    try {
       client.on('qr', qr => {
            qrcode.generate(qr, {small: true});
            console.log("cek qr", qr);
        });

        client.on('ready', () => {
            console.log('Client is ready!');
        });
         
        // client.on('message', message => {
        //     console.log(message.body);
        // });
        
        // client.on('message', message => {
        //     if(message.body === '!ping') {
        //         client.sendMessage(message.from, 'halo test');
        //     }
        // });
 
        client.initialize();
         
    } catch (error) {
        console.log("cek error", error);
    } 
}

const api = async(req, res) => {
    console.log("cek req qr");
    try {

        client.on('ready', () => {
            console.log('Client is ready!');
        });

        let nohp = req.query.nohp || req.body.nohp;
        const pesan = req.query.pesan || req.body.pesan;

      
        if(nohp.startsWith("0")){
            nohp = "62" + nohp.slice(1) + "@c.us";
        } else if (nohp.startsWith("62")){
            nohp = nohp + "@c.us";
        } else {
            nohp = "62" + nohp + "@c.us";
        }
        console.log("cek nohp", nohp);
        const user = await client.isRegisteredUser(nohp);
        console.log("cek user", user);
        if(user){
            client.sendMessage(nohp, pesan);
            res.json({status: "Pesan berhasil dikirim", pesan});
        } else {
            res.json({status: "gagal", pesan : "Nomor tidak terdaftar"});
        }

    } catch (error) {
        console.log("cek error", error);
        res.status(500).json({status: "gagal", pesan : "Internal server error"});
        return;
    }
}


module.exports ={
    deviceConnect,
    api
}