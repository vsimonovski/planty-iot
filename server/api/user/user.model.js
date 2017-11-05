const mongoose = require('mongoose');

archievementsSchema = mongoose.Schema({
    achs:[String]
});

const userSchema = mongoose.Schema({
    fullname:String,
    plants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant'
    }],
    achievements:archievementsSchema
});

module.exports = mongoose.model('User', userSchema);
