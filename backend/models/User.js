const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: false, // Not required for OAuth users
    },
    mobileNumber: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    authOTP: {
        type: String,
        select: false, // Don't return this by default
    },
    authOTPExpires: {
        type: Date,
        select: false,
    },
    // OAuth Provider IDs
    googleId: { type: String, default: null },
    githubId: { type: String, default: null },
    avatar: { type: String, default: null },
    authProvider: { type: String, enum: ['local', 'google', 'github'], default: 'local' },
    skillsTaught: [{
        type: String,
    }],
    skillsLearning: [{
        type: String,
    }],
    credits: {
        type: Number,
        default: 0, // Starts with 0 or small number of credits
    },
    rating: {
        type: Number,
        default: 0,
    },
    // Gamification Features
    level: {
        type: Number,
        default: 1
    },
    xp: {
        type: Number,
        default: 0
    },
    currentStreak: {
        type: Number,
        default: 0
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    badges: [{
        name: String,
        icon: String, // String representation of an icon name or URL
        earnedAt: { type: Date, default: Date.now }
    }],
    profileComplete: {
        type: Boolean,
        default: false,
    },
    bio: {
        type: String,
        default: ""
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
