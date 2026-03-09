import React, { useState } from 'react';
import { Mail, Linkedin, Send, MessageSquare, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      // The backend expects a subject, we'll provide a default one since the UI doesn't collect it
      await axios.post(`${baseUrl}/api/contact`, { ...formData, subject: 'General Inquiry' });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => { setIsSubmitted(false); setSubmitStatus(null); }, 5000);
    } catch (error) {
       console.error("Failed to send message", error);
       setIsSubmitting(false);
       setSubmitStatus('error');
    }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-900/10 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row gap-16 items-center">
            
            {/* Left Side: Info */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-xs font-bold text-primary-400 uppercase tracking-widest mb-6">
                    <HeartHandshake className="w-4 h-4" /> Let's Connect
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                    Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-300">Touch.</span>
                </h1>
                <p className="text-xl text-slate-400 mb-12 max-w-lg leading-relaxed">
                    Have questions about the platform, want to report an issue, or just want to collaborate? I'd love to hear from you.
                </p>

                <div className="space-y-6">
                    <a href="mailto:ashutosh.vishwakarma2004@gmail.com" className="group flex items-center gap-6 p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-primary-500/50 transition-all cursor-pointer">
                        <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                            <Mail className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Email Me</p>
                            <p className="text-white font-medium text-lg leading-none">ashutosh.vishwakarma2004@gmail.com</p>
                        </div>
                    </a>

                    <a href="https://www.linkedin.com/in/ashutosh975" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer">
                        <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                            <Linkedin className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Connect on LinkedIn</p>
                            <p className="text-white font-medium text-lg leading-none">linkedin.com/in/ashutosh975</p>
                        </div>
                    </a>
                </div>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 w-full max-w-lg"
            >
                <div className="bg-slate-900/60 backdrop-blur border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-[50px] rounded-full pointer-events-none" />
                    
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <MessageSquare className="w-6 h-6 text-primary-500" /> Send a Message
                    </h3>

                    {isSubmitted ? (
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            className="text-center py-12"
                        >
                            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                <Send className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                            <p className="text-slate-400">Thanks for reaching out. I'll get back to you shortly.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Your Name</label>
                                <input 
                                    type="text" required
                                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-medium"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Email Address</label>
                                <input 
                                    type="email" required
                                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-medium"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Message</label>
                                <textarea 
                                    required rows="4"
                                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none font-medium"
                                    placeholder="How can I help you today?"
                                />
                            </div>
                            <button 
                                type="submit" disabled={isSubmitting}
                                className="w-full bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 group"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                {!isSubmitting && <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />}
                            </button>

                            {submitStatus === 'error' && (
                                <div className="text-red-400 text-sm font-medium text-center bg-red-500/10 py-3 rounded-lg border border-red-500/20">
                                    Failed to send message. Please try again later.
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    </div>
  );
};

export default Contact;
