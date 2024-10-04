const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  profilePhoto: {
    type: String,
    required: false, // Path to the profile photo
  },
  nicFront: {
    type: String,
    required: false, // Path to the NIC Front photo
  },
  nicRear: {
    type: String,
    required: false, // Path to the NIC Rear photo
  },
  licenseFront: {
    type: String,
    required: false, // Path to the Driving License Front photo
  },
  licenseRear: {
    type: String,
    required: false, // Path to the Driving License Rear photo
  },
});

module.exports = mongoose.model("Document", DocumentSchema);
