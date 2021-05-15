const express = require("express"),
    PORT = process.env.PORT || 5000,
    connectDb = require("./config/db"),
    bodyParser = require("body-parser"),
    cors = require('cors');

//routes
const userRoutes = require("./routes/user"),
    appRoutes = require("./routes/app"),
    logsRoutes = require("./routes/logs"),
    keysRoutes = require("./routes/keys");

// initialising app
const app = express();
app.use(cors());
app.use(express.json());
//parsing body
app.use(bodyParser({ extended: false }));

//connecting to db
connectDb();

//user apis
app.use("/user", userRoutes);
//keys apis
app.use("/keys", keysRoutes);
//app apis
app.use("/app", appRoutes); // TODO : APIKEY Validation
//logs apis
app.use("/logs", logsRoutes);

app.get("/", (req, res, next) => {
    return res.send("welcome");
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return process.exit(0);
    }
    console.log(`Server is up on port: ${PORT}`);
});
