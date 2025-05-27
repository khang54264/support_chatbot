const Lecturer = require('../models/lecturer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Lecturer login
exports.loginLecturer = async (req, res) => {
  try {

    const lecturer = await Lecturer.findOne({ username: req.body.username });
    if (!lecturer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, lecturer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ lecturerId: lecturer._id, role: 'lecturer' }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ message: 'Lecturer logged in successfully', token: token });
  } catch (error) {
    console.error('Lecturer login failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new lecturer
exports.createLecturer = async (req, res) => {
  try {
    const lecturer = new Lecturer(req.body);
    await lecturer.save();
    res.status(201).send(lecturer);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all lecturers
exports.getAllLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find({});
    res.send(lecturers);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a lecturer by ID
exports.getLecturerById = async (req, res) => {
  try {
    const lecturer = await Lecturer.findById(req.params.id);
    if (!lecturer) {
      return res.status(404).send();
    }
    res.send(lecturer);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a lecturer by ID
exports.updateLecturer = async (req, res) => {
  try {
    const { password, ...updateData } = req.body; // Separate password from other data
    let hashedPassword;

    if (password) {
      // Hash the new password
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const lecturer = await Lecturer.findByIdAndUpdate(req.params.id, {
      ...updateData,
      ...(hashedPassword && { password: hashedPassword }) // Only update password if a new one is provided
    }, { new: true, runValidators: true });

    if (!lecturer) {
      return res.status(404).send();
    }
    res.send(lecturer);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a lecturer by ID
exports.deleteLecturer = async (req, res) => {
  try {
    const lecturer = await Lecturer.findByIdAndDelete(req.params.id);
    if (!lecturer) {
      return res.status(404).send();
    }
    res.send({ message: 'Lecturer deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};