const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const offerRideSchema = new Schema({
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
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
        enum: ['Small', 'Medium', 'Large']
    }
});

const OfferRide = mongoose.model('offerrides', offerRideSchema);

module.exports = OfferRide;
