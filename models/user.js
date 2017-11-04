const mongoose = require('mongoose');
const Plant = require('./plant');

const userSchema = mongoose.Schema({
    fullname:String,
    plants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant'
    }],
    streaks:Number  
});

module.exports = mongoose.model('User', userSchema);
