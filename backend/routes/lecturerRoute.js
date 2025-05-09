const express = require('express');
const router = express.Router();
const lecturerController = require('../controllers/lecturerController');

// Create a new lecturer
router.post('/lecturers', lecturerController.createLecturer);

// Get all lecturers
router.get('/lecturers', lecturerController.getAllLecturers);

// Get a lecturer by ID
router.get('/lecturers/:id', lecturerController.getLecturerById);

// Update a lecturer by ID
router.put('/lecturers/:id', lecturerController.updateLecturer);

// Delete a lecturer by ID
router.delete('/lecturers/:id', lecturerController.deleteLecturer);

module.exports = router;