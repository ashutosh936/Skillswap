const express = require('express');
const router = express.Router();
const { getLeaderboard, awardXP } = require('../controllers/gamificationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/leaderboard', getLeaderboard);
router.post('/award-xp', protect, awardXP);

module.exports = router;
