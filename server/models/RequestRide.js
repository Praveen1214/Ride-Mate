const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const requestRideSchema = new Schema({
    passenger: {
        type: String,
        required: true,
    },
    passengercontact: {
        type: String,
        required: true,
    },
    passengergender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    driver: {
        type: String,
        required: true,
    },
    drivercontact: {
        type: String,
        required: true,
    },
    start: {
        type: locationSchema,
        required: true,
    },
    end: {
        type: locationSchema,
        required: true,
    },
    datetime: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const RequestRide = mongoose.model('requestrides', requestRideSchema);

module.exports = RequestRide;