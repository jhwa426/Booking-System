const mongoose = require("mongoose");

const courtSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    maxPlayers: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imgURLs: [],

    currentBookings: [],

    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const courtModel = mongoose.model("court", courtSchema);

module.exports = courtModel;