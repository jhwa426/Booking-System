require('dotenv').config();

const express = require('express');
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');

const Booking = require("../models/booking");
const Court = require("../models/court");

function generateTransactionId() {
    let transactionId = '';
    for (let i = 0; i < 10; i++) {
        transactionId += Math.floor(Math.random() * 10);
    }
    return transactionId;
}


router.post("/bookingCourt", async (req, res) => {
    const {
        court,
        userId,
        startDate,
        endDate,
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
})

module.exports = router;