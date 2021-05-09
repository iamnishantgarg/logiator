const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    appId: {
        type: mongoose.Types.ObjectId,
        ref: 'apps',
        required: true,
    },
    level: {
        enum: [ "error", "warn", "verbose", "info", "debug", "silly" ],
        description: "can only be one of the enum values and is required",
        required: true,
    },
    description_message: {
        type: String,
        required: true,
    },
    description_environment: {
        type: String,
        required: true,
    },
    description_severity: {
        enum: [ 1,2,3,4,5,null ],
        required: false,
    },
    created_at    : { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    // description_[additionalProps: String] -- strict: false
})

module.exports = mongoose.model("log", logSchema);