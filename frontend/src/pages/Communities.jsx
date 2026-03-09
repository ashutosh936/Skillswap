import React, { useState } from 'react';
import { Users, Code, PenTool, Database, Globe, Cpu, MessageCircle, BookOpen, Trophy, ChevronLeft, Search, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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

const Communities = () => {
    const [joinedCommunities, setJoinedCommunities] = useState(new Set());
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [chatInput, setChatInput] = useState('');
    const navigate = useNavigate();

    const mockCommunities = [
        { 
            id: 1, name: "React Enthusiasts", members: 1240, icon: <Code />, color: "border-blue-500/50", bg: "bg-blue-500/10", text: "text-blue-500", gradient: "from-blue-600/20 to-blue-900/40",
            description: "The largest React community on SkillSwap. Discuss hooks, components, performance optimization, and the latest React ecosystem updates.",
            courses: [
                { title: "Advanced React Patterns", duration: "2h", level: "Advanced" },
                { title: "React Performance Deep Dive", duration: "1.5h", level: "Intermediate" },
                { title: "Building Design Systems with React", duration: "3h", level: "Advanced" },
            ],
            discussions: [
                { user: "aneka_dev", avatar: AVATARS[0], msg: "Has anyone tried React 19 server components in production? I'm seeing 40% faster TTFB!", time: "2m ago" },
                { user: "kai_fullstack", avatar: AVATARS[5], msg: "useOptimistic is a game changer for forms. Here's my implementation pattern:", time: "15m ago" },
                { user: "priya_design", avatar: AVATARS[2], msg: "Just published a Figma-to-React workflow guide. Check the resources tab!", time: "1h ago" },
            ],
            topMembers: [
                { name: "aneka_dev", avatar: AVATARS[0], xp: 2400, badge: "⚛️" },
                { name: "kai_fullstack", avatar: AVATARS[5], xp: 2100, badge: "💪" },
                { name: "priya_design", avatar: AVATARS[2], xp: 1650, badge: "🎨" },
            ]
        },
        { 
            id: 2, name: "Node.js Backend", members: 890, icon: <Database />, color: "border-emerald-500/50", bg: "bg-emerald-500/10", text: "text-emerald-500", gradient: "from-emerald-600/20 to-emerald-900/40",
            description: "Everything backend: APIs, databases, microservices, and server architecture. Share your Express/Fastify/Nest.js builds.",
            courses: [
                { title: "Microservices with Node.js", duration: "4h", level: "Advanced" },
                { title: "MongoDB Aggregation Mastery", duration: "2h", level: "Intermediate" },
                { title: "REST to GraphQL Migration", duration: "1.5h", level: "Intermediate" },
            ],
            discussions: [
                { user: "marcus_stack", avatar: AVATARS[1], msg: "Here's my production-ready Docker + Node.js template: github.com/marcus/node-docker-prod", time: "5m ago" },
                { user: "aisha_cloud", avatar: AVATARS[6], msg: "Pro tip: Use pino instead of winston for 5x faster logging in high-throughput APIs.", time: "30m ago" },
                { user: "chen_ai", avatar: AVATARS[3], msg: "Anyone integrated LangChain with Express? I built a RAG API endpoint worth sharing.", time: "2h ago" },
            ],
            topMembers: [
                { name: "marcus_stack", avatar: AVATARS[1], xp: 1980, badge: "🔧" },
                { name: "aisha_cloud", avatar: AVATARS[6], xp: 1800, badge: "☁️" },
                { name: "chen_ai", avatar: AVATARS[3], xp: 3100, badge: "🤖" },
            ]
        },
        { 
            id: 3, name: "UI/UX Designers", members: 560, icon: <PenTool />, color: "border-pink-500/50", bg: "bg-pink-500/10", text: "text-pink-500", gradient: "from-pink-600/20 to-pink-900/40",
            description: "Design critiques, Figma tips, UX research methods, and portfolio reviews. Designers helping designers grow.",
            courses: [
                { title: "Figma Advanced Prototyping", duration: "2h", level: "Intermediate" },
                { title: "UX Research Methods", duration: "3h", level: "Beginner" },
            ],
            discussions: [
                { user: "priya_design", avatar: AVATARS[2], msg: "New trend alert: Bento grid layouts are everywhere in 2026. Here's my collection 👀", time: "10m ago" },
                { user: "zara_data", avatar: AVATARS[9], msg: "How do you handle design handoff with developers? Looking for better workflows.", time: "45m ago" },
            ],
            topMembers: [
                { name: "priya_design", avatar: AVATARS[2], xp: 1650, badge: "🎨" },
                { name: "zara_data", avatar: AVATARS[9], xp: 900, badge: "📊" },
            ]
        },
        { 
            id: 4, name: "Web3 & Blockchain", members: 420, icon: <Globe />, color: "border-purple-500/50", bg: "bg-purple-500/10", text: "text-purple-500", gradient: "from-purple-600/20 to-purple-900/40",
            description: "Smart contracts, DeFi protocols, NFTs 2.0, and the decentralized future. Build the next generation of the internet.",
            courses: [
                { title: "Solidity from Zero to Hero", duration: "5h", level: "Beginner" },
                { title: "DeFi Protocol Architecture", duration: "3h", level: "Advanced" },
            ],
            discussions: [
                { user: "sofia_web3", avatar: AVATARS[4], msg: "Just deployed my first ERC-4337 account abstraction contract. The UX improvement is incredible!", time: "20m ago" },
            ],
            topMembers: [
                { name: "sofia_web3", avatar: AVATARS[4], xp: 1200, badge: "🌐" },
            ]
        },
        { 
            id: 5, name: "Machine Learning", members: 1050, icon: <Cpu />, color: "border-orange-500/50", bg: "bg-orange-500/10", text: "text-orange-500", gradient: "from-orange-600/20 to-orange-900/40",
            description: "From classical ML to deep learning and LLMs. Share papers, notebooks, and production ML pipelines.",
            courses: [
                { title: "LLM Fine-tuning Guide", duration: "3h", level: "Advanced" },
                { title: "ML Pipeline with Python", duration: "4h", level: "Intermediate" },
                { title: "RAG Systems Architecture", duration: "2h", level: "Advanced" },
            ],
            discussions: [
                { user: "chen_ai", avatar: AVATARS[3], msg: "Fine-tuned a LLaMA model on our platform data. Results are surprisingly good for mentorship matching!", time: "1h ago" },
                { user: "zara_data", avatar: AVATARS[9], msg: "Great intro tutorial for anyone switching from data analysis to ML. pandas → scikit-learn path.", time: "3h ago" },
            ],
            topMembers: [
                { name: "chen_ai", avatar: AVATARS[3], xp: 3100, badge: "🤖" },
                { name: "zara_data", avatar: AVATARS[9], xp: 900, badge: "📊" },
            ]
        },
        { 
            id: 6, name: "DevOps & Cloud", members: 2100, icon: <Users />, color: "border-primary-500/50", bg: "bg-primary-500/10", text: "text-primary-500", gradient: "from-primary-600/20 to-primary-900/40",
            description: "CI/CD, Infrastructure as Code, Kubernetes, and cloud-native architecture. Automate everything.",
            courses: [
                { title: "AWS Solutions Architect Prep", duration: "6h", level: "Advanced" },
                { title: "Terraform in Production", duration: "3h", level: "Intermediate" },
            ],
            discussions: [
                { user: "aisha_cloud", avatar: AVATARS[6], msg: "New video: How I reduced our AWS bill by 60% with spot instances and Graviton3. Link in resources.", time: "4h ago" },
                { user: "marcus_stack", avatar: AVATARS[1], msg: "GitHub Actions vs Jenkins vs CircleCI — my honest comparison after using all three in production.", time: "6h ago" },
            ],
            topMembers: [
                { name: "aisha_cloud", avatar: AVATARS[6], xp: 1800, badge: "☁️" },
                { name: "marcus_stack", avatar: AVATARS[1], xp: 1980, badge: "🔧" },
            ]
        },
    ];

    const toggleJoin = (id) => {
        setJoinedCommunities(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    // Community Detail View
    if (selectedCommunity) {
        const c = selectedCommunity;
        return (
            <div className="pt-24 pb-12 min-h-screen relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.button 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        onClick={() => setSelectedCommunity(null)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors font-medium text-sm border border-slate-700/50 bg-slate-800/50 px-4 py-2 rounded-lg"
                    >
                        <ChevronLeft className="w-5 h-5" /> Back to Communities
                    </motion.button>

                    {/* Community Header */}
                    <motion.div 
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={`bg-gradient-to-r ${c.gradient} border ${c.color} rounded-2xl p-8 mb-8`}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-16 h-16 rounded-2xl ${c.bg} ${c.text} flex items-center justify-center`}>
                                {React.cloneElement(c.icon, { className: "w-8 h-8" })}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">{c.name}</h1>
                                <p className="text-slate-400">{c.members + (joinedCommunities.has(c.id) ? 1 : 0)} members</p>
                            </div>
                        </div>
                        <p className="text-slate-300 max-w-3xl mb-6">{c.description}</p>
                        <button 
                            onClick={() => navigate(`/video-room?room=${c.name.toLowerCase().replace(/\s+/g, '-')}`)}
                            className="bg-primary-600 hover:bg-primary-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2"
                        >
                            Join Live Video Room
                        </button>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Discussion Feed */}
                        <motion.div 
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 bg-dark-card border border-dark-border rounded-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-dark-border">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5 text-primary-500" />
                                    Live Discussion
                                </h2>
                            </div>
                            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                                {c.discussions.map((d, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        className="flex gap-3"
                                    >
                                        <img 
                                            src={d.avatar} 
                                            alt={d.user} 
                                            className="w-10 h-10 rounded-full border border-slate-700 flex-shrink-0 bg-slate-800 cursor-pointer hover:border-primary-500 transition-colors" 
                                            onClick={() => navigate(`/explore?skill=${d.user.split('_')[0]}`)}
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span 
                                                    className="font-medium text-white text-sm cursor-pointer hover:text-primary-400 transition-colors"
                                                    onClick={() => navigate(`/explore?skill=${d.user.split('_')[0]}`)}
                                                >
                                                    @{d.user}
                                                </span>
                                                <span className="text-xs text-slate-500">{d.time}</span>
                                            </div>
                                            <p className="text-sm text-slate-300 bg-slate-800/50 p-3 rounded-xl rounded-tl-sm">
                                                {d.msg.split(' ').map((word, idx) => (
                                                    word.startsWith('@') ? (
                                                        <span key={idx} className="text-primary-400 font-bold cursor-pointer hover:underline" onClick={() => navigate(`/explore?skill=${word.substring(1)}`)}>{word} </span>
                                                    ) : word + ' '
                                                ))}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-dark-border">
                                <form onSubmit={(e) => { e.preventDefault(); setChatInput(''); }} className="flex gap-2">
                                    <input 
                                        value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Type a message..." 
                                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary-500"
                                    />
                                    <button type="submit" className="p-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors">
                                        <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Recommended Courses */}
                            <motion.div 
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="bg-dark-card border border-dark-border rounded-2xl p-6"
                            >
                                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                                    <BookOpen className="w-4 h-4 text-primary-500" />
                                    Recommended Courses
                                </h3>
                                <div className="space-y-3">
                                    {c.courses.map((course, i) => (
                                        <div key={i} className="p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700/30">
                                            <p className="font-medium text-white text-sm">{course.title}</p>
                                            <div className="flex gap-3 mt-1 text-xs text-slate-500">
                                                <span>⏱ {course.duration}</span>
                                                <span className={`${course.level === 'Advanced' ? 'text-red-400' : course.level === 'Intermediate' ? 'text-yellow-400' : 'text-emerald-400'}`}>
                                                    {course.level}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Top Members */}
                            <motion.div 
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="bg-dark-card border border-dark-border rounded-2xl p-6"
                            >
                                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                                    <Trophy className="w-4 h-4 text-yellow-500" />
                                    Top Members
                                </h3>
                                <div className="space-y-3">
                                    {c.topMembers.map((m, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-slate-500 w-4">#{i + 1}</span>
                                            <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full border border-slate-700 bg-slate-800" />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-white">{m.name} {m.badge}</p>
                                                <p className="text-xs text-slate-500">{m.xp} XP</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Community Grid View
    return (
        <div className="pt-24 pb-12 min-h-screen relative">
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-extrabold text-white mb-4">Community Spaces</h1>
                    <p className="text-lg text-slate-400 max-w-2xl">
                        Join skill-specific communities to find your tribe. Ask questions, share resources, and form teams for side projects.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCommunities.map((community, index) => (
                        <motion.div 
                            key={community.id} 
                            initial={{ opacity: 0, y: 40, rotateX: 10 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`bg-dark-card border ${community.color} rounded-2xl p-6 transition-all group hover:shadow-xl hover:shadow-${community.text.split('-')[1]}-500/5 ${joinedCommunities.has(community.id) ? 'hover:-translate-y-2 cursor-pointer' : ''}`}
                            onClick={() => {
                                if (joinedCommunities.has(community.id)) {
                                    setSelectedCommunity(community);
                                }
                            }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-14 h-14 rounded-2xl ${community.bg} ${community.text} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                   {React.cloneElement(community.icon, { className: "w-7 h-7" })}
                                </div>
                                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-medium">
                                    {community.members + (joinedCommunities.has(community.id) ? 1 : 0)} Members
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                                {community.name}
                            </h3>
                            <p className="text-sm text-slate-400 mb-4 line-clamp-2">{community.description}</p>

                            {/* Mini avatars preview */}
                            <div className="flex items-center gap-1 mb-4">
                                {community.topMembers.slice(0, 3).map((m, i) => (
                                    <img key={i} src={m.avatar} alt="" className="w-7 h-7 rounded-full border-2 border-dark-card -ml-1 first:ml-0 bg-slate-800" />
                                ))}
                                <span className="text-xs text-slate-500 ml-2">{community.discussions.length} active discussions</span>
                            </div>

                            <button 
                                onClick={(e) => { e.stopPropagation(); toggleJoin(community.id); }}
                                className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                                    joinedCommunities.has(community.id)
                                    ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg'
                                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-transparent'
                                }`}
                            >
                                {joinedCommunities.has(community.id) ? 'Open Group →' : 'Join Group'}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Collaboration Hub */}
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 bg-gradient-to-r from-primary-900/40 to-slate-900 border border-primary-500/30 rounded-2xl p-8 text-center relative overflow-hidden"
                >
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 blur-[50px] rounded-full" />
                     <h2 className="text-2xl font-bold text-white mb-4">Looking to Build a Project?</h2>
                     <p className="text-slate-300 max-w-2xl mx-auto mb-6">
                        The Collaboration Hub helps you find teammates for hackathons, open source, or startup ideas based on complementary skills.
                     </p>
                     <button 
                         onClick={() => alert("Creating a multi-step project submission form... This feature will launch soon! Stay tuned.")}
                         className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95"
                     >
                        Create a Project Team
                     </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Communities;
