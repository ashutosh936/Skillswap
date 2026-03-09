require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const AVATARS = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&backgroundColor=b6e3f4',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=c0aede',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=ffd5dc',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Chen&backgroundColor=d1f4e0',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia&backgroundColor=ffdfbf',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Kai&backgroundColor=b6e3f4',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha&backgroundColor=c0aede',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam&backgroundColor=ffd5dc',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki&backgroundColor=d1f4e0',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Zara&backgroundColor=ffdfbf',
];

const dummyMentors = [
    {
        username: 'aneka_dev',
        email: 'aneka@skillswap.dev',
        password: 'password123',
        skillsTaught: ['React', 'TypeScript', 'Next.js'],
        skillsLearning: ['Rust', 'System Design'],
        credits: 450,
        rating: 4.9,
        level: 8,
        xp: 2400,
        currentStreak: 14,
        avatar: AVATARS[0],
        authProvider: 'local',
        badges: [
            { name: 'Top Mentor', icon: '🏆' },
            { name: 'React Master', icon: '⚛️' },
        ],
    },
    {
        username: 'marcus_stack',
        email: 'marcus@skillswap.dev',
        password: 'password123',
        skillsTaught: ['Node.js', 'MongoDB', 'Express', 'Docker'],
        skillsLearning: ['Kubernetes', 'AWS'],
        credits: 320,
        rating: 4.8,
        level: 7,
        xp: 1980,
        currentStreak: 7,
        avatar: AVATARS[1],
        authProvider: 'local',
        badges: [
            { name: 'Backend Pro', icon: '🔧' },
        ],
    },
    {
        username: 'priya_design',
        email: 'priya@skillswap.dev',
        password: 'password123',
        skillsTaught: ['UI Design', 'Figma', 'Design Systems'],
        skillsLearning: ['React', 'Framer Motion'],
        credits: 280,
        rating: 4.7,
        level: 6,
        xp: 1650,
        currentStreak: 21,
        avatar: AVATARS[2],
        authProvider: 'local',
        badges: [
            { name: 'Design Guru', icon: '🎨' },
            { name: '21-Day Streak', icon: '🔥' },
        ],
    },
    {
        username: 'chen_ai',
        email: 'chen@skillswap.dev',
        password: 'password123',
        skillsTaught: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
        skillsLearning: ['LLMs', 'LangChain'],
        credits: 520,
        rating: 4.9,
        level: 9,
        xp: 3100,
        currentStreak: 30,
        avatar: AVATARS[3],
        authProvider: 'local',
        badges: [
            { name: 'AI Pioneer', icon: '🤖' },
            { name: 'Top 1%', icon: '🥇' },
            { name: '30-Day Streak', icon: '🔥' },
        ],
    },
    {
        username: 'sofia_web3',
        email: 'sofia@skillswap.dev',
        password: 'password123',
        skillsTaught: ['Solidity', 'Web3', 'Blockchain', 'Smart Contracts'],
        skillsLearning: ['Rust', 'Zero Knowledge'],
        credits: 380,
        rating: 4.6,
        level: 5,
        xp: 1200,
        currentStreak: 5,
        avatar: AVATARS[4],
        authProvider: 'local',
        badges: [
            { name: 'Web3 Builder', icon: '🌐' },
        ],
    },
    {
        username: 'kai_fullstack',
        email: 'kai@skillswap.dev',
        password: 'password123',
        skillsTaught: ['JavaScript', 'React', 'Node.js', 'PostgreSQL'],
        skillsLearning: ['Go', 'GraphQL'],
        credits: 410,
        rating: 4.8,
        level: 7,
        xp: 2100,
        currentStreak: 10,
        avatar: AVATARS[5],
        authProvider: 'local',
        badges: [
            { name: 'Full-Stack Hero', icon: '💪' },
            { name: 'Community Leader', icon: '👥' },
        ],
    },
    {
        username: 'aisha_cloud',
        email: 'aisha@skillswap.dev',
        password: 'password123',
        skillsTaught: ['AWS', 'DevOps', 'CI/CD', 'Terraform'],
        skillsLearning: ['Platform Engineering', 'Pulumi'],
        credits: 290,
        rating: 4.7,
        level: 6,
        xp: 1800,
        currentStreak: 12,
        avatar: AVATARS[6],
        authProvider: 'local',
        badges: [
            { name: 'Cloud Architect', icon: '☁️' },
        ],
    },
    {
        username: 'liam_mobile',
        email: 'liam@skillswap.dev',
        password: 'password123',
        skillsTaught: ['React Native', 'Flutter', 'iOS', 'Swift'],
        skillsLearning: ['Kotlin', 'AR Development'],
        credits: 340,
        rating: 4.5,
        level: 5,
        xp: 1100,
        currentStreak: 3,
        avatar: AVATARS[7],
        authProvider: 'local',
        badges: [
            { name: 'Mobile Expert', icon: '📱' },
        ],
    },
    {
        username: 'yuki_security',
        email: 'yuki@skillswap.dev',
        password: 'password123',
        skillsTaught: ['Cybersecurity', 'Ethical Hacking', 'Network Security'],
        skillsLearning: ['Cloud Security', 'Zero Trust'],
        credits: 260,
        rating: 4.8,
        level: 6,
        xp: 1750,
        currentStreak: 8,
        avatar: AVATARS[8],
        authProvider: 'local',
        badges: [
            { name: 'Security Shield', icon: '🛡️' },
        ],
    },
    {
        username: 'zara_data',
        email: 'zara@skillswap.dev',
        password: 'password123',
        skillsTaught: ['SQL', 'Data Analysis', 'Power BI', 'Excel'],
        skillsLearning: ['Python', 'Machine Learning'],
        credits: 200,
        rating: 4.6,
        level: 4,
        xp: 900,
        currentStreak: 6,
        avatar: AVATARS[9],
        authProvider: 'local',
        badges: [
            { name: 'Data Wizard', icon: '📊' },
        ],
    },
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Remove only seed users (not real users)
        const seedEmails = dummyMentors.map(m => m.email);
        await User.deleteMany({ email: { $in: seedEmails } });
        console.log('🗑️  Cleared old seed data');

        // Hash passwords and create users
        for (const mentor of dummyMentors) {
            const salt = await bcrypt.genSalt(10);
            mentor.password = await bcrypt.hash(mentor.password, salt);
        }

        await User.insertMany(dummyMentors);
        console.log(`✅ Seeded ${dummyMentors.length} mentor profiles!`);

        // Print summary
        dummyMentors.forEach(m => {
            console.log(`   👤 ${m.username} — teaches: ${m.skillsTaught.join(', ')}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error.message);
        process.exit(1);
    }
}

seedDatabase();
