const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Import the cars router
const carsRouter = require('./cars/cars-router');

const server = express();

// Use helmet and cors middleware for security and cross-origin requests
server.use(helmet());
server.use(cors());

// Enable express to parse JSON
server.use(express.json());

// Use the cars router for all requests starting with '/api/cars'
server.use('/api/cars', carsRouter);

server.use('*', (req, res) => {
    res.status(404).json({ message: "not found" });
  });

server.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
      });
    } else {
      res.status(err.status || 500).json({
        message: err.message,
      });
    }
  });  

module.exports = server;

