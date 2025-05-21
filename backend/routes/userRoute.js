const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/api/users/register', userController.registerUser);

// Login user
router.post('/api/users/login', userController.loginUser);

// Get all users
router.get('/api/users', userController.getAllUsers);

// Get a user by ID
router.get('/api/users/:id', userController.getUserById);

// Update a user by ID
router.put('/api/users/:id', userController.updateUser);

// Delete a user by ID
router.delete('/api/users/:id', userController.deleteUser);

module.exports = router;