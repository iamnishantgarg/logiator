const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    logs: [{
        type: mongoose.Types.ObjectId,
        ref: 'logs',
    }],
    counts: [
        {
            level: {
                type: String,
                enum: ["error", "warning", "verbose", "info", "debug", "silly"]
            },
            count: Number,
            incidentCount: Number
        }
    ],
    webhooks: [{
        condition: {
            comparision: String,
            logLevel: String,
            count: Number
        },
        meta: {
            type: Object
        },
        url: {
            type: String,
        }
    }],
});

module.exports = mongoose.model("app", appSchema);