const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    appID: {
        type: mongoose.Types.ObjectId,
        ref: 'apps',
        required: true,
    },
    level: {
        type: String,
        enum: ["error", "warning", "verbose", "info", "debug", "silly"],
        description: "Can only be one of the enum values and is required",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    environment: {
        type: String,
        enum: ["development", "staging", "production"],
        required: true,
    },
    severity: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
})

module.exports = mongoose.model("log", logSchema);