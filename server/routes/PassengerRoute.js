const express = require('express');
const router = express.Router();
const Passengers = require('../models/Passenger');

router.route('/register').post(async (req, res) => {

    const {
        firstname,
        lastname,
        email,
        gender,
        contact,
    } = req.body;

    const newPassenger = new Passengers({
        firstname,
        lastname,
        email,
        gender,
        contact,
    });

    try {

        await newPassenger.save();
        return res.status(200).json({ status: "Passenger is registered successfully" });

    } catch (error) {

        return res.status(500).json({ status: "Error with register passenger", messsage: error });
    }
});


module.exports = router;