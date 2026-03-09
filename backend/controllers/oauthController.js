const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const axios = require('axios');

// @desc    Google OAuth - exchange code/token for user
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
    try {
        const { accessToken } = req.body;

        // Verify the token with Google
        const googleRes = await axios.get(
            `https://www.googleapis.com/oauth2/v3/userinfo`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const { sub: googleId, email, name, picture } = googleRes.data;

        // Check if user already exists with this Google ID
        let user = await User.findOne({ googleId });

        if (!user) {
            // Check if user exists with same email (link accounts)
            user = await User.findOne({ email });
            if (user) {
                user.googleId = googleId;
                user.avatar = picture || user.avatar;
                user.authProvider = 'google';
                await user.save();
            } else {
                // Create new user
                // Generate a unique username from the name
                const baseUsername = name.replace(/\s+/g, '').toLowerCase();
                let username = baseUsername;
                let counter = 1;
                while (await User.findOne({ username })) {
                    username = `${baseUsername}${counter}`;
                    counter++;
                }

                user = await User.create({
                    username,
                    email,
                    googleId,
                    avatar: picture,
                    authProvider: 'google',
                    credits: 100, // Welcome bonus for social signups
                });
            }
        }

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            credits: user.credits,
            avatar: user.avatar,
            authProvider: user.authProvider,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error('--- Google Auth Failure Detailed Log ---');
        console.error('Error Message:', error.message);
        if (error.response) {
            console.error('Google Response Status:', error.response.status);
            console.error('Google Response Data:', JSON.stringify(error.response.data, null, 2));
        }
        console.error('Request Body Snippet:', req.body?.accessToken ? 'accessToken present' : 'accessToken MISSING');
        console.error('---------------------------------------');
        res.status(401).json({ 
            message: 'Google authentication failed', 
            details: error.response?.data?.error_description || error.message 
        });
    }
};

// @desc    GitHub OAuth - exchange code for user
// @route   POST /api/auth/github
// @access  Public
const githubAuth = async (req, res) => {
    try {
        const { code } = req.body;

        // Exchange code for access token
        const tokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            { headers: { Accept: 'application/json' } }
        );

        const { access_token } = tokenResponse.data;

        if (!access_token) {
            return res.status(401).json({ message: 'GitHub token exchange failed' });
        }

        // Get user info from GitHub
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const { id: githubId, login, avatar_url } = userResponse.data;

        // Get user email (may be private)
        const emailResponse = await axios.get('https://api.github.com/user/emails', {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const primaryEmail = emailResponse.data.find(e => e.primary)?.email || `${login}@github.com`;

        // Check if user already exists with this GitHub ID
        let user = await User.findOne({ githubId: String(githubId) });

        if (!user) {
            // Check if user exists with same email (link accounts)
            user = await User.findOne({ email: primaryEmail });
            if (user) {
                user.githubId = String(githubId);
                user.avatar = avatar_url || user.avatar;
                user.authProvider = 'github';
                await user.save();
            } else {
                // Create new user
                let username = login;
                let counter = 1;
                while (await User.findOne({ username })) {
                    username = `${login}${counter}`;
                    counter++;
                }

                user = await User.create({
                    username,
                    email: primaryEmail,
                    githubId: String(githubId),
                    avatar: avatar_url,
                    authProvider: 'github',
                    credits: 100, // Welcome bonus for social signups
                });
            }
        }

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            credits: user.credits,
            avatar: user.avatar,
            authProvider: user.authProvider,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error('GitHub Auth Error:', error.response?.data || error.message);
        res.status(401).json({ message: 'GitHub authentication failed' });
    }
};

module.exports = { googleAuth, githubAuth };
