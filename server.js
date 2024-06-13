const express = require('express');

const app = express();

const port = 3000;

const dbConfig = require("./db");


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});





