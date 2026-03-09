const express = require('express');
const router = express.Router();
const { updateUserSkills, addCredits, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.put('/profile/skills', protect, updateUserSkills);
router.put('/profile/credits', protect, addCredits);
router.post('/update-profile', protect, updateProfile);

module.exports = router;
