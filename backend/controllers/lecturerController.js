const Lecturer = require('../models/lecturer');

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
    const lecturer = await Lecturer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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