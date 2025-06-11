const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes first
app.use('/ai', aiRoutes);

// Production static file serving

    app.use(express.static(path.join(__dirname, '../../frontend/dist')));
    
    // Serve index.html for all other routes in production
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
    });


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;