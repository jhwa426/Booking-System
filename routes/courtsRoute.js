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

module.exports = router;