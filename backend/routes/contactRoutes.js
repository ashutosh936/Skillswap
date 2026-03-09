const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @desc    Submit a new contact form message
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        const newContact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({ message: 'Contact form submitted successfully', data: newContact });
    } catch (error) {
        console.error('Contact form submission error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
