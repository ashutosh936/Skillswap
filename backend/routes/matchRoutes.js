const express = require('express');
const router = express.Router();
const { exploreMentors, getRecommendations } = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');

router.get('/explore', protect, exploreMentors);
router.get('/recommendations', protect, getRecommendations);

module.exports = router;
