const express = require('express');
const app = express();

require('dotenv').config();
const config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://plantyuser:plantypass@ds145275.mlab.com:45275/plantydb',
    {
        useMongoClient: true
    },
    () => {
        console.log('connection with database established!');
        require('./routes')(app);
    }
);
mongoose.Promise = global.Promise;

app.listen(8080);
