const express = require('express');
const router = express.Router();
const FindRide = require('../models/FindRide');

router.route('/addfindride').post(async (req, res) => {

    const {
        passenger,
        contact,
        start,
        end,
        datetime,
    } = req.body;

    const newFindRide = new FindRide({
        passenger,
        contact,
        start,
        end,
    });

    try {

        await newFindRide.save();
        return res.status(200).json({ status: "Find ride added successfully" });

    } catch (error) {

        return res.status(500).json({ status: "Error with offering ride", messsage: error });
    }
});



module.exports = router;