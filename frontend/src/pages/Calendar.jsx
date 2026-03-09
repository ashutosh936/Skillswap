import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Video, Plus, CheckCircle, Chrome, Mails } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
    const navigate = useNavigate();
    // Mock Data for MVP
    const upcomingSessions = [
        { id: 1, title: 'React Performance Tuning', with: 'Alex Chen', time: 'Today, 2:00 PM - 3:00 PM', type: 'learning' },
        { id: 2, title: 'Intro to System Design', with: 'Sarah Jenkins', time: 'Tomorrow, 10:00 AM - 11:30 AM', type: 'teaching' },
        { id: 3, title: 'MongoDB Indexing Deep Dive', with: 'Mike Ross', time: 'Friday, 4:00 PM - 5:00 PM', type: 'learning' },
    ];

    const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

    return (
        <div className="pt-24 pb-12 min-h-screen relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                            <CalendarIcon className="w-8 h-8 text-primary-500" />
                            Smart Calendar
                        </h1>
                        <p className="text-slate-400">Manage your teaching and learning sessions across timezones.</p>
                    </div>
                    
                    <button 
                        onClick={() => setIsSyncModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors font-medium border border-slate-700"
                    >
                        <Plus className="w-5 h-5 text-primary-400" />
                        Sync External Calendar
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Calendar View (Visual Only for MVP) */}
                    <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-2xl p-6">
                         <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">October 2024</h2>
                            <div className="flex gap-2">
                                <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg">&lt;</button>
                                <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg">&gt;</button>
                            </div>
                         </div>

                         {/* Mock Calendar Grid */}
                         <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                             <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                         </div>
                         <div className="grid grid-cols-7 gap-2">
                             {/* Blank leading days */}
                             <div className="aspect-square rounded-xl bg-slate-900/30"></div>
                             <div className="aspect-square rounded-xl bg-slate-900/30"></div>
                             
                             {/* Days 1-30 */}
                             {Array.from({length: 31}).map((_, i) => (
                                 <div key={i} className={`aspect-square rounded-xl border flex flex-col p-2 transition-colors cursor-pointer
                                    ${i === 14 ? 'border-primary-500 bg-primary-500/10' : 'border-slate-800/50 bg-slate-800/30 hover:border-slate-600'}
                                 `}>
                                     <span className={`text-sm font-medium ${i===14 ? 'text-primary-400' : 'text-slate-300'}`}>{i + 1}</span>
                                     {/* Mock event dots */}
                                     {i === 14 || i === 15 || i === 18 ? (
                                         <div className="mt-auto flex gap-1">
                                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                             {i===14 && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
                                         </div>
                                     ) : null}
                                 </div>
                             ))}
                         </div>
                    </div>

                    {/* Right Column: Upcoming Agenga */}
                    <div className="bg-dark-card border border-dark-border rounded-2xl p-6 flex flex-col">
                        <h2 className="text-xl font-bold text-white mb-6 border-b border-dark-border pb-4">Upcoming Agenda</h2>
                        
                        <div className="space-y-4 flex-1">
                            {upcomingSessions.map((session) => (
                                <div key={session.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors group cursor-pointer">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded 
                                            ${session.type === 'learning' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}
                                        `}>
                                            {session.type}
                                        </span>
                                        <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                                            <Clock className="w-3.5 h-3.5" />
                                            {session.time}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-white font-bold mb-1 group-hover:text-primary-400 transition-colors">{session.title}</h3>
                                    <p className="text-sm text-slate-400 mb-4">with {session.with}</p>
                                    
                                    <button 
                                        onClick={() => navigate(`/video-room?room=session-${session.id}`)}
                                        className="w-full py-2 bg-primary-600/10 hover:bg-primary-600 text-primary-400 hover:text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-primary-500/20 hover:border-transparent"
                                    >
                                        <Video className="w-4 h-4" />
                                        Join Video Room
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sync Modal Overlay */}
            {isSyncModalOpen && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-dark-card border border-dark-border rounded-2xl p-8 max-w-md w-full relative">
                        <h2 className="text-2xl font-bold text-white mb-2">Sync Calendar</h2>
                        <p className="text-slate-400 mb-8">Connect your external calendars to automatically prevent double-booking.</p>
                        
                        <div className="space-y-4">
                            <button className="w-full p-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 flex items-center justify-between text-white transition-colors group">
                                <span className="flex items-center gap-3 font-medium">
                                    <Chrome className="w-6 h-6 text-red-500" /> Google Calendar
                                </span>
                                <CheckCircle className="w-5 h-5 text-emerald-500 hidden group-hover:block" />
                            </button>
                            
                            <button className="w-full p-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 flex items-center justify-between text-white transition-colors group">
                                <span className="flex items-center gap-3 font-medium">
                                    <Mails className="w-6 h-6 text-blue-400" /> Outlook Calendar
                                </span>
                            </button>
                        </div>
                        
                        <button 
                            onClick={() => setIsSyncModalOpen(false)}
                            className="w-full mt-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
