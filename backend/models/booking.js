const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    court: {
        type: String,
        required: true
    },
    courtId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    maxPlayers: {
        type: String,
        required: true
    },
    totalHours: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Booked"
    },

}, {
    timestamps: true,
});


const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = bookingModel;