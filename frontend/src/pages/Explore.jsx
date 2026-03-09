import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Search, Filter, Star, MapPin, Zap, MessageSquare, Award, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/authStore';
import MentorProfileModal from '../components/MentorProfileModal';

const Explore = () => {
  const { token } = useAuthStore();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [minLevel, setMinLevel] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const categories = ['All', 'React', 'Node.js', 'UI Design', 'Python', 'Web3', 'Blockchain', 'AWS', 'Security'];

  const fetchMentors = useCallback(async (query = '') => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // Using relative path for the API URL as configured in api.js
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      let url = `${baseUrl}/api/match/explore?`;
      if (query) url += `skill=${encodeURIComponent(query)}&`;
      if (minRating) url += `minRating=${minRating}&`;
      if (minLevel) url += `minLevel=${minLevel}&`;
      
      const response = await axios.get(url, config);
      setMentors(response.data);
    } catch (error) {
      console.error('Failed to fetch mentors', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchMentors(selectedCategory === 'All' ? '' : selectedCategory);
  }, [fetchMentors, selectedCategory, minRating, minLevel]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMentors(searchQuery);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-900/10 blur-[150px] rounded-full point-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-900/10 blur-[120px] rounded-full point-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12 text-center md:text-left"
        >
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-200 to-primary-500 mb-4">
            Explore Experts
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl">
            Ignite your career by connecting with industry leaders. Master new skills through personalized 1-on-1 mentorship.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto md:mx-0">
            <form onSubmit={handleSearch} className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-6 h-6 group-focus-within:text-primary-500 transition-colors" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by skill (e.g. React, UI/UX, Rust...)" 
                className="w-full bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all shadow-2xl"
              />
            </form>
            <div className="flex gap-2">
              <button 
                onClick={handleSearch}
                className="px-8 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 whitespace-nowrap"
              >
                Find Mentors
              </button>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`p-4 rounded-2xl border transition-all flex items-center gap-2 ${showFilters ? 'bg-primary-500 border-primary-400 text-white' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white'}`}
              >
                <Filter className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Category Quick Chips */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat 
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
                  : 'bg-slate-800/40 text-slate-500 border border-slate-800 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Available Mentors <span className="text-primary-400 text-sm font-medium bg-primary-500/10 px-2 py-0.5 rounded-md border border-primary-500/20">{mentors.length}</span>
            </h2>
            <div className="text-sm text-slate-500">
                Sorted by Rating
            </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
             <div className="w-16 h-16 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
             <p className="text-slate-500 font-medium animate-pulse">Scanning the network...</p>
          </div>
        ) : mentors.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {mentors.map((mentor) => (
              <motion.div 
                key={mentor._id} 
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:border-primary-500/50 rounded-3xl p-6 transition-all shadow-xl overflow-hidden"
              >
                {/* Highlight Background */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-500/5 blur-3xl rounded-full group-hover:bg-primary-500/10 transition-colors" />

                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
                        <img 
                            src={mentor.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.username}`} 
                            alt={mentor.username} 
                            className="w-16 h-16 rounded-2xl border-2 border-slate-800 bg-slate-800 object-cover relative z-10 p-1"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-slate-900 rounded-full z-20" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-white group-hover:text-primary-400 transition-colors flex items-center gap-2">
                        {mentor.username}
                        {mentor.level >= 5 && <Award className="w-4 h-4 text-primary-500" />}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-sm text-yellow-500 font-bold bg-yellow-500/10 px-2 py-0.5 rounded-full">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            {mentor.rating.toFixed(1)}
                        </div>
                        <span className="text-xs text-slate-500 font-medium">Lvl {mentor.level} Specialist</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                       <Zap className="w-3 h-3 text-primary-500" /> Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.skillsTaught.slice(0, 4).map((skill, index) => (
                        <span key={index} className="px-2.5 py-1 bg-primary-500/5 text-primary-300 text-[11px] font-bold rounded-lg border border-primary-500/10 group-hover:border-primary-500/30 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-800/20 rounded-2xl p-3 border border-slate-800/50">
                     <p className="text-xs text-slate-400 line-clamp-2 italic">
                        "Ready to help you scale your building knowledge in {mentor.skillsTaught[0]} and beyond. Let's build something EPIC!"
                     </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-800 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Exchange Fee</span>
                    <span className="text-white font-bold flex items-center gap-1">
                        15 <Zap className="w-4 h-4 text-yellow-500" /> <span className="text-xs text-slate-400 font-medium">/ session</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedProfile(mentor._id)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-primary-600 text-white text-sm font-bold rounded-xl transition-all border border-slate-700 hover:border-primary-500 shadow-lg active:scale-95 flex items-center gap-2"
                  >
                    Profile <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-24 bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-[2.5rem] mt-8"
          >
            <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Search className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Mentors Found</h3>
            <p className="text-slate-400 max-w-sm mx-auto mb-8">We couldn't find any mentors matching those skills. Try searching for something broader or clear your filters.</p>
            <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setMinRating(0); setMinLevel(0); }}
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all border border-slate-700"
            >
                Clear All Filters
            </button>
          </motion.div>
        )}

      </div>

      {/* Filter Sidebar (Slide In) */}
      <AnimatePresence>
        {showFilters && (
            <>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowFilters(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                />
                <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed right-0 top-0 h-full w-full max-w-sm bg-slate-900 border-l border-slate-800 z-[70] shadow-2xl p-8"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-extrabold text-white">Advanced Search</h3>
                        <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-4">Minimum Rating</label>
                            <div className="flex gap-2">
                                {[3, 4, 4.5, 4.8].map(r => (
                                    <button 
                                        key={r} 
                                        onClick={() => setMinRating(r === minRating ? 0 : r)}
                                        className={`flex-1 py-3 border rounded-xl font-bold text-sm transition-all ${minRating === r ? 'bg-primary-500 border-primary-400 text-white shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'}`}
                                    >
                                        {r}+ ⭐
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-4">Experience Level</label>
                            <div className="space-y-3">
                                {[
                                    { label: 'Novice (Lvl 1-3)', val: 1 },
                                    { label: 'Intermediate (Lvl 4-7)', val: 4 },
                                    { label: 'Guru (Lvl 8-10)', val: 8 }
                                ].map(l => (
                                    <label key={l.val} className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${minLevel === l.val ? 'bg-primary-500/10 border-primary-500/50' : 'bg-slate-800/50 border-slate-800 hover:border-slate-700'}`}>
                                        <input 
                                            type="radio" 
                                            name="level"
                                            checked={minLevel === l.val}
                                            onChange={() => setMinLevel(minLevel === l.val ? 0 : l.val)}
                                            className="w-5 h-5 rounded-lg accent-primary-500" 
                                        />
                                        <span className={`font-medium ${minLevel === l.val ? 'text-primary-400' : 'text-slate-300'}`}>{l.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8">
                            <button className="w-full py-4 bg-primary-600 text-white font-bold rounded-2xl shadow-xl shadow-primary-500/20">
                                Apply Search Criteria
                            </button>
                        </div>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProfile && (
            <MentorProfileModal 
                userId={selectedProfile} 
                onClose={() => setSelectedProfile(null)} 
            />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Explore;

