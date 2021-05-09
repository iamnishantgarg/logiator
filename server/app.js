const express = require('express'),
    PORT = process.env.PORT || 5000;

// initialising app
const app = express();

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server is up on port: ${PORT}`);
})