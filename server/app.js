const express = require('express'),
    PORT = process.env.PORT || 5000,
    connectDb = require('./config/db'),
    bodyParser = require('body-parser');

//routes
const userRoutes = require('./routes/user'),
    keysRoutes = require('./routes/keys');

// initialising app
const app = express();

//parsing body
app.use(bodyParser({ extended: false }));

//connecting to db
connectDb();


//user apis
app.use('/user', userRoutes);

//keys api
app.use('/keys', keysRoutes);

app.get('/', (req, res, next) => {
    return res.send('welcome');
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return process.exit(0);
    }
    console.log(`Server is up on port: ${PORT}`);
})