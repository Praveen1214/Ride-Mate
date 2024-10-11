const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const app = express();



// Middleware
app.use(express.json());  // To parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(cors());  // Enable CORS

// MongoDB connection
const mongoURL = process.env.MONGODB_URI;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("error", (err) => {
  console.log("MongoDB Connection Failed", err);
});

connection.on("connected", () => {
  console.log("MongoDB Connection Successful");
});

// If using Express 4.16.0 or higher, you can directly use:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Import routes
const uploadRoutes = require("./routes/upload");
const PassengerRoute = require('./routes/PassengerRoute');
const feedBack = require("./routes/feedBackRoute")
const OfferRideRoute = require('./routes/OfferRideRoute');
const RequestRideRoute = require('./routes/RequestRideRoute');


// Use routes
app.use("/api", uploadRoutes);
app.use('/api/passenger', PassengerRoute);
app.use("/api/feedback",feedBack)
app.use('/api/offerride', OfferRideRoute);
app.use('/api/requestride', RequestRideRoute);
