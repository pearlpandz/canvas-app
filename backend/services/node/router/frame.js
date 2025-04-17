const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Frame = require('../models/frame');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/frame/'); // Save files to 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage }) // For processing multipart/form-data

// POST method to store frame in DB
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        // Create new frame
        const newFrame = new Frame(req.body);
        newFrame.image = req.file ? req.file.path : 'uploads/placeholder-image.jpg';

        // Save frame to database
        await newFrame.save();

        res.status(201).json({ message: 'Frame created successfully', frame: newFrame });
    } catch (error) {
        res.status(500).json({ message: 'Error saving frame', error: error.message });
    }
});

// GET method to get all frames in DB
router.get('/list', async (req, res) => {
    try {
        const frames = await Frame.find();
        res.status(200).json(frames);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching frames', error: error.message });
    }
});

module.exports = router;