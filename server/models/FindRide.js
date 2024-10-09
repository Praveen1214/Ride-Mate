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

const findRideSchema = new Schema({
    passenger: {
        type: String,
        required: true,
    },
    contact: {
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
});

const FindRide = mongoose.model('findrides', findRideSchema);

module.exports = FindRide;