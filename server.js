var rpi433 = require('rpi-433');
var express = require('express');
var path = require('path');
var bp = require('body-parser')
var app = express();

app.use(bp.json()); // support json encoded bodies
app.use(bp.urlencoded({ extended: true })); // support encoded bodies

rfEmitter = rpi433.emitter({
  pin: 0,                     //Send through GPIO 0 (or Physical PIN 11) 
  pulseLength: 350            //Send the code with a 350 pulse length 
});

// Send 
sender = (msg_code) => rfEmitter.sendCode(msg_code, (error, stdout) => {   //Send 1234 
if(!error) console.log(stdout); //Should display 1234 
});

//Needs Auth for production
app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname + '/pub/index.html'));
})

//Needs Auth for production
app.post('/', (req, res) => {
    console.log(req.body)
    var state = parseMsgState(req.body.state);
    var str_msg = req.body.id + state;
    var msg = parseInt(str_msg);
    //sender(msg);
    console.log(msg);
    res.sendFile(path.join(__dirname + '/pub/index.html'));
})

app.listen('8080', () => {
    console.log('Your smart home is now live!')
})

var parseMsgState = (state) => {
    if (state == 'ON') {
        return '1';
    } else {
        return '0';
    }
}