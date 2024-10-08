const express = require('express');
const router = express.Router();
const OfferRide = require('../models/OfferRide');

router.route('/addofferride').post(async (req, res) => {

    const {
        start,
        end,
        datetime,
        price,
        vehicletype,
        luggagecapacity,
        facilities
    } = req.body;

    const newRide = new OfferRide({
        start,
        end,
        datetime,
        price,
        vehicletype,
        luggagecapacity,
        facilities
    });

    try {

        await newRide.save();
        return res.status(200).json({ status: "Ride added successfully" });

    } catch (error) {

        return res.status(500).json({ status: "Error with offering ride", messsage: error });
    }
});


module.exports = router;