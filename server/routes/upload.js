const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Document = require("../models/Document");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type. Allowed types are: ${allowedTypes.join(", ")}`
      ),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter,
}).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "nicFront", maxCount: 1 },
  { name: "nicRear", maxCount: 1 },
  { name: "licenseFront", maxCount: 1 },
  { name: "licenseRear", maxCount: 1 },
]);

router.post("/upload", (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "Multer error", error: err.message });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Unknown error", error: err.message });
    }

    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "No files uploaded." });
      }

      console.log("Files received:", req.files);

      const documentData = {};
      for (const [key, files] of Object.entries(req.files)) {
        if (files && files.length > 0) {
          documentData[key] = `/uploads/${files[0].filename}`;
        }
      }

      const document = new Document(documentData);
      await document.save();

      res
        .status(200)
        .json({ message: "Files uploaded successfully", document });
    } catch (error) {
      console.error("Error processing upload:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
});

module.exports = router;
