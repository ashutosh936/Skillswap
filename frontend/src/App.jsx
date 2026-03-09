import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Chat from './pages/Chat';
import Leaderboards from './pages/Leaderboards';
import Communities from './pages/Communities';
import Marketplace from './pages/Marketplace';
import AiMentorBot from './pages/AiMentorBot';
import Calendar from './pages/Calendar';
import Certifications from './pages/Certifications';
import BuyCredits from './pages/BuyCredits';
import VideoRoom from './pages/VideoRoom';
import FeedbackSession from './pages/FeedbackSession';
import Contact from './pages/Contact';
import useAuthStore from './store/authStore';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-dark-bg z-[100] flex flex-col items-center justify-center font-sans">
        <div className="relative flex flex-col items-center">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary-500/20 blur-[50px] rounded-full" />
            
            <Sparkles className="w-16 h-16 text-primary-500 mb-6 loader-logo relative z-10" />
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-300 relative z-10 tracking-tight">
              SkillSwap
            </h1>
            
            <div className="mt-8 flex gap-2">
               <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0ms' }} />
               <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '150ms' }} />
               <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-dark-bg text-dark-text flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/explore" element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/ai-mentor" element={<AiMentorBot />} />
            <Route path="/calendar" element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } />
            <Route path="/certifications" element={
              <ProtectedRoute>
                <Certifications />
              </ProtectedRoute>
            } />
            <Route path="/buy-credits" element={
              <ProtectedRoute>
                <BuyCredits />
              </ProtectedRoute>
            } />
            <Route path="/video-room" element={
              <ProtectedRoute>
                <VideoRoom />
              </ProtectedRoute>
            } />
            <Route path="/feedback" element={
              <ProtectedRoute>
                <FeedbackSession />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
