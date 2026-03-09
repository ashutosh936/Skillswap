const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing dummy users (optional, but good for clean state)
        // await User.deleteMany({ email: { $regex: /@dummy.com/ } });

        const salt = await bcrypt.genSalt(10);
        const hashedStaticPassword = await bcrypt.hash('password123', salt);

        const dummyUsers = [
            {
                username: 'Alex Rivera',
                email: 'alex@dummy.com',
                password: hashedStaticPassword,
                avatar: '/avatars/avatar1.png',
                skillsTaught: ['React', 'TypeScript', 'Tailwind CSS'],
                skillsLearning: ['Rust', 'Blockchain'],
                credits: 150,
                rating: 4.9,
                level: 8,
                bio: 'Lead Frontend Engineer @ TechNova. I love building performant web apps and helping others master React.',
                profileComplete: true
            },
            {
                username: 'Sarah Chen',
                email: 'sarah@dummy.com',
                password: hashedStaticPassword,
                avatar: '/avatars/avatar6.png',
                skillsTaught: ['Python', 'Data Science', 'Machine Learning'],
                skillsLearning: ['Spanish', 'UI Design'],
                credits: 200,
                rating: 4.8,
                level: 9,
                bio: 'Data Scientist with a passion for AI ethics. Let\'s dive into neural networks together!',
                profileComplete: true
            },
            {
                username: 'Marcus Thorne',
                email: 'marcus@dummy.com',
                password: hashedStaticPassword,
                avatar: '/avatars/avatar2.png',
                skillsTaught: ['Node.js', 'Kubernetes', 'AWS'],
                skillsLearning: ['Go', 'Photography'],
                credits: 120,
                rating: 4.7,
                level: 7,
                bio: 'Cloud Architect helping startups scale. Backend heavy, infrastructure focused.',
                profileComplete: true
            },
            {
                username: 'Elena Vance',
                email: 'elena@dummy.com',
                password: hashedStaticPassword,
                avatar: '/avatars/avatar3.png',
                skillsTaught: ['UI Design', 'Figma', 'User Research'],
                skillsLearning: ['React Native', 'Piano'],
                credits: 300,
                rating: 5.0,
                level: 10,
                bio: 'Design lead at a top agency. I believe in user-centric design that feels like magic.',
                profileComplete: true
            },
            {
                username: 'Dmitri Petrov',
                email: 'dmitri@dummy.com',
                password: hashedStaticPassword,
                avatar: '/avatars/avatar4.png',
                skillsTaught: ['Cybersecurity', 'Ethical Hacking', 'Linux'],
                skillsLearning: ['Public Speaking', 'Chess'],
                credits: 80,
                rating: 4.6,
                level: 6,
                bio: 'Security researcher by day, CTF player by night. Stay safe out there.',
                profileComplete: true
            },
            {
                username: 'Aisha Gupta',
                email: 'aisha@dummy.com',
                password: hashedStaticPassword,
                avatar: '/avatars/avatar5.png',
                skillsTaught: ['Web3', 'Solidity', 'Blockchain'],
                skillsLearning: ['French', 'Yoga'],
                credits: 180,
                rating: 4.9,
                level: 9,
                bio: 'Building the decentralized future. Smart contracts are my playground.',
                profileComplete: true
            },
            {
                username: 'Jordan Smith',
                email: 'jordan@dummy.com',
                password: hashedStaticPassword,
                avatar: '/avatars/avatar1.png',
                skillsTaught: ['JavaScript', 'HTML', 'CSS'],
                skillsLearning: ['React', 'Backend'],
                credits: 50,
                rating: 4.2,
                level: 3,
                bio: 'Junior Dev looking to share basics and grow with the community.',
                profileComplete: true
            },
            {
                username: 'Liam O\'Brien',
                email: 'liam@dummy.com',
                password: hashedStaticPassword,
                avatar: '/avatars/avatar2.png',
                skillsTaught: ['Go', 'Rust', 'System Design'],
                skillsLearning: ['Japanese', 'Cooking'],
                credits: 250,
                rating: 4.9,
                level: 8,
                bio: 'Performance junkie. If it\'s not fast, it\'s not done.',
                profileComplete: true
            },
            {
                username: 'Sophie Martin',
                email: 'sophie@dummy.com',
                password: hashedStaticPassword,
                avatar: '/avatars/avatar6.png',
                skillsTaught: ['Digital Marketing', 'SEO', 'Copywriting'],
                skillsLearning: ['HTML', 'Python'],
                credits: 140,
                rating: 4.5,
                level: 5,
                bio: 'Turning traffic into customers. Let\'s grow your brand together.',
                profileComplete: true
            },
            {
                username: 'Kenji Sato',
                email: 'kenji@dummy.com',
                password: hashedStaticPassword,
                avatar: '/avatars/avatar4.png',
                skillsTaught: ['DevOps', 'Docker', 'CI/CD'],
                skillsLearning: ['Spanish', 'Gardening'],
                credits: 110,
                rating: 4.7,
                level: 7,
                bio: 'Automating the world one pipeline at a time.',
                profileComplete: true
            }
        ];

        for (const user of dummyUsers) {
            const exists = await User.findOne({ email: user.email });
            if (!exists) {
                await User.create(user);
                console.log(`Created user: ${user.username}`);
            } else {
                console.log(`User already exists: ${user.username}`);
            }
        }

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedUsers();
