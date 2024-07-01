const mongoose = require("mongoose");

const password = process.env.Client_secret;
console.log(process.env.Client_secret);
var mongoURL = `mongodb+srv://wodud6359:${password}@cluster0.upzbgb5.mongodb.net/booking-football`;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
    console.log("Mongo DB connection failed!");
});

connection.on("connected", () => {
    console.log("Mongo DB connection successful!");
});

module.exports = mongoose;