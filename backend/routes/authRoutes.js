const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');
const { googleAuth, githubAuth } = require('../controllers/oauthController');

router.post('/register', registerUser);
router.post('/login', authUser);

// OAuth Routes
router.post('/google', googleAuth);
router.post('/github', githubAuth);

module.exports = router;
