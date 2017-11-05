const mongoose = require('mongoose');

const statsSchema = mongoose.Schema({
    moisture: Number,
    temperature: Number,
    sun: Number
});

const plantSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    stats: statsSchema,
    name: String,
    specy: String
});

module.exports = mongoose.model('Plant', plantSchema);
