const express = require('express');
const router = express.Router();

const Booking = require("../models/booking");
const Court = require("../models/court");

router.post("/bookingCourt", async (req, res) => {
    const {
        court,
        userId,
        startDate,
        endDate,
        totalHours,
        totalAmount,
    } = req.body;

    try {
        const newBooking = new Booking({
            court: court.name,
            courtId: court._id,
            userId,
            startDate,
            endDate,
            totalHours,
            totalAmount,
            transactionId: "1234",
        });

        const savedBooking = await newBooking.save();

        const findBooking = await Court.findOne({ _id: court._id });

        findBooking.currentBookings.push({
            bookingId: savedBooking._id,
            startDate: startDate,
            endDate: endDate,
            userId: savedBooking.userId,
            status: savedBooking.status,
        });

        await findBooking.save();

        res.send("Booking successfully!");

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;