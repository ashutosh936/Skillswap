import React, { useState } from 'react';
import { ShoppingBag, BookOpen, Clock, Star, Zap, Plus, X, CheckCircle, Users, ArrowDown, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const Marketplace = () => {
    const { user } = useAuthStore();
    const [filter, setFilter] = useState('all');
    const [unlockedItems, setUnlockedItems] = useState(new Set());
    const [localCredits, setLocalCredits] = useState(user?.credits || 150);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const products = [
        { id: 1, type: 'workshop', title: 'Advanced React Patterns', author: 'Sarah Jenkins', price: 50, rating: 4.9, thumb: 'bg-blue-500/20', icon: 'text-blue-500', duration: '2 hours', students: 1240, lessons: 8, description: 'Master render props, compound components, hooks composition, and state reducers. Build production-ready patterns used by top companies.', modules: ['Compound Components', 'Render Props 2.0', 'Custom Hooks Factory', 'State Reducers', 'Context Module Pattern', 'Prop Getters', 'Performance Patterns', 'Final Project'] },
        { id: 2, type: 'masterclass', title: 'System Design for Interviews', author: 'Alex Chen', price: 150, rating: 4.8, thumb: 'bg-emerald-500/20', icon: 'text-emerald-500', duration: '4 hours', students: 890, lessons: 12, description: 'Learn to design scalable systems like URL shorteners, chat apps, and social media feeds. Covers load balancing, caching, database sharding, and more.', modules: ['Fundamentals', 'Load Balancers', 'Caching Strategies', 'Database Design', 'CDN Architecture', 'Message Queues', 'Design: URL Shortener', 'Design: Chat System', 'Design: News Feed', 'Design: Video Streaming', 'Trade-offs Analysis', 'Mock Interview'] },
        { id: 3, type: 'resource', title: 'Full-Stack Developer Roadmap 2026', author: 'Tech Academy', price: 20, rating: 4.7, thumb: 'bg-purple-500/20', icon: 'text-purple-500', duration: 'PDF', students: 3200, lessons: 1, description: 'Complete visual roadmap for becoming a full-stack developer in 2026. Covers frontend, backend, DevOps, and cloud.', modules: ['Complete Roadmap PDF'] },
        { id: 4, type: 'workshop', title: 'Mastering Tailwind CSS', author: 'Mike Ross', price: 30, rating: 4.6, thumb: 'bg-pink-500/20', icon: 'text-pink-500', duration: '1.5 hours', students: 560, lessons: 6, description: 'From utility-first basics to advanced responsive design, animations, and custom plugins.', modules: ['Utility-First Thinking', 'Responsive Mastery', 'Dark Mode Setup', 'Custom Animations', 'Plugin Development', 'Production Build'] },
        { id: 5, type: 'masterclass', title: 'Python for Machine Learning', author: 'Dr. Chen Wei', price: 120, rating: 4.9, thumb: 'bg-yellow-500/20', icon: 'text-yellow-500', duration: '5 hours', students: 2100, lessons: 15, description: 'Complete ML pipeline from data preprocessing to model deployment. Covers scikit-learn, TensorFlow, and MLOps.', modules: ['NumPy & Pandas', 'Data Preprocessing', 'EDA Techniques', 'Regression Models', 'Classification', 'Clustering', 'Ensemble Methods', 'Neural Networks Intro', 'CNNs', 'RNNs & LSTMs', 'Transfer Learning', 'Model Evaluation', 'Hyperparameter Tuning', 'Model Deployment', 'MLOps Pipeline'] },
        { id: 6, type: 'workshop', title: 'Docker & Kubernetes Essentials', author: 'Aisha Cloud', price: 60, rating: 4.7, thumb: 'bg-cyan-500/20', icon: 'text-cyan-500', duration: '3 hours', students: 780, lessons: 10, description: 'Containerize apps and deploy to Kubernetes clusters. Covers Docker Compose, Helm charts, and scaling.', modules: ['Docker Fundamentals', 'Dockerfile Best Practices', 'Multi-Stage Builds', 'Docker Compose', 'Kubernetes Architecture', 'Pods & Services', 'Deployments', 'Helm Charts', 'Scaling Strategies', 'Production Deploy'] },
        { id: 7, type: 'resource', title: 'UI/UX Design Principles Guide', author: 'Priya Design', price: 15, rating: 4.5, thumb: 'bg-rose-500/20', icon: 'text-rose-500', duration: 'PDF', students: 1850, lessons: 1, description: 'Essential design principles every developer should know. Typography, color theory, spacing, and accessibility.', modules: ['Complete Design Guide PDF'] },
        { id: 8, type: 'masterclass', title: 'Node.js Microservices Architecture', author: 'Marcus Stack', price: 140, rating: 4.8, thumb: 'bg-green-500/20', icon: 'text-green-500', duration: '4.5 hours', students: 650, lessons: 11, description: 'Build production-grade microservices with Node.js, Docker, and message queues.', modules: ['Monolith vs Microservices', 'Service Design', 'API Gateway', 'Inter-Service Communication', 'Event-Driven Architecture', 'Message Queues (RabbitMQ)', 'Data Management', 'Service Discovery', 'Circuit Breakers', 'Monitoring & Logging', 'Deployment Pipeline'] },
        { id: 9, type: 'workshop', title: 'Next.js 15 Full Course', author: 'Kai Fullstack', price: 45, rating: 4.7, thumb: 'bg-indigo-500/20', icon: 'text-indigo-500', duration: '2.5 hours', students: 920, lessons: 8, description: 'Server components, app router, streaming, and the cutting edge of React frameworks.', modules: ['App Router Basics', 'Server Components', 'Client Components', 'Data Fetching', 'Streaming & Suspense', 'Server Actions', 'Middleware', 'Deployment'] },
        { id: 10, type: 'workshop', title: 'Web3 & Solidity Bootcamp', author: 'Sofia Web3', price: 80, rating: 4.6, thumb: 'bg-violet-500/20', icon: 'text-violet-500', duration: '3 hours', students: 420, lessons: 9, description: 'Write, test, and deploy smart contracts on Ethereum. Covers ERC-20, ERC-721, and DeFi basics.', modules: ['Blockchain Fundamentals', 'Solidity Basics', 'Smart Contract Structure', 'ERC-20 Tokens', 'ERC-721 NFTs', 'Testing with Hardhat', 'Security Best Practices', 'DeFi Protocols', 'Deployment to Mainnet'] },
        { id: 11, type: 'resource', title: 'Interview Prep Cheat Sheet Bundle', author: 'Tech Academy', price: 10, rating: 4.4, thumb: 'bg-amber-500/20', icon: 'text-amber-500', duration: 'PDF Bundle', students: 4500, lessons: 5, description: 'Data structures, algorithms, system design, behavioral — all in one printable bundle.', modules: ['DS & Algorithms', 'System Design', 'Behavioral Questions', 'SQL Cheat Sheet', 'Big-O Reference'] },
        { id: 12, type: 'masterclass', title: 'Cybersecurity Fundamentals', author: 'Yuki Security', price: 100, rating: 4.8, thumb: 'bg-red-500/20', icon: 'text-red-500', duration: '3.5 hours', students: 530, lessons: 10, description: 'From OWASP Top 10 to penetration testing. Protect your applications from real-world threats.', modules: ['Security Mindset', 'OWASP Top 10', 'XSS & CSRF', 'SQL Injection', 'Authentication Attacks', 'Network Security', 'Encryption', 'Penetration Testing', 'Security Auditing', 'Incident Response'] },
    ];

    const filteredProducts = filter === 'all' 
        ? products 
        : filter === 'library' 
            ? products.filter(p => unlockedItems.has(p.id)) 
            : products.filter(p => p.type === filter);

    const handleUnlock = (product) => {
        if (unlockedItems.has(product.id)) {
            setSelectedCourse(product);
            return;
        }
        if (localCredits >= product.price) {
            setLocalCredits(prev => prev - product.price);
            setUnlockedItems(prev => new Set(prev).add(product.id));
            setSelectedCourse(product);
        } else {
            alert("Insufficient Skill Credits! Visit the Top Up page.");
        }
    };

    return (
        <div className="pt-24 pb-12 min-h-screen relative">
             <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary-900/10 to-transparent pointer-events-none" />

             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header */}
                <motion.div 
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
                >
                    <div>
                        <h1 className="text-4xl font-extrabold text-white mb-4 flex items-center gap-3">
                            <ShoppingBag className="w-10 h-10 text-primary-500" />
                            Skill Marketplace
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl">
                            Spend your earned credits on premium workshops, masterclasses, and curated learning resources from top mentors.
                        </p>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-4 flex items-center gap-4 min-w-[200px]">
                        <div className="w-12 h-12 rounded-lg bg-yellow-500/20 text-yellow-500 flex items-center justify-center">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Your Balance</p>
                            <p className="text-2xl font-bold text-white">{localCredits}</p>
                        </div>
                        <Link to="/buy-credits" className="ml-2 p-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors border border-primary-500/50" title="Top Up">
                            <Plus className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {['all', 'workshop', 'masterclass', 'resource', 'library'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                                filter === type 
                                ? 'bg-primary-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                            }`}
                        >
                            {type === 'all' ? 'All' : type === 'library' ? 'My Library' : type + 's'}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => (
                        <motion.div 
                            key={product.id} 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all group cursor-pointer flex flex-col hover:-translate-y-1"
                            onClick={() => unlockedItems.has(product.id) && setSelectedCourse(product)}
                        >
                            <div className={`h-40 ${product.thumb} flex items-center justify-center relative overflow-hidden`}>
                                <BookOpen className={`w-16 h-16 ${product.icon} opacity-80 group-hover:scale-110 transition-transform duration-500`} />
                                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white uppercase tracking-wider">
                                    {product.type}
                                </div>
                                {unlockedItems.has(product.id) && (
                                    <div className="absolute top-3 left-3 bg-emerald-500 px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" /> Unlocked
                                    </div>
                                )}
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">{product.title}</h3>
                                <p className="text-sm text-slate-400 mb-3">by {product.author}</p>
                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-2">
                                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-current" /> {product.rating}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {product.duration}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                                    <Users className="w-3 h-3" /> {product.students.toLocaleString()} students
                                </div>
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Zap className="w-4 h-4 text-yellow-500" />
                                        <span className="text-xl font-bold text-white">{product.price}</span>
                                    </div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleUnlock(product); }}
                                        className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors ${
                                            unlockedItems.has(product.id)
                                            ? 'bg-emerald-600 hover:bg-emerald-500'
                                            : 'bg-slate-800 hover:bg-primary-600'
                                        }`}
                                    >
                                        {unlockedItems.has(product.id) ? 'View Course' : 'Unlock'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

             </div>

            {/* Course Detail Modal */}
            <AnimatePresence>
                {selectedCourse && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedCourse(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            className="bg-dark-card border border-dark-border rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={`h-48 ${selectedCourse.thumb} flex items-center justify-center relative`}>
                                <BookOpen className={`w-20 h-20 ${selectedCourse.icon} opacity-60`} />
                                <button onClick={() => setSelectedCourse(null)} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70">
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-white uppercase">{selectedCourse.type}</div>
                            </div>
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-white mb-2">{selectedCourse.title}</h2>
                                <p className="text-slate-400 mb-1">by {selectedCourse.author}</p>
                                <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-current" /> {selectedCourse.rating}</span>
                                    <span>{selectedCourse.duration}</span>
                                    <span>{selectedCourse.students.toLocaleString()} students</span>
                                    <span>{selectedCourse.lessons} lessons</span>
                                </div>
                                <p className="text-slate-300 mb-8 leading-relaxed">{selectedCourse.description}</p>
                                <h3 className="text-lg font-bold text-white mb-6">Learning Path Roadmap</h3>
                                <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[1.2rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary-500 before:via-slate-700 before:to-transparent">
                                    {selectedCourse.modules.map((mod, i) => (
                                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-4">
                                            {/* Center dot/number node */}
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-dark-card bg-slate-800 text-slate-400 group-hover:bg-primary-500 group-hover:text-dark-card group-hover:border-primary-500/30 transition-all font-bold text-sm shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                                {i + 1}
                                            </div>

                                            {/* Roadmap Card */}
                                            <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-slate-900/50 border border-slate-800/50 group-hover:border-primary-500/50 transition-colors shadow">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs font-bold text-primary-500 uppercase flex items-center gap-1"><Target className="w-3 h-3" /> Step {i + 1}</span>
                                                    {unlockedItems.has(selectedCourse.id) && <CheckCircle className="w-4 h-4 text-emerald-500 opacity-50" />}
                                                </div>
                                                <h4 className="text-sm font-bold text-white mb-2">{mod}</h4>
                                                <p className="text-xs text-slate-400">Master the core concepts of {mod.toLowerCase()} through carefully structured materials and exercises.</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Marketplace;
