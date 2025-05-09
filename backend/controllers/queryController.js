const Query = require('../models/query');

// Create a new query
exports.createQuery = async (req, res) => {
  try {
    const query = new Query(req.body);
    await query.save();
    res.status(201).send(query);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all queries
exports.getAllQueries = async (req, res) => {
  try {
    const queries = await Query.find({});
    res.send(queries);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a query by ID
exports.getQueryById = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) {
      return res.status(404).send();
    }
    res.send(query);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a query by ID
exports.updateQuery = async (req, res) => {
  try {
    const query = await Query.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!query) {
      return res.status(404).send();
    }
    res.send(query);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a query by ID
exports.deleteQuery = async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);
    if (!query) {
      return res.status(404).send();
    }
    res.send({ message: 'Query deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};