const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

require("dotenv").config();
const uploadRoutes = require("./routes/upload"); // Adjust the path if needed
const feedBack = require("./routes/feedBackRoute")

const app = express();

// MongoDB connection
const mongoURL =
  process.env.MONGODB_URI || "your-mongodb-connection-string-here";

mongoose.connect(mongoURL, {});

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("MongoDB Connection Failed");
});

connection.on("connected", () => {
  console.log("MongoDB Connection Successful");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// If using Express 4.16.0 or higher, you can directly use:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to use routes
app.use("/api", uploadRoutes);
app.use("/api/feedback",feedBack)

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
