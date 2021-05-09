const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    appIds: [{
        type: mongoose.Types.ObjectId,
        ref: 'apps'
    }],
    keys: [{
        type: mongoose.Types.ObjectId,
        ref: 'keys'
    }],
});

module.exports = mongoose.model("user", userSchema);