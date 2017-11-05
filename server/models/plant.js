const mongoose = require('mongoose');

/*
const statsSchema = mongoose.Schema({
         
});*/

const plantSchema = mongoose.Schema({
    name:String,
    specy:String
});

module.exports = mongoose.model('Plant', plantSchema);
