import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Medal, Star, Target } from 'lucide-react';

const Leaderboards = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/gamification/leaderboard`);
        setLeaders(response.data);
      } catch (error) {
        console.error('Failed to load leaderboard', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="pt-24 pb-12 min-h-screen relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-yellow-900/10 blur-[120px] rounded-full point-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500/10 rounded-full mb-6">
            <Trophy className="w-10 h-10 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">Global Leaderboard</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">See who is leading the skill exchange ecosystem. Earn XP by completing sessions and climb the ranks.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden shadow-2xl">
            {/* Top 3 Podium (Optional advanced UI, sticking to list for MVP) */}
            
            <div className="divide-y divide-dark-border">
              {leaders.map((leader, index) => (
                <div key={leader._id} className="p-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                  
                  <div className="flex items-center gap-6">
                    {/* Rank Badge */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
                      ${index === 0 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 
                        index === 1 ? 'bg-gray-300/20 text-gray-300 border border-gray-300/50' :
                        index === 2 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/50' :
                        'bg-slate-800 text-slate-400 border border-slate-700'}
                    `}>
                      {index === 0 ? <MedayIcon rank={1} /> : index === 1 ? <MedayIcon rank={2} /> : index === 2 ? <MedayIcon rank={3} /> : `#${index + 1}`}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white text-lg">
                        {leader.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg flex items-center gap-2">
                            {leader.username}
                            {leader.badges?.length > 0 && (
                                <span title="Has Badges" className="text-primary-500"><Target className="w-4 h-4"/></span>
                            )}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-current" /> {leader.rating.toFixed(1)}</span>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">Level {leader.level}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-white tracking-wide">{leader.credits}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Credits</div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

const MedayIcon = ({ rank }) => {
    if(rank === 1) return <Trophy className="w-6 h-6" />;
    if(rank === 2) return <Medal className="w-6 h-6" />;
    return <Medal className="w-6 h-6" />;
}

export default Leaderboards;
