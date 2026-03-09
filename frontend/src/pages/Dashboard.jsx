import React, { useState, useEffect, useRef } from 'react';
import useAuthStore from '../store/authStore';
import { Award, BookOpen, Star, Video, Zap, Camera } from 'lucide-react';
import ProfileModal from '../components/ProfileModal';
import axios from 'axios';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, token, updateUser } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${baseUrl}/api/upload/avatar`, formData, config);
      updateUser({ avatar: response.data.avatar });
    } catch (err) {
      console.error('Avatar upload failed:', err);
    } finally {
      setUploadingAvatar(false);
    }
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${baseUrl}/api/match/recommendations`, config);
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommendations", error);
      }
    };
    if (user?.skillsLearning?.length > 0) {
      fetchRecommendations();
    }
  }, [user?.skillsLearning, token]);

  return (
    <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Profile Section */}
      <motion.div 
        initial={{ y: -50, opacity: 0, rotateX: 10 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-dark-card border border-dark-border rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden flex-wrap"
        style={{ perspective: 1000 }}
      >
        {/* Glow behind profile */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 blur-[80px] rounded-full point-events-none" />

        <div className="flex items-center gap-6 z-10">
          <div className="relative group">
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full border-4 border-primary-500/30 object-cover shadow-2xl shadow-primary-500/20" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-primary-500 flex items-center justify-center text-3xl font-bold text-slate-300">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full border-4 border-dark-card flex items-center justify-center">
              <Zap className="w-4 h-4 text-white fill-current" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Welcome back, {user?.username}!</h1>
            <p className="text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Status: Active Member
            </p>
          </div>
        </div>

         <div className="flex flex-col md:flex-row gap-4 z-10 w-full md:w-auto">
           {/* Gamification Level */}
           <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-4 flex flex-col justify-center gap-2 flex-1 md:flex-none">
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-400">Level {user?.level || 1}</p>
                    <div className="flex items-center gap-2">
                       <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-500" style={{ width: `${(user?.xp || 0) % 100}%` }}></div>
                       </div>
                       <span className="text-xs text-slate-500">{user?.xp || 0} XP</span>
                    </div>
                  </div>
              </div>
           </div>

           <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-4 flex flex-col justify-center gap-2 flex-1 md:flex-none">
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-500/20 text-yellow-500 flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Skill Credits</p>
                    <p className="text-2xl font-bold text-white">{user?.credits}</p>
                  </div>
              </div>
              <div className="mt-2 text-xs text-slate-500 border-t border-slate-700/50 pt-2">
                Spend credits to unlock Premium Marketplace items. Earn by mentoring.
              </div>
           </div>
           
           <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-4 flex flex-col justify-center gap-2 flex-1 md:flex-none">
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Rating</p>
                    <p className="text-2xl font-bold text-white">{user?.rating?.toFixed(1) || '0.0'}</p>
                  </div>
              </div>
              <div className="mt-2 text-xs text-slate-500 border-t border-slate-700/50 pt-2">
                Your average score from peer-reviews. Badge endorsements are earned here.
              </div>
           </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Skills Section */}
        <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-emerald-500/50 transition-colors shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Award className="text-primary-500 w-5 h-5" /> 
              Skills Exchange
            </h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              Edit Profile
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">I can teach:</h3>
              <div className="flex flex-wrap gap-2">
                {user?.skillsTaught?.length > 0 ? (
                  user.skillsTaught.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm">No skills added yet to teach.</p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-dark-border">
              <h3 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">I want to learn:</h3>
              <div className="flex flex-wrap gap-2">
                {user?.skillsLearning?.length > 0 ? (
                  user.skillsLearning.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-sm">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm">No skills added yet to learn.</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity / Next Session */}
        <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-purple-500/50 transition-colors shadow-2xl"
        >
           <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Video className="text-purple-500 w-5 h-5" /> 
              Upcoming Sessions
            </h2>

            <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-dark-border rounded-xl text-center px-4">
              <BookOpen className="w-10 h-10 text-slate-600 mb-3" />
              <p className="text-slate-300 font-medium">No upcoming sessions</p>
              <p className="text-slate-500 text-sm mt-1 mb-4">You have time to teach someone or learn something new!</p>
            </div>
        </motion.div>

        {/* Premium 3D Avatars Gallery */}
        <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-dark-card border border-dark-border rounded-2xl p-8 md:col-span-2 hover:border-primary-500/50 transition-colors shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 blur-3xl rounded-full" />
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Camera className="text-primary-500 w-5 h-5" /> 
                Character Laboratory
              </h2>
              <p className="text-sm text-slate-500 mt-1">Select your premium 3D identity</p>
            </div>
            <div className="flex items-center gap-4">
              <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} accept="image/*" className="hidden" />
              <button 
                onClick={handleAvatarClick}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all border border-slate-700 flex items-center gap-2"
              >
                {uploadingAvatar ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
                Upload Custom
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((num) => {
              const avatarPath = `/avatars/avatar${num}.png`;
              const isSelected = user?.avatar === avatarPath;
              return (
                <motion.div
                  key={num}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={async () => {
                    if (isSelected) return;
                    try {
                      const config = { headers: { Authorization: `Bearer ${token}` } };
                      await axios.post('http://localhost:5000/api/users/update-profile', { avatar: avatarPath }, config);
                      updateUser({ avatar: avatarPath });
                    } catch (err) {
                      console.error('Failed to set avatar:', err);
                    }
                  }}
                  className={`relative cursor-pointer rounded-2xl p-2 border-2 transition-all ${
                    isSelected ? 'border-primary-500 bg-primary-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-slate-800 hover:border-slate-700 bg-slate-900/50'
                  }`}
                >
                  <img src={avatarPath} alt={`Avatar ${num}`} className="w-full h-auto rounded-xl aspect-square object-cover" />
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center border-2 border-dark-card">
                      <Zap className="w-3 h-3 text-white fill-current" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* AI Mathmaking Recommendations */}
        <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-dark-card border border-dark-border rounded-2xl p-8 md:col-span-2 hover:border-yellow-500/50 transition-colors shadow-2xl"
        >
           <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Star className="text-yellow-500 w-5 h-5 fill-current" /> 
              Top Mentor Recommendations
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {recommendations.length > 0 ? (
                recommendations.map((rec) => (
                  <div key={rec._id} className="p-4 bg-slate-900 border border-dark-border rounded-xl flex items-center gap-4 hover:border-primary-500/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center font-bold text-slate-300">
                      {rec.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-bold text-white text-sm">{rec.username}</p>
                        <p className="text-xs text-primary-400">Can teach: {rec.skillsTaught[0]}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-slate-500 text-sm">
                  {user?.skillsLearning?.length > 0 
                    ? "No exact matches found yet for your learning goals." 
                    : "Add skills you want to learn to get personalized recommendations."}
                </div>
              )}
            </div>
        </motion.div>

      </div>

      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
