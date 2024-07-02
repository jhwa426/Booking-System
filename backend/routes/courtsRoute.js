const express = require('express');
const router = express.Router();

const Court = require("../models/court");

router.get("/getAllCourts", async (req, res) => {
    try {
        const courts = await Court.find({});
        res.send(courts);
        // return res.json({ courts });

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/getCourtById", async (req, res) => {

    const courtId = req.body.courtId;

    try {
        const court = await Court.findOne({ _id: courtId })
        res.send(court);
        // return res.json({ court });

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


module.exports = router;