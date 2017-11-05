const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname:String,
    plants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant'
    }],
    achievements:[String]
});

module.exports = mongoose.model('User', userSchema);
