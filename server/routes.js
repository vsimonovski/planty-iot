const five = require('johnny-five');
let board, led;

module.exports = app => {
    app.get('/start', (req, res) => {
        if (!led) {
            console.log('OVDE');
            initLed('on');
        } else {
            led.on();
        }

        res.json({ message: 'ok' });
    });

    app.get('/stop', (req, res) => {
        if (!led) {
            initLed('off');
        } else {
            led.off();
        }
        res.json({ message: 'ok' });
    });

    app.get('/light', (req, res) => {
        if (!board) {
            board = new five.Board();
        }
        board.on('ready', function() {
            photoresistor = new five.Sensor({
                pin: 'A2',
                freq: 250
            });

            board.repl.inject({
                pot: photoresistor
            });

            photoresistor.on('change', function() {
                console.log(this.value);
                // res.json({"light":this.value});
            });
        });
    });

    app.get('/zemlja', (req, res) => {
        if (!board) {
            board = new five.Board();
        }
        board.on('ready', function() {
            let moisture = new five.Sensor({
                pin: 'A0',
                freq: 1000
            });

            moisture.on('change', function(value) {
                let text = '';
                if (value > 600) {
                    text = 'GURNI MEEE';
                } else if (value > 500) {
                    text = 'NAPOJI ME :(';
                } else if (value > 400) {
                    text = 'VLAZNA SAM ^_^';
                }
                console.log('zemlja: ' + text + ' ' + value);
            });
        });
    });

    app.get('/temp', (req, res) => {
        if (!board) {
            board = new five.Board();
        }
        board.on('ready', function() {
            var temperature = new five.Thermometer({
                controller: 'LM335',
                pin: 'A5'
            });

            temperature.on('change', function() {
                console.log(this.celsius + '°C', this.fahrenheit + '°F');
            });
        });
    });

    app.get('/plant', (req, res) => {
        if (!board) {
            board = new five.Board();
        }
        let sunData, temperatureData, moisureData;
        let photoresistor, moisture, temperature;
        let obj = {};
        let i = 0;
        board.on('ready', () => {
            // Create a new `photoresistor` hardware instance.
            if (!photoresistor) {
                photoresistor = new five.Sensor({
                    pin: 'A2',
                    freq: 250
                });
            }

            // board.repl.inject({
            //     pot: photoresistor
            // });

            // "data" get the current reading from the photoresistor
            let f3 = function() {
                console.log(this.value);
                sunData = this.value;
                i++;
                // if (i === 1) {
                if (!moisture) {
                    moisture = new five.Sensor({
                        pin: 'A0'
                    });
                }
                let j = 0;
                let f2 = function(value) {
                    let text = '';
                    if (value > 600) {
                        text = 'GURNI MEEE';
                    } else if (value > 500) {
                        text = 'NAPOJI ME :(';
                    } else if (value > 400) {
                        text = 'VLAZNA SAM ^_^';
                    } else if (value > 300) {
                        text = 'UHH, DOBRO JE!';
                    }
                    console.log('zemlja: ' + text + ' ' + value);
                    moisureData = value;
                    j++;
                    // if (j === 1) {
                    if (!temperature) {
                        temperature = new five.Thermometer({
                            controller: 'LM335',
                            pin: 'A5'
                        });
                    }
                    let k = 0;
                    let f1 = function() {
                        console.log(
                            this.celsius + '°C',
                            this.fahrenheit + '°F'
                        );
                        temperatureData = this.celsius;
                        k++;
                        // if (k === 1) {
                        temperature.removeListener('data', f1);
                        moisture.removeListener('data', f2);
                        photoresistor.removeListener('data', f3);
                        res.json({
                            sunData,
                            temperatureData,
                            moisureData
                        });
                        // }
                    };
                    temperature.on('change', f1);
                    // }
                };
                moisture.on('data', f2);
                // }
            };
            photoresistor.on('data', f3);
        });
    });
};

function initLed(state) {
    if (!board) {
        board = new five.Board();
    }
    board.on('ready', () => {
        led = new five.Led(13);
        if (state === 'on') {
            led.on();
        } else {
            led.off();
        }
    });
}
