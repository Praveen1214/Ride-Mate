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

const offerRideSchema = new Schema({
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
    vehicletype: {
        type: String,
        required: true,
        enum: ['Sedan', 'SUV', 'Hatchback', 'Van']
    },
    luggagecapacity: {
        type: String,
        required: true,
        enum: ['Small', 'Medium', 'Large']
    },
    facilities: {
        type: String,
        required: true,
    }
});

const OfferRide = mongoose.model('offerrides', offerRideSchema);

module.exports = OfferRide;