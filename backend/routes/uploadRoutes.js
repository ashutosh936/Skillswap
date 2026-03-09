const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

// @desc    Upload avatar image
// @route   POST /api/upload/avatar
// @access  Private
router.post('/avatar', protect, upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Update user's avatar in DB
        const user = await User.findById(req.user._id);
        user.avatar = req.file.path; // Cloudinary URL
        await user.save();

        res.json({
            message: 'Avatar uploaded successfully',
            avatar: req.file.path,
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
});

module.exports = router;
