import React from 'react';
import { Award, ShieldCheck, Download, ExternalLink, Hexagon, Code, Database, PenTool, Globe, Cpu, Cloud, Smartphone, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Certifications = () => {
    const certificates = [
        { id: 'CERT-001', name: 'Master React Patterns', date: 'October 12, 2024', issuer: 'Sarah Jenkins (Top 1% Mentor)', skill: 'React', valid: true, icon: <Code className="w-8 h-8" />, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
        { id: 'CERT-002', name: 'Backend Scalability Expert', date: 'September 05, 2024', issuer: 'SkillSwap Platform', skill: 'Node.js', valid: true, icon: <Database className="w-8 h-8" />, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
        { id: 'CERT-003', name: 'UI/UX Design Fundamentals', date: 'November 20, 2024', issuer: 'Priya Design (Level 6 Mentor)', skill: 'UI Design', valid: true, icon: <PenTool className="w-8 h-8" />, color: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
        { id: 'CERT-004', name: 'Python Data Science Pro', date: 'December 01, 2024', issuer: 'Dr. Chen Wei (AI Pioneer)', skill: 'Python', valid: true, icon: <Cpu className="w-8 h-8" />, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
        { id: 'CERT-005', name: 'Web3 & Smart Contract Developer', date: 'August 18, 2024', issuer: 'Sofia Web3 (Web3 Builder)', skill: 'Solidity', valid: true, icon: <Globe className="w-8 h-8" />, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
        { id: 'CERT-006', name: 'AWS Solutions Architect', date: 'January 15, 2025', issuer: 'Aisha Cloud (Cloud Architect)', skill: 'AWS', valid: true, icon: <Cloud className="w-8 h-8" />, color: 'text-cyan-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
        { id: 'CERT-007', name: 'Mobile App Development', date: 'February 28, 2025', issuer: 'Liam Mobile (Mobile Expert)', skill: 'React Native', valid: true, icon: <Smartphone className="w-8 h-8" />, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
        { id: 'CERT-008', name: 'Cybersecurity Specialist', date: 'March 05, 2025', issuer: 'Yuki Security (Security Shield)', skill: 'Cybersecurity', valid: true, icon: <Shield className="w-8 h-8" />, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    ];

    const handleDownload = (cert) => {
        // Create a simple certificate PDF-like content
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html><head><title>Certificate - ${cert.name}</title>
            <style>
                body { font-family: 'Georgia', serif; text-align: center; padding: 60px; background: linear-gradient(135deg, #0f172a, #1e293b); color: white; min-height: 100vh; }
                .cert-border { border: 3px solid #10b981; border-radius: 20px; padding: 60px; margin: 0 auto; max-width: 700px; background: rgba(15,23,42,0.9); }
                h1 { font-size: 36px; color: #10b981; margin-bottom: 10px; }
                h2 { font-size: 28px; margin: 30px 0; color: #e2e8f0; }
                .meta { color: #94a3b8; font-size: 14px; margin: 8px 0; }
                .badge { display: inline-block; background: rgba(16,185,129,0.1); color: #10b981; padding: 4px 16px; border-radius: 20px; border: 1px solid rgba(16,185,129,0.3); margin: 20px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; }
                .id { font-family: monospace; color: #64748b; font-size: 12px; margin-top: 30px; }
            </style></head><body>
            <div class="cert-border">
                <div class="badge">Verified Digital Credential</div>
                <h1>SkillSwap</h1>
                <p class="meta">Certificate of Achievement</p>
                <h2>${cert.name}</h2>
                <p class="meta">Issued by: ${cert.issuer}</p>
                <p class="meta">Skill Domain: ${cert.skill}</p>
                <p class="meta">Date: ${cert.date}</p>
                <p class="id">${cert.id}</p>
            </div></body></html>
        `);
        printWindow.document.close();
        setTimeout(() => printWindow.print(), 500);
    };

    return (
        <div className="pt-24 pb-12 min-h-screen relative">
            <div className="absolute top-1/3 left-0 w-64 h-64 bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <motion.div 
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-12"
                >
                     <h1 className="text-4xl font-extrabold text-white mb-4 flex items-center gap-3">
                         <ShieldCheck className="w-10 h-10 text-emerald-500" />
                         Digital Certifications
                     </h1>
                     <p className="text-lg text-slate-400 max-w-2xl">
                         Verifiable proof of your acquired skills. Endorsements earned from top mentors are tied directly to your profile.
                     </p>
                </motion.div>

                {certificates.length === 0 ? (
                    <div className="text-center py-20 bg-dark-card border border-dark-border rounded-2xl">
                        <Hexagon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">No Certifications Yet</h2>
                        <p className="text-slate-400">Complete Masterclasses or receive endorsements from Level 5+ mentors to earn verifiable certificates.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {certificates.map((cert, index) => (
                            <motion.div 
                                key={cert.id} 
                                initial={{ opacity: 0, y: 40, rotateX: 5 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div className="bg-slate-900 border-2 border-slate-700/50 rounded-2xl p-8 relative overflow-hidden transition-all duration-500 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                                    
                                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                    <div className="flex justify-between items-start mb-8">
                                        <div className={`w-16 h-16 ${cert.bg} ${cert.color} rounded-xl flex items-center justify-center ${cert.border} border`}>
                                            {cert.icon}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block mb-1">
                                                Verified Credential
                                            </p>
                                            <p className="text-xs text-slate-500 mt-2 font-mono">{cert.id}</p>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-6 leading-tight">{cert.name}</h3>
                                    
                                    <div className="space-y-3 border-t border-slate-800 pt-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Issued By</span>
                                            <span className="font-medium text-slate-300">{cert.issuer}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Issue Date</span>
                                            <span className="font-medium text-slate-300">{cert.date}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Skill Domain</span>
                                            <span className="font-medium text-primary-400">{cert.skill}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6 pt-4 border-t border-slate-800">
                                        <button 
                                            onClick={() => handleDownload(cert)}
                                            className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Download className="w-4 h-4" /> Download PDF
                                        </button>
                                        <button className="flex-1 py-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-500 border border-emerald-500/20 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                            <ExternalLink className="w-4 h-4" /> Verify Link
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Certifications;
