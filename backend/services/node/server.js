const express = require('express');
const mongoose = require('mongoose');

const frameRouter = require('./router/frame');

const app = express();
const PORT = process.env.PORT || 4000;
const mongoURI = 'mongodb://user:pass@localhost:27017/mydgcards';

// Middleware to parse JSON bodies
app.use(express.json());  // Parses JSON data
app.use(express.urlencoded({ extended: true }));  // Parses form data
app.use('/uploads', express.static('uploads'));  // Serves uploaded files

// Set Cache-Control only for GET requests (from disk cache 200)
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.set('Cache-Control', 'public, max-age=300'); // cache for 5 minutes
//     }
//     next();
// });

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Path not available!' });
});

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Node App!' });
});

app.use('/api/frame', frameRouter);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, authSource: 'admin' })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
