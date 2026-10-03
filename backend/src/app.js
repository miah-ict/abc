const express = require('express');
const cors = require('cors');

const requestLogger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const apiRoutes = require('./routes');

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// API Router
app.use('/api', apiRoutes);

// Root Health Route
app.get('/', (req, res) => {
  res.json({
    name: 'PERN Stack Backend API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      items: '/api/items'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
