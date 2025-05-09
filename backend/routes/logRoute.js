const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

// Create a new log
router.post('/logs', logController.createLog);

// Get all logs
router.get('/logs', logController.getAllLogs);

// Get a log by ID
router.get('/logs/:id', logController.getLogById);

// Update a log by ID
router.put('/logs/:id', logController.updateLog);

// Delete a log by ID
router.delete('/logs/:id', logController.deleteLog);

module.exports = router;