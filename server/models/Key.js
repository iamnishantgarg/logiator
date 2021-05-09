const mongoose = require('mongoose');

const keySchema = mongoose.Schema({
    value: {
        type: String,
        required: true,
        unique: true
    },
    label: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true,
    },
});

module.exports = mongoose.model("key", keySchema);