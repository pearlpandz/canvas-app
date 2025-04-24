const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Frame = require('../models/frame');
const fs = require('fs');
const PSD = require('psd.js');

function toSnakeCase(str) {
    return str.trim().toLowerCase().replace(/\s+/g, '_');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/frame/'); // Save files to 'uploads/' directory
    },
    filename: (req, file, cb) => {
        const templateName = toSnakeCase(req.body.name); // Use user ID from form data
        const ext = path.extname(file.originalname); // Keep original extension
        cb(null, `template_${templateName}${ext}`); // Unique filename
    }
});

const upload = multer({ storage }) // For processing multipart/form-data

// POST method to store frame in DB
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        // Create new frame
        const newFrame = new Frame(req.body);
        newFrame.image = req.file ? req.file.path : 'uploads/placeholder-image.jpg';
        if (newFrame.elements) {
            newFrame.elements = JSON.parse(newFrame.elements)
        }
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

router.get('/:id', async (req, res) => {
    try {
        const frameId = req.params.id;
        const frame = await Frame.findById(frameId);

        if (!frame) {
            return res.status(404).json({ message: 'Frame not found' });
        }

        res.status(200).json(frame);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching frame', error: error.message });
    }
});

// PATCH method to update frame in DB
router.patch('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const frameId = req.params.id;
        let updateData = req.body;
        if (req.file) {
            updateData.image = req.file.path;
        }
        if (updateData.elements) {
            updateData.elements = JSON.parse(updateData.elements)
        }

        // Update frame in database
        const updatedFrame = await Frame.findByIdAndUpdate(frameId, updateData, { new: true });

        if (!updatedFrame) {
            return res.status(404).json({ message: 'Frame not found' });
        }

        res.status(200).json({ message: 'Frame updated successfully', frame: updatedFrame });
    } catch (error) {
        res.status(500).json({ message: 'Error updating frame', error: error.message });
    }
});

const uploadPsd = multer({ dest: 'uploads/psd' });

router.post('/upload', uploadPsd.single('psd'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const psd = await PSD.open(filePath);
        psd.parse();
    
        const json = psd.tree().export();
    
        // Optional: delete uploaded file after parsing
        fs.unlinkSync(filePath);
    
        res.json({ success: true, data: json });
      } catch (err) {
        res.status(500).json({ success: false, error: err.message });
      }
});


module.exports = router;