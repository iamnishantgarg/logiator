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
            level: Number,
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
        url: {
            type: String,
        }
    }],
});

module.exports = mongoose.model("app", appSchema);