const five = require('johnny-five');


const express = require('express');
const app = express();
let led;

app.get('/start', (req,res) => {
    if(!led){
        console.log("OVDE");
        initLed("on");
    } else {
        led.on();
    }

    res.json({"message":"ok"});
});


app.get('/stop', (req,res) => {
    if(!led){
        initLed("off");
    } else {
        led.off();
    }
    res.json({"message":"ok"});

});

function initLed(state){
    const board = new five.Board();
    board.on('ready', () => {
        led = new five.Led(13);
        if(state==="on"){
            led.on();
        } else {
            led.off();
        }
    });
}

app.listen(8080);