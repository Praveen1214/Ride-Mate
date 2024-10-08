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
  name: {
    type: String,
    required: false, 
  },
  date: {
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
  img: {
    type: String,
    required: false,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUuR6lY1HPFS4Q_R2A5r70ECdchXmR_n1b8g&s" 
  },
 
});

module.exports = mongoose.model("FeedBack", feedBackSchema);
