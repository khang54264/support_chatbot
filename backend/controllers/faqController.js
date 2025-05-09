const Faq = require('../models/faq');

// Create a new faq
exports.createFaq = async (req, res) => {
  try {
    const faq = new Faq(req.body);
    await faq.save();
    res.status(201).send(faq);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all faqs
exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find({});
    res.send(faqs);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a faq by ID
exports.getFaqById = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).send();
    }
    res.send(faq);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a faq by ID
exports.updateFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) {
      return res.status(404).send();
    }
    res.send(faq);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a faq by ID
exports.deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).send();
    }
    res.send({ message: 'Faq deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};