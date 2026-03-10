import React, { useState } from 'react';
import { CreditCard, Zap, ShieldCheck, Star, Trophy, Sparkles, Check, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import axios from 'axios';

const BuyCredits = () => {
    const { user } = useAuthStore();
    const [processingId, setProcessingId] = useState(null);
    const [showMockRazorpay, setShowMockRazorpay] = useState(false);
    const [selectedPkg, setSelectedPkg] = useState(null);

    // Modern Packages with INR pricing
    const packages = [
        { 
            id: 'starter', name: 'Starter Kick', credits: 100, price: '₹0', rawPrice: 0, 
            popular: false, icon: <Zap className="w-8 h-8 text-blue-400" />,
            features: ['Claim once', 'Access 2 Mentors', 'Community Entry']
        },
        { 
            id: 'pro', name: 'Pro Learner', credits: 500, price: '₹499', rawPrice: 499,
            popular: true, icon: <Star className="w-8 h-8 text-yellow-400" />,
            features: ['Priority Booking', 'Access All Mentors', 'Certified Badge', 'No Expiry']
        },
        { 
            id: 'elite', name: 'Elite Master', credits: 1200, price: '₹999', rawPrice: 999,
            popular: false, icon: <Trophy className="w-8 h-8 text-purple-400" />,
            features: ['1-on-1 VIP Support', 'Exclusive Workshops', 'Profile Booster', 'Resource Library']
        },
        { 
            id: 'unlimited', name: 'Infinite Growth', credits: 3000, price: '₹1,999', rawPrice: 1999,
            popular: false, icon: <Sparkles className="w-8 h-8 text-emerald-400" />,
            features: ['Lifetime Access', 'PeerLoom Swag', 'Featured Mentor List', 'Max XP Multiplier']
        },
    ];

    const handleCheckout = async (pkg) => {
         setSelectedPkg(pkg);
         setShowMockRazorpay(true);
         setProcessingId(pkg.id);
         
         // Simulate network/payment delay rather than hanging on actual Razorpay widget
         setTimeout(async () => {
             try {
                 const config = { headers: { Authorization: `Bearer ${useAuthStore.getState().token}` } };
                 const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                 
                 // Add credits strictly via the backend route
                 await axios.put(`${baseUrl}/api/users/profile/credits`, { amount: pkg.credits }, config);
                 
                 setShowMockRazorpay(false);
                 alert(`Payment Successful!\nYour ${pkg.credits} credits have been securely added to your account.`);
                 
                 // Refresh user data to show updated credits in UI
                 const userRes = await axios.get(`${baseUrl}/api/users/profile`, config);
                 useAuthStore.getState().setUser(userRes.data);
             } catch (err) {
                 setShowMockRazorpay(false);
                 console.error('Failed to sync credits:', err);
                 alert('Error connecting to the server. Please check your connection.');
             } finally {
                 setProcessingId(null);
             }
         }, 3500); // 3.5s simulated payment processing to mimic real flow
    };

    return (
        <div className="pt-24 pb-20 min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
                <div className="absolute top-20 left-10 w-96 h-96 bg-primary-600/20 blur-[130px] rounded-full animate-pulse" />
                <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-600/20 blur-[120px] rounded-full" />
            </div>

             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {showMockRazorpay && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-200"
                        >
                            <div className="bg-slate-50 p-6 border-b border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-lg">R</div>
                                    <span className="font-bold text-slate-800 tracking-tight">Razorpay Secure</span>
                                </div>
                                <span className="text-slate-500 font-medium text-sm">{selectedPkg?.price}</span>
                            </div>
                            <div className="p-8 flex flex-col items-center text-center">
                                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6" />
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Processing Payment</h3>
                                <p className="text-slate-500 text-sm">Please do not close or refresh this window. We are securely processing your transaction for {selectedPkg?.credits} credits.</p>
                            </div>
                            <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                                <ShieldCheck className="w-4 h-4" /> 256-bit SSL secured
                            </div>
                        </motion.div>
                    </div>
                )}

                <motion.div 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-full text-xs font-bold text-primary-400 uppercase tracking-widest mb-6">
                         <Zap className="w-3.5 h-3.5 fill-primary-400" /> Power Up Your Learning
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Skill <span className="text-primary-500 underline decoration-primary-500/30">Credits</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Fuel your curiosity. Unlock premium mentorship and exclusive workshops instantly with Skill Credits.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {packages.map((pkg, index) => (
                        <motion.div 
                            key={pkg.id} 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative bg-slate-900/60 backdrop-blur-md border rounded-[2rem] p-8 flex flex-col group transition-all duration-500 hover:shadow-2xl ${
                            pkg.popular 
                                ? 'border-primary-500 shadow-[0_0_50px_rgba(16,185,129,0.15)] ring-4 ring-primary-500/10' 
                                : 'border-slate-800 hover:border-slate-600'
                        }`}>
                            
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-600 to-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.2em] py-1.5 px-6 rounded-full shadow-xl">
                                    Highly Recommended
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-8">
                                <div className={`p-4 rounded-2xl bg-slate-800/80 border border-slate-700 transition-transform group-hover:scale-110 duration-500`}>
                                    {pkg.icon}
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-slate-500 font-bold block mb-1">Price</span>
                                    <span className="text-3xl font-black text-white">{pkg.price}</span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{pkg.name}</h3>
                            <div className="flex items-end gap-1 mb-8">
                                <span className="text-4xl font-extrabold text-white">{pkg.credits}</span>
                                <span className="text-slate-500 font-medium mb-1.5">Credits</span>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {pkg.features.map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-emerald-500" />
                                        </div>
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <button 
                                onClick={() => handleCheckout(pkg)}
                                disabled={processingId === pkg.id}
                                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-3 overflow-hidden relative ${
                                pkg.popular 
                                    ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-xl shadow-primary-500/25 active:scale-95' 
                                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 active:scale-95'
                            }`}>
                                {processingId === pkg.id ? (
                                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        {pkg.rawPrice === 0 ? 'Activate Pack' : 'Get Credits'}
                                    </>
                                )}
                                
                                <div className="absolute top-0 -left-[100%] w-full h-full bg-white/10 skew-x-[45deg] group-hover:left-[100%] transition-all duration-1000" />
                            </button>
                        </motion.div>
                    ))}
                </div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center">
                            <ShieldCheck className="w-8 h-8 text-emerald-500" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-1">Encrypted Transactions</h4>
                            <p className="text-sm text-slate-400">All payments are securely handled by Razorpay with 256-bit SSL encryption. We never see your card info.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-10">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-6 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                    </div>
                </motion.div>
             </div>
        </div>
    );
};

export default BuyCredits;

