const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const uploadRoutes = require("./routes/upload"); // Adjust the path if needed

const app = express();

// MongoDB connection
const mongoURL =
  process.env.MONGODB_URI || "your-mongodb-connection-string-here";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("MongoDB Connection Failed");
});

connection.on("connected", () => {
  console.log("MongoDB Connection Successful");
});

// Middleware to use routes
app.use("/api", uploadRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
