const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Document = require("../models/Document"); // Assuming you have a model for Document

const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Create a unique filename
  },
});
const fileFilter = (req, file, cb) => {
  // Accept image files only
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type, only JPEG, PNG, and JPG is allowed!"),
      false
    ); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB size limit
  fileFilter: fileFilter,
});


// Route to handle multiple file uploads (profilePhoto, NIC, and drivingLicense)
router.post(
  "/upload",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "nicFront", maxCount: 1 },
    { name: "nicRear", maxCount: 1 },
    { name: "licenseFront", maxCount: 1 },
    { name: "licenseRear", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files uploaded.");
      }

      // Log to check if files were received correctly
      console.log("Files received:", req.files);

      // Prepare data for saving
      const documentData = {};
      if (req.files.profilePhoto) {
        documentData.profilePhoto = `/uploads/${req.files.profilePhoto[0].filename}`;
      }
      if (req.files.nicFront) {
        documentData.nicFront = `/uploads/${req.files.nicFront[0].filename}`;
      }
      if (req.files.nicRear) {
        documentData.nicRear = `/uploads/${req.files.nicRear[0].filename}`;
      }
      if (req.files.licenseFront) {
        documentData.licenseFront = `/uploads/${req.files.licenseFront[0].filename}`;
      }
      if (req.files.licenseRear) {
        documentData.licenseRear = `/uploads/${req.files.licenseRear[0].filename}`;
      }

      const document = new Document(documentData);
      await document.save();

      res
        .status(200)
        .json({ message: "Files uploaded successfully", document });
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
