const User = require('../models/User');

// @desc    Update user profile skills
// @route   PUT /api/users/profile/skills
// @access  Private
const updateUserSkills = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.skillsTaught = req.body.skillsTaught || user.skillsTaught;
            user.skillsLearning = req.body.skillsLearning || user.skillsLearning;
            
            // Basic logic: if they add at least 1 skill taught and 1 learned, profile is complete.
            if (user.skillsTaught.length > 0 && user.skillsLearning.length > 0) {
                user.profileComplete = true;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                credits: updatedUser.credits,
                rating: updatedUser.rating,
                skillsTaught: updatedUser.skillsTaught,
                skillsLearning: updatedUser.skillsLearning,
                profileComplete: updatedUser.profileComplete,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Add credits to a user (Mock integration before Stripe)
// @route   PUT /api/users/profile/credits
// @access  Private
const addCredits = async (req, res) => {
    try {
         const { amount } = req.body;
         const user = await User.findById(req.user._id);
         
         if(user) {
             user.credits += Number(amount);
             const updatedUser = await user.save();
             res.json({ credits: updatedUser.credits });
         } else {
             res.status(404).json({ message: 'User not found' });
         }
    } catch(error) {
         res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update user profile (avatar, bio, etc.)
// @route   POST /api/users/update-profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.avatar = req.body.avatar || user.avatar;
            user.bio = req.body.bio || user.bio;
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
                bio: updatedUser.bio,
                credits: updatedUser.credits
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('--- Update Profile CRASH ---');
        console.error('Error:', error);
        console.error('Request Body:', req.body);
        console.error('User ID:', req.user?._id);
        console.error('---------------------------');
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { updateUserSkills, addCredits, updateProfile };
