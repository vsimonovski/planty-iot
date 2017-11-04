const express = require('express');
const app = express();

require('dotenv').config();
const config = require('../config');

const mongoose = require('mongoose');
mongoose.connect(
    config.DBurl,
    {
        useMongoClient: true
    },
    () => {
        console.log('connection with database established!');
        require('./routes')(app);
    }
);

app.listen(8080);
