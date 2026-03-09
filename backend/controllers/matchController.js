const User = require('../models/User');

// @desc    Get all mentors providing a specific skill or just explore
// @route   GET /api/match/explore
// @access  Private
const exploreMentors = async (req, res) => {
    try {
        const { skill, minRating, minLevel } = req.query;

        let query = {};
        
        // Exclude the current user from the results
        query._id = { $ne: req.user._id };

        if (skill) {
            // Find users who have this skill in their skillsTaught array
            query.skillsTaught = { $regex: new RegExp(skill, 'i') };
        } else {
            // Find users who can teach at least 1 thing
            query['skillsTaught.0'] = { $exists: true };
        }

        if (minRating) {
            query.rating = { $gte: parseFloat(minRating) };
        }

        if (minLevel) {
            query.level = { $gte: parseInt(minLevel) };
        }

        // Return users sorted by highest rating first
        const mentors = await User.find(query)
            .select('-password -skillsLearning')
            .sort({ rating: -1 })
            .limit(20);

        res.json(mentors);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get top recommended matches based on user's skillsLearning
// @route   GET /api/match/recommendations
// @access  Private
const getRecommendations = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);
        const { skillsLearning } = currentUser;

        if (!skillsLearning || skillsLearning.length === 0) {
            return res.json([]);
        }

        // Logic: Find users who teach what the current user wants to learn
        // This simulates a matchmaker. 
        // More advanced logic would involve OpenAI embeddings here.
        const recommendations = await User.find({
            _id: { $ne: currentUser._id },
            skillsTaught: { $in: skillsLearning }
        })
        .select('-password')
        .sort({ rating: -1, credits: -1 }) // prioritize highly rated/active mentors
        .limit(10);

        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { exploreMentors, getRecommendations };
