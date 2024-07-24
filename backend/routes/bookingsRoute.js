require('dotenv').config();

const express = require('express');
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');

const Booking = require("../models/booking");
const Court = require("../models/court");

function generateTransactionId() {
    let transactionId = '';
    for (let i = 0; i < 20; i++) {
        transactionId += Math.floor(Math.random() * 10);
    }
    return transactionId;
}


// New Booking Court
router.post("/bookingCourt", async (req, res) => {
    const {
        court,
        userId,
        startDate,
        endDate,
        maxPlayers,
        totalHours,
        totalAmount,
        token,
    } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        })

        const idempotencyKey = uuidv4();

        const payment = await stripe.charges.create(
            {
                amount: totalAmount * 100,
                customer: customer.id,
                currency: "NZD",
                receipt_email: token.email,
            },
            {
                idempotencyKey: idempotencyKey,
            }
        )

        if (payment.status === 'succeeded') {
            const newBooking = new Booking({
                court: court.name,
                courtId: court._id,
                userId,
                startDate,
                endDate,
                maxPlayers,
                totalHours,
                totalAmount,
                transactionId: generateTransactionId(),
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

            return res.send("Payment Successful, your booking has been confirmed");
        }
        else {
            throw new Error('Payment failed');
        }

    } catch (error) {
        console.error("Error in bookingCourt:", error); // Log error for debugging
        return res.status(400).json({ message: error.message });
    }

});

// Get Bookings By UserId
router.post("/getBookingsByUserId", async (req, res) => {
    const {
        court,
        userId,
        startDate,
        endDate,
        totalHours,
        totalAmount,
        token,
        status,
    } = req.body;

    try {
        const bookings = await Booking.find({ userId: userId });
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


// Cancel Booking
router.post("/cancelBooking", async (req, res) => {
    const { bookingId, courtId } = req.body;

    try {
        const currentBooking = await Booking.findOne({ _id: bookingId });
        currentBooking.status = "Cancelled";
        await currentBooking.save();

        const availableCourt = await Court.findOne({ _id: courtId });

        const bookings = availableCourt.currentBookings;
        const cancelBooking = bookings.filter((booking) => booking.bookingId.toString() !== bookingId);

        availableCourt.currentBookings = cancelBooking;

        await availableCourt.save();

        return res.send("Your booking cancelled successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


// Admin - Get All Bookings
router.get('/getAllBookings', async (req, res) => {
    try {
        const currentBookings = await Booking.find();
        res.send(currentBookings);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



module.exports = router;