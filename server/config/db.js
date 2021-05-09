const mongoose = require('mongoose');
const { mongoUri } = require('../config');

const connectDb = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Connected to DB');

    } catch (err) {
        console.log(err);
        return process.exit(0);
    }
}

module.exports = connectDb