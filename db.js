const mongoose = require("mongoose");

// const password = process.env.Client_secret;

var mongoURL = "mongodb+srv://wodud6359:newPassword@cluster0.upzbgb5.mongodb.net/booking-football";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
    console.log("Mongo DB connection faild!");
});

connection.on("connected", () => {
    console.log("Mongo DB connection successful!");
});

module.exports = mongoose;
