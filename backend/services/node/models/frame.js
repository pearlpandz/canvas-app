const mongoose = require('mongoose');

const frameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    elements: { type: mongoose.Schema.Types.Mixed, required: true },
    image: { type: String, default: 'default.jpg' },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Frame = mongoose.model('Frame', frameSchema);

module.exports = Frame;



   