const User = require('../models/User');

// @desc    Get top mentors for the leaderboard
// @route   GET /api/gamification/leaderboard
// @access  Public
const getLeaderboard = async (req, res) => {
    try {
        const topMentors = await User.find({})
            .select('username rating credits level badges')
            .sort({ rating: -1, level: -1 })
            .limit(10);
            
        res.json(topMentors);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Award XP to user (Mock endpoint for completing session)
// @route   POST /api/gamification/award-xp
// @access  Private
const awardXP = async (req, res) => {
    try {
        const { xpAmount } = req.body;
        const user = await User.findById(req.user._id);
        
        if (user) {
            user.xp += xpAmount;
            
            // Level up logic (e.g. 100 XP per level)
            const newLevel = Math.floor(user.xp / 100) + 1;
            if (newLevel > user.level) {
                user.level = newLevel;
                // Auto award badge for level 5
                if (newLevel === 5 && !user.badges.some(b => b.name === 'Rising Star')) {
                    user.badges.push({ name: 'Rising Star', icon: 'star' });
                }
            }
            
            const updatedUser = await user.save();
            res.json({ xp: updatedUser.xp, level: updatedUser.level, badges: updatedUser.badges });
        } else {
             res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
         res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getLeaderboard, awardXP };
