const express = require('express');
const router = express.Router();

const Court = require("../models/court");

// Get All Courts
router.get("/getAllCourts", async (req, res) => {
    try {
        const courts = await Court.find({});
        res.send(courts);

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


// Get Court By ID
router.post("/getCourtById", async (req, res) => {
    const courtId = req.body.courtId;

    try {
        const court = await Court.findOne({ _id: courtId })
        res.send(court);

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



// Admin - Add New Court
router.post("/addCourt", async (req, res) => {
    try {
        const newCourt = new Court(req.body);
        await newCourt.save();
        res.send("New Court added successfully");
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});


module.exports = router;