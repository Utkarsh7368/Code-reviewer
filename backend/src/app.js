const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// API routes
app.use('/ai', aiRoutes);

// Static file serving and client-side routing (only in production)
if (process.env.NODE_ENV === 'production') {
    // Serve static files
    app.use(express.static(path.join(__dirname, '../../frontend/dist')));
    
    // Client-side routing - must be after API routes
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;