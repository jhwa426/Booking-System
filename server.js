const express = require('express');

const app = express();

const port = 3000;

const dbConfig = require("./db");

const courtsRoute = require("./routes/courtsRoute");

app.use(express.json());

app.use("/api/courts", courtsRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});







