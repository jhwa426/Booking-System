require('dotenv').config();

const express = require('express');

const app = express();

const port = 3000;

const dbConfig = require("./db");


const courtsRoute = require("./routes/courtsRoute");
const usersRoute = require("./routes/usersRoute");

app.use(express.json());

app.use("/api/courts", courtsRoute); //const courtModel = mongoose.model("court", courtSchema);

app.use("/api/users", usersRoute); //const userModel = mongoose.model("user", userSchema);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});