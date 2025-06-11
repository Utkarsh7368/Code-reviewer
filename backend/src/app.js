const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors());
app.use(express.json());

// API routes
app.use('/ai', aiRoutes)

// Serve static files

app.use(express.static(path.join(__dirname, '../../frontend/dist')))

// Handle React routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend', 'dist', 'index.html'))
})

module.exports = app