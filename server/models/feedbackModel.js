const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
  driverid: {
    type: String,
    required: false, 
  },
  userid: {
    type: String,
    required: false, 
  },
  ratecount: {
    type: String,
    required: false, // Path to the NIC Rear photo
  },
  description: {
    type: String,
    required: false, // Path to the Driving License Front photo
  },
 
});

module.exports = mongoose.model("FeedBack", feedBackSchema);
