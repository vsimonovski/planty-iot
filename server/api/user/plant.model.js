const mongoose = require('mongoose');

/*
const statsSchema = mongoose.Schema({
         
});*/

const plantSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  
    },
    name:String,
    specy:String
});

module.exports = mongoose.model('Plant', plantSchema);
