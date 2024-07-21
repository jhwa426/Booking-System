require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors({
    origin: ['https://booking-football.netlify.app'],
    methods: ['GET,POST'],
    credentials: true
}));

const port = process.env.PORT || 4000;

const dbConfig = require("./db");


const courtsRoute = require("./routes/courtsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use(express.json());

app.use("/api/courts", courtsRoute); //const courtModel = mongoose.model("court", courtSchema);

app.use("/api/users", usersRoute); //const userModel = mongoose.model("user", userSchema);

app.use("/api/bookings", bookingsRoute); //const bookingModel = mongoose.model("booking", bookingSchema);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

