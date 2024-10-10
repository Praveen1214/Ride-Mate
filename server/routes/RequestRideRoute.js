const express = require('express');
const router = express.Router();
const RequestRide = require('../models/RequestRide');

router.route('/addfindride').post(async (req, res) => {

    const {
        passenger,
        passengercontact,
        passengergender,
        driver,
        drivercontact,
        start,
        end,
        datetime,
        price
    } = req.body;

    const newRequestRide = new RequestRide({
        passenger,
        passengercontact,
        passengergender,
        driver,
        drivercontact,
        start,
        end,
        datetime,
        price
    });

    try {

        await newRequestRide.save();
        return res.status(200).json({ status: "req ride added successfully" });

    } catch (error) {

        return res.status(500).json({ status: "Error with req ride", message: error.message });
    }
});



module.exports = router;