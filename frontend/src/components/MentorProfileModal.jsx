import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Star, MapPin, Award, Zap, Camera, ShieldCheck } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';

const MentorProfileModal = ({ userId, onClose }) => {
  const { token } = useAuthStore();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentorProfile = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${baseUrl}/api/users/profile/${userId}`, config);
        setMentor(response.data);
      } catch (error) {
        console.error("Failed to fetch mentor profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentorProfile();
  }, [userId, token]);

  if (!userId) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-dark-card border border-dark-border w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 blur-[80px] rounded-full point-events-none" />

        <div className="p-6 border-b border-dark-border flex justify-between items-center bg-slate-900/50 relative z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Mentor Profile
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-2 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin mb-4" />
            <p className="text-slate-400">Loading profile data...</p>
          </div>
        ) : mentor ? (
          <div className="p-8 space-y-8 relative z-10">
            {/* Header / Avatar */}
            <div className="flex items-start gap-6">
              <div className="relative">
                {mentor.avatar ? (
                  <img src={mentor.avatar} alt="avatar" className="w-24 h-24 rounded-2xl border-2 border-slate-700 object-cover shadow-xl" />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-3xl font-bold text-slate-300 shadow-xl">
                    {mentor.username?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-dark-card flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">{mentor.username}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-500/10 px-2 py-0.5 rounded-md">
                    <Star className="w-4 h-4 fill-current" /> {mentor.rating?.toFixed(1) || '0.0'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-emerald-500" /> Lvl {mentor.level || 1}
                  </span>
                  {mentor.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-blue-500" /> {mentor.location}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right bg-slate-900 border border-slate-800 rounded-xl p-3">
                 <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide block mb-1">Exchange Fee</span>
                 <span className="text-xl font-black text-white flex items-center gap-1 justify-end">
                     15 <Zap className="w-5 h-5 text-yellow-500" />
                 </span>
              </div>
            </div>

            {/* Bio */}
            {mentor.bio && (
              <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-800">
                <p className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-primary-500 pl-4 py-1">
                  "{mentor.bio}"
                </p>
              </div>
            )}

            {/* Skills */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Can Teach</h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.skillsTaught?.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                  {(!mentor.skillsTaught || mentor.skillsTaught.length === 0) && (
                    <span className="text-slate-500 text-sm italic">No teaching skills listed</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Currently Learning</h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.skillsLearning?.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                  {(!mentor.skillsLearning || mentor.skillsLearning.length === 0) && (
                    <span className="text-slate-500 text-sm italic">No learning skills listed</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 mt-4 border-t border-dark-border flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
              >
                Close Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400">
            Could not find user profile.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MentorProfileModal;
