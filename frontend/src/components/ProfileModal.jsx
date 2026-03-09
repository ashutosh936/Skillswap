import React, { useState } from 'react';
import axios from 'axios';
import { X, Plus, Trash2 } from 'lucide-react';
import useAuthStore from '../store/authStore';

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, token, updateUser } = useAuthStore();
  const [taughtSkills, setTaughtSkills] = useState(user?.skillsTaught || []);
  const [learningSkills, setLearningSkills] = useState(user?.skillsLearning || []);
  const [teachInput, setTeachInput] = useState('');
  const [learnInput, setLearnInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAddSkill = (type) => {
    if (type === 'teach' && teachInput.trim() && !taughtSkills.includes(teachInput.trim())) {
      setTaughtSkills([...taughtSkills, teachInput.trim()]);
      setTeachInput('');
    } else if (type === 'learn' && learnInput.trim() && !learningSkills.includes(learnInput.trim())) {
      setLearningSkills([...learningSkills, learnInput.trim()]);
      setLearnInput('');
    }
  };

  const handleRemoveSkill = (type, skillToRemove) => {
    if (type === 'teach') setTaughtSkills(taughtSkills.filter(s => s !== skillToRemove));
    if (type === 'learn') setLearningSkills(learningSkills.filter(s => s !== skillToRemove));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.put('http://localhost:5000/api/users/profile/skills', {
        skillsTaught: taughtSkills,
        skillsLearning: learningSkills,
      }, config);
      
      updateUser(response.data);
      onClose();
    } catch (error) {
       console.error("Failed to update profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-dark-card border border-dark-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        
        <div className="p-6 border-b border-dark-border flex justify-between items-center bg-slate-900/50">
          <h2 className="text-xl font-bold text-white">Edit Your Skills</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Teach */}
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-2">Skills you can teach others</h3>
            <div className="flex gap-2 mb-3">
              <input 
                type="text" 
                value={teachInput}
                onChange={(e) => setTeachInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill('teach')}
                placeholder="e.g. React, Python, Guitar..." 
                className="flex-1 bg-slate-900 border border-dark-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
              <button onClick={() => handleAddSkill('teach')} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-emerald-400 transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {taughtSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-1 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm group">
                  {skill}
                  <button onClick={() => handleRemoveSkill('teach', skill)} className="text-emerald-500/50 group-hover:text-emerald-400">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-2">Skills you want to learn</h3>
            <div className="flex gap-2 mb-3">
              <input 
                type="text" 
                value={learnInput}
                onChange={(e) => setLearnInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill('learn')}
                placeholder="e.g. Machine Learning, Spanish..." 
                className="flex-1 bg-slate-900 border border-dark-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
              <button onClick={() => handleAddSkill('learn')} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-blue-400 transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {learningSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-sm group">
                  {skill}
                  <button onClick={() => handleRemoveSkill('learn', skill)} className="text-blue-500/50 group-hover:text-blue-400">
                     <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="p-6 border-t border-dark-border bg-slate-900/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-300 hover:text-white transition-colors">
            Cancel
          </button>
          <button 
            disabled={loading}
            onClick={handleSave} 
            className="px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileModal;
