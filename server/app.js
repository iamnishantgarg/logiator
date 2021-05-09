const express = require('express'),
    PORT = process.env.PORT || 5000,
    connectDb = require('./config/db'),
    userRoutes = require('./routes/user'),
    bodyParser = require('body-parser');

// initialising app
const app = express();

//parsing body
app.use(bodyParser({ extended: false }));

//connecting to db
connectDb();


//user apis
app.use('/user', userRoutes);

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