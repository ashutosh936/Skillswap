import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Explore', path: '/explore' },
    { name: 'Leaderboards', path: '/leaderboards' },
    { name: 'Communities', path: '/communities' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary-500" />
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-emerald-300">
              PeerLoom
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-primary-400 hover:bg-primary-500/10 transition-all">{link.name}</Link>
            ))}
            <Link to="/ai-mentor" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> AI Mentor
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all">
                  Dashboard
                </Link>
                <Link to="/certifications" className="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all">
                  Certifications
                </Link>
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-dark-border">
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-medium text-white">{user?.username}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-white hover:bg-red-500 bg-red-500/10 border border-red-500/20 rounded-xl font-bold transition-all text-sm"
                  >
                    Logout <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log in</Link>
                <Link to="/register" className="px-5 py-2 rounded-full bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]">
                  Get Started
                </Link>
              </>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-bg border-b border-dark-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-dark-card transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/ai-mentor" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-3 rounded-xl text-base font-medium text-emerald-400 hover:text-emerald-300 hover:bg-dark-card transition-all"
              >
                <Sparkles className="w-5 h-5" /> AI Mentor
              </Link>
              
              <div className="pt-4 mt-4 border-t border-dark-border">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-3">
                      <div className="flex flex-col">
                        <span className="text-base font-medium text-white">{user?.username}</span>
                      </div>
                    </div>
                    <Link 
                      to="/dashboard" 
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-xl text-base font-medium text-slate-300 hover:text-white"
                    >
                      Dashboard
                    </Link>
                    <Link 
                       to="/buy-credits" 
                       onClick={() => setIsOpen(false)}
                       className="block px-3 py-2 rounded-xl text-base font-medium text-primary-400 hover:text-primary-300"
                    >
                      Top Up Credits
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-3 rounded-xl text-base font-medium text-red-400 hover:bg-red-400/10 flex items-center gap-2"
                    >
                      <LogOut className="h-5 w-5" /> Log out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 px-3">
                    <Link 
                      to="/login" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center px-4 py-3 rounded-xl border border-dark-border text-base font-medium text-white"
                    >
                      Log in
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center px-4 py-3 rounded-xl bg-primary-600 text-base font-medium text-white shadow-lg"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
