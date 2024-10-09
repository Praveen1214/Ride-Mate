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

router.route('/getallfindrides').get(async (req, res) => {
    try {
        const allFindRides = await FindRide.find();
        return res.status(200).json(allFindRides);
    } catch (error) {
        return res.status(500).json({ status: "Error fetching rides", message: error.message });
    }
});

module.exports = router;