const Log = require('../models/log');

// Create a new log
exports.createLog = async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.status(201).send(log);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all logs
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find({});
    res.send(logs);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a log by ID
exports.getLogById = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    if (!log) {
      return res.status(404).send();
    }
    res.send(log);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a log by ID
exports.updateLog = async (req, res) => {
  try {
    const log = await Log.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!log) {
      return res.status(404).send();
    }
    res.send(log);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a log by ID
exports.deleteLog = async (req, res) => {
  try {
    const log = await Log.findByIdAndDelete(req.params.id);
    if (!log) {
      return res.status(404).send();
    }
    res.send({ message: 'Log deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};