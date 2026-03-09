import React from 'react';
import { ArrowRight, Code, Video, Globe2, Award, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative pt-24 pb-12 w-full overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-600/20 blur-[120px] rounded-full point-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center py-20 lg:py-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-card border border-dark-border mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-300">The Future of Peer-to-Peer Learning</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Master Anything. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-primary-500 to-teal-400">
              Exchange Everything.
            </span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Join the global barter ecosystem for skills. Teach what you know, learn what you don't. Connect with mentors via real-time video, and level up your career without spending a dime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register" className="group relative px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] flex items-center gap-2">
              Start Learning Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/explore" className="px-8 py-4 bg-dark-card hover:bg-slate-800 border border-dark-border rounded-full font-semibold text-lg text-slate-200 transition-all duration-300">
              Explore Skills
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why SkillSwap?</h2>
            <p className="text-slate-400 text-lg">A completely new way to trade knowledge.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-yellow-400" />}
              title="Skill Credits System"
              description="Earn credits by teaching others. Spend them to book premium 1-on-1 sessions with experts."
            />
            <FeatureCard 
              icon={<Globe2 className="w-8 h-8 text-blue-400" />}
              title="Global Matchmaking"
              description="Our AI finds the perfect mentor or mentee based on your skills, rating, and availability."
            />
            <FeatureCard 
              icon={<Video className="w-8 h-8 text-purple-400" />}
              title="Real-time Sessions"
              description="Integrated WebRTC video calls, live chat, and screen sharing for seamless technical help."
            />
            <FeatureCard 
              icon={<Code className="w-8 h-8 text-pink-400" />}
              title="Hackathons & Collab"
              description="Form teams, join community challenges, and build real-world portfolios together."
            />
            <FeatureCard 
              icon={<Award className="w-8 h-8 text-orange-400" />}
              title="Gamified Growth"
              description="Unlock badges, maintain learning streaks, and climb the leaderboard as a top mentor."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-emerald-400" />}
              title="Community Hubs"
              description="Join skill-specific spaces to share resources, ask questions, and grow with peers."
            />
          </div>
        </div>

      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 rounded-2xl bg-dark-card border border-dark-border hover:border-primary-500/50 transition-colors group">
    <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-100">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export default Home;
