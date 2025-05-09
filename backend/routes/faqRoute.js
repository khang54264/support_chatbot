const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// Create a new faq
router.post('/faqs', faqController.createFaq);

// Get all faqs
router.get('/faqs', faqController.getAllFaqs);

// Get a faq by ID
router.get('/faqs/:id', faqController.getFaqById);

// Update a faq by ID
router.put('/faqs/:id', faqController.updateFaq);

// Delete a faq by ID
router.delete('/faqs/:id', faqController.deleteFaq);

module.exports = router;