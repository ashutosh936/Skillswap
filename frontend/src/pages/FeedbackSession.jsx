import React, { useState } from 'react';
import { Star, ThumbsUp, Medal, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const FeedbackSession = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState('');
    const [submitted, setSubmitted] = useState(false);
    
    // Mock Endorsements toggle
    const [endorsements, setEndorsements] = useState({
        clearCommunicator: false,
        deepExpertise: false,
        patientMentor: false
    });

    const toggleEndorsement = (key) => setEndorsements(prev => ({...prev, [key]: !prev[key]}));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a star rating before submitting your feedback.');
            return;
        }
        setSubmitted(true);
        setTimeout(() => navigate('/dashboard'), 2500);
    };

    if (submitted) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
                <div className="bg-dark-card border border-dark-border rounded-3xl p-12 text-center max-w-lg w-full transform animate-fade-in-up">
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-2">Feedback Sent!</h2>
                    <p className="text-slate-400 mb-6">Thank you for contributing to the community reputation system.</p>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700/50 inline-block font-medium text-emerald-400">
                        +50 XP Earned
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary-900/10 blur-[150px] rounded-full pointer-events-none" />

             <div className="bg-dark-card border border-dark-border rounded-3xl p-8 md:p-12 w-full max-w-2xl relative z-10 shadow-2xl">
                 
                 <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-white mb-2">Rate Your Session</h1>
                    <p className="text-slate-400">How was your recent video mentoring session with <span className="text-white font-medium">Alex Chen</span>?</p>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-10">
                     
                     {/* Star Rating */}
                     <div className="flex flex-col items-center">
                         <div className="flex gap-2">
                             {[1, 2, 3, 4, 5].map((star) => (
                                 <button
                                     type="button"
                                     key={star}
                                     onClick={() => setRating(star)}
                                     onMouseEnter={() => setHover(star)}
                                     onMouseLeave={() => setHover(rating)}
                                     className="focus:outline-none transition-transform hover:scale-110"
                                 >
                                     <Star className={`w-12 h-12 ${
                                         star <= (hover || rating) 
                                         ? 'text-yellow-500 fill-current drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]' 
                                         : 'text-slate-700'
                                     }`} />
                                 </button>
                             ))}
                         </div>
                         <p className="text-sm font-medium text-yellow-500 mt-4 min-h-[20px]">
                             {rating === 1 && "Poor"}
                             {rating === 2 && "Fair"}
                             {rating === 3 && "Good"}
                             {rating === 4 && "Great"}
                             {rating === 5 && "Exceptional"}
                         </p>
                     </div>

                     {/* Endorsement Badges */}
                     <div className="border-t border-slate-800 pt-8">
                         <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                             <Medal className="w-4 h-4" /> Endorsements (Optional)
                         </h3>
                         <div className="flex flex-wrap gap-3">
                             <button type="button" onClick={() => toggleEndorsement('clearCommunicator')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${endorsements.clearCommunicator ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                                 <MessageSquare className="w-4 h-4" /> Clear Communicator
                             </button>
                             <button type="button" onClick={() => toggleEndorsement('deepExpertise')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${endorsements.deepExpertise ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                                 <Medal className="w-4 h-4" /> Deep Expertise
                             </button>
                             <button type="button" onClick={() => toggleEndorsement('patientMentor')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${endorsements.patientMentor ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                                 <ThumbsUp className="w-4 h-4" /> Patient Mentor
                             </button>
                         </div>
                     </div>

                     {/* Text Review */}
                     <div className="border-t border-slate-800 pt-8">
                         <label htmlFor="review" className="block text-sm font-medium text-slate-300 mb-2">Public Review</label>
                         <textarea
                             id="review"
                             rows="4"
                             value={review}
                             onChange={(e) => setReview(e.target.value)}
                             placeholder="Describe your learning experience..."
                             className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-slate-600 resize-none"
                         ></textarea>
                     </div>

                     <button 
                        type="submit"
                        className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all shadow-lg text-lg flex justify-center items-center gap-2"
                     >
                         Submit Feedback
                     </button>
                 </form>
             </div>
        </div>
    );
};

export default FeedbackSession;
