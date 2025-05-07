const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");
const axios = require("axios");
const Frame = require("../models/frame");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Save files to 'uploads/' directory
  },
  filename: (req, file, cb) => {
    const templateName = Date.now(); // Use user ID from form data
    const ext = path.extname(file.originalname); // Keep original extension
    cb(null, `${templateName}${ext}`); // Unique filename
  },
});

const upload = multer({ storage }); // Store files temporarily

// POST method to store frame in DB
router.post("/create", upload.single("frame"), async (req, res) => {
  try {
    const filePath = req.file.path;
    console.log("File path:", filePath);
    console.log("File:", req.file);

    const form = new FormData();
    form.append("frame", fs.createReadStream(filePath)); // Forward file as stream

    // Forward the file to Media Server (Server 2)
    const response = await axios.post(
      `${process.env.MEDIA_SERVER_URL}/upload/frame`,
      form,
      { headers: form.getHeaders() }
    );

    fs.unlinkSync(filePath);

    // Create new frame
    const newFrame = new Frame(req.body);
    newFrame.image = response.data.url;
    if (newFrame.elements) {
      newFrame.elements = JSON.parse(newFrame.elements);
    }
    // Save frame to database
    await newFrame.save();

    res
      .status(201)
      .json({ message: "Frame created successfully", frame: newFrame });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving frame", error: error.message });
  }
});

// GET method to get all frames in DB
router.get("/list", async (req, res) => {
  try {
    const frames = await Frame.find();
    res.status(200).json(frames);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching frames", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const frameId = req.params.id;
    const frame = await Frame.findById(frameId);

    if (!frame) {
      return res.status(404).json({ message: "Frame not found" });
    }

    res.status(200).json(frame);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching frame", error: error.message });
  }
});

// PATCH method to update frame in DB
router.patch("/update/:id", upload.single("frame"), async (req, res) => {
  try {
    const frameId = req.params.id;
    let updateData = req.body;
    const filePath = req.file.path;
    console.log("File path:", filePath);
    console.log("File:", req.file);

    if (filePath) {
      const form = new FormData();
      form.append("frame", fs.createReadStream(filePath)); // Forward file as stream
      console.log("url", `${process.env.MEDIA_SERVER_URL}/upload/frame`);
      // Forward the file to Media Server (Server 2)
      const response = await axios.post(
        `${process.env.MEDIA_SERVER_URL}/upload/frame`,
        form,
        { headers: form.getHeaders() }
      );

      fs.unlinkSync(filePath);
      console.log("Response:", response.data);

      await Frame.findById(frameId).then(async (frame) => {
        if (frame.image) {
          const oldImageName = frame.image.split("/").pop(); // Extract filename from URL
          await axios.delete(
            `${process.env.MEDIA_SERVER_URL}/upload/delete/frames/${oldImageName}`,
            { headers: form.getHeaders() }
          );
        }
      });

      updateData.image = response.data.url; // Update image URL
    }
    if (updateData.elements) {
      updateData.elements = JSON.parse(updateData.elements);
    }

    // Update frame in database
    const updatedFrame = await Frame.findByIdAndUpdate(frameId, updateData, {
      new: true,
    });

    if (!updatedFrame) {
      return res.status(404).json({ message: "Frame not found" });
    }

    res
      .status(200)
      .json({ message: "Frame updated successfully", frame: updatedFrame });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating frame", error: error.message });
  }
});

module.exports = router;
