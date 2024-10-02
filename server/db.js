const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGODB_URI;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("MongoDB Connection Failed");
});

connection.on("connected", () => {
  console.log("MongoDB Connection Successful");
});

module.exports = mongoose;
