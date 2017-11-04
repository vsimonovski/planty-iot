const mongoose = require('mongoose');
const Plant = require('./plant');

archievementsSchema = mongoose.Schema({
    archs:[String]
});

const userSchema = mongoose.Schema({
    fullname:String,
    plants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant'
    }],
    archievements:archievementsSchema
});

module.exports = mongoose.model('User', userSchema);
