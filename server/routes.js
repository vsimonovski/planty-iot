const five = require('johnny-five');
let board, led;
let lastChecked;
let temperature, moisture, photoresistor;
let Plant = require('./api/plant/plant.model');

module.exports = app => {
    
    app.use('/api/users', require('./api/user'));

    app.get('/appdirect', (req, res) => {
        res.status(200).send();
    });

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

            moisture.once('data', function(value) {
                let text = '';
                if (value > 600) {
                    text = 'GURNI MEEE';
                } else if (value > 500) {
                    text = 'NAPOJI ME :(';
                } else if (value > 400) {
                    text = 'VLAZNA SAM ^_^';
                }
                console.log('zemlja: ' + text + ' ' + value);
                res.json({ data: value });
            });
        });
    });

    app.get('/temp/:id', (req, res) => {
        let t, m, s;
        if (!board) {
            board = new five.Board();
            board.debug = false;
            board.repl = false;
        } else {
            console.log('board');
            console.log(temperature);
        }

        // if (temperature !== undefined) {
        //     temperature.enable();
        // }
        board.on('ready', function() {
            console.log('sam ovde?');
            temperature = new five.Thermometer({
                controller: 'LM335',
                pin: 'A5'
            });
            photoresistor = new five.Sensor({
                pin: 'A2',
                freq: 1000
            });
            moisture = new five.Sensor({
                pin: 'A0',
                freq: 1000
            });

            temperature.on('data', function() {
                console.log(this.celsius + '°C', this.fahrenheit + '°F');
                t = this.celsius;
                photoresistor.on('data', function() {
                    console.log(this.value);
                    s = this.value;
                    moisture.on('data', async function(value) {
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
                        m = value;
                        this.disable();

                        let plant = await Plant.findOne({
                            user: req.params.id
                        });
                        console.log(plant);

                        plant.stats.moisture = m;
                        plant.stats.sun = s;
                        plant.stats.temperature = t;

                        await plant.save();

                        res.json(plant, 200);

                        board.io.reset();
                        // res.status(200).send('OK!');
                    });
                    this.disable();
                });
                this.disable();
            });
        });
        if (board.isReady) {
            console.log('spreman');
            temperature = new five.Thermometer({
                controller: 'LM335',
                pin: 'A5'
            });
            photoresistor = new five.Sensor({
                pin: 'A2',
                freq: 1000
            });
            moisture = new five.Sensor({
                pin: 'A0',
                freq: 1000
            });

            temperature.on('data', function() {
                console.log(this.celsius + '°C', this.fahrenheit + '°F');
                t = this.celsius;
                photoresistor.on('data', function() {
                    console.log(this.value);
                    s = this.value;
                    moisture.on('data', async function(value) {
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
                        m = value;
                        this.disable();

                        let plant = await Plant.findOne({
                            user: req.params.id
                        });
                        console.log(plant);

                        plant.stats.moisture = m;
                        plant.stats.sun = s;
                        plant.stats.temperature = t;
                        await plant.save();
                        res.json(plant, 200);
                        board.io.reset();

                        // res.status(200).send('OK!');
                    });
                    this.disable();
                });
                this.disable();
            });
            // });
        }
    });

    app.get('/init', (req, res) => {
        if (!board) {
            board = new five.Board();
        }
        board.on('ready', function() {
            photoresistor = new five.Sensor({
                pin: 'A2',
                freq: 1000
            });
            moisture = new five.Sensor({
                pin: 'A0',
                freq: 1000
            });
            board.repl.inject({
                pot: photoresistor
            });
            temperature = new five.Thermometer({
                controller: 'LM335',
                pin: 'A5',
                freq: 1000
            });
        });
        res.json({ message: 'ok' });
    });

    app.get('/plant', (req, res) => {
        if (!board) {
            board = new five.Board();
        }
        let sunData, temperatureData, moisureData;
        let obj = {};
        let i = 0;
        // board.on('ready', () => {
        // Create a new `photoresistor` hardware instance.
        // const photoresistor = new five.Sensor({
        //     pin: 'A2',
        //     freq: 1000
        // });

        photoresistor.once('data', () => {
            obj.sunData = this.value;
            console.log('sun: ' + obj.sunData);
        });

        // const moisture = new five.Sensor({
        //     pin: 'A0',
        //     freq: 1000
        // });
        //  let j = 0;
        //   let f2 = function(value) {
        moisture.once('data', value => {
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
            obj.moisureData = value;
        });
        // const temperature = new five.Thermometer({
        //     controller: 'LM335',
        //     pin: 'A5',
        //     freq: 1000
        // });

        temperature.once('data', () => {
            console.log(this.celsius + '°C', this.fahrenheit + '°F');
            obj.temperatureData = this.celsius;
            // if (!lastChecked || Date.now() > lastChecked + 60000) {
            //     lastChecked = Date.now();
            // }
            // if (
            //     this.temperatureData &&
            //     this.sunData &&
            //     this.moisureData &&
            //     Date.now() - lastChecked > 60000
            // ) {
            console.log('ajdeee');
            res.json({
                sunData: this.sunData,
                temperatureDataa: this.temperatureDataa,
                moisureData: this.moisureData
            });
            // }
        });
        // });

        // var temperature = new five.Thermometer({
        //     controller: 'LM335',
        //     pin: 'A5'
        // });

        // temperature.on('data', function() {
        //     console.log(this.celsius + '°C', this.fahrenheit + '°F');
        //     temperatureData = this.celsius;
        // });
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
