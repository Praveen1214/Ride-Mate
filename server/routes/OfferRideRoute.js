const express = require('express');
const router = express.Router();
const OfferRide = require('../models/OfferRide');

router.route('/addofferride').post(async (req, res) => {

    const {
        driver,
        contact,
        start,
        end,
        datetime,
        price,
        vehicletype,
        luggagecapacity,
        facilities
    } = req.body;

    const newRide = new OfferRide({
        driver,
        contact,
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

router.route('/getallofferrides').get(async (req, res) => {
    try {
        const allRides = await OfferRide.find();
        return res.status(200).json(allRides);
    } catch (error) {
        return res.status(500).json({ status: "Error fetching rides", message: error.message });
    }
});

router.route('/getallofferrides/:contact').post(async (req, res) => {

    const driverContact = req.params.contact;

    try {

        const ride = await OfferRide.find({ contact: driverContact });

        if (!ride) {
            return res.status(404).json({ status: "Ride not found" });
        }

        return res.status(200).json({ status: "Ride is fatched", ride });

    } catch (error) {

        return res.status(500).json({ status: "Error with fetch ride", message: error });

    }
});


module.exports = router;