const express = require('express');

const app = express();

const port = 3000;

const dbConfig = require("./db");


const courtsRoute = require("./routes/courtsRoute");
const usersRoute = require("./routes/usersRoute");

app.use(express.json());

app.use("/api/courts", courtsRoute);

app.use("/api/users", usersRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});