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
                enum: ["error", "warn", "verbose", "info", "debug", "silly"]
            },
            count: Number,
            incidentCount: Number
        }
    ],
    webhooks: [{
        condition: {
            comparison: String,
            entity: String,
            count: Number
        },
        curl: {
            type: String,
        }
    }],
});

module.exports = mongoose.model("app", appSchema);