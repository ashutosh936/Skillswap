import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Sparkles, Code, BookOpen, Lightbulb } from 'lucide-react';
import useAuthStore from '../store/authStore';
import axios from 'axios';

const AiMentorBot = () => {
    const { user, token } = useAuthStore();
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', text: "Hello! I'm your AI Peer Mentor. I can help you find learning resources, debug code, or suggest which skills you should learn next based on market trends. What are we focusing on today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: crypto.randomUUID(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            // Build the conversation history for context
            const chatHistory = [...messages, userMsg]
                .filter(m => m.role !== undefined)
                .map(m => ({
                    role: m.role === 'assistant' ? 'assistant' : 'user',
                    content: m.text
                }));

            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/ai/chat`,
                { messages: chatHistory },
                config
            );

            const aiMsg = {
                id: crypto.randomUUID(),
                role: 'assistant',
                text: response.data.reply
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (err) {
            console.error('AI API Error:', err);
            const errorMsg = {
                id: crypto.randomUUID(),
                role: 'assistant',
                text: "I'm having trouble connecting right now. Please try again in a moment, or check if the backend server is running."
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const suggestedPrompts = [
        { icon: <Code className="w-4 h-4 text-blue-400" />, text: "How do I start with React?" },
        { icon: <Lightbulb className="w-4 h-4 text-yellow-400" />, text: "What skills are trending?" },
        { icon: <BookOpen className="w-4 h-4 text-emerald-400" />, text: "Recommend a learning path" }
    ];

    return (
        <div className="pt-24 pb-8 h-screen w-full flex flex-col items-center max-w-5xl mx-auto px-4 relative">
            
            {/* Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-900/10 blur-[100px] rounded-full point-events-none" />

            <div className="w-full mb-6 text-center z-10">
                <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
                    <Bot className="w-8 h-8 text-primary-500" />
                    AI Mentor Assistant
                </h1>
                <p className="text-slate-400 mt-2">Always available to guide your peer-learning journey.</p>
            </div>

            <div className="flex-1 w-full bg-dark-card border border-dark-border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10">
                
                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                                msg.role === 'user' ? 'bg-slate-700 text-white font-bold' : 'bg-primary-900/50 border border-primary-500/30'
                            }`}>
                                {msg.role === 'user' ? user?.username?.charAt(0).toUpperCase() || <User size={20} /> : <Sparkles className="text-primary-400" size={20} />}
                            </div>
                            <div className={`p-4 rounded-2xl ${
                                msg.role === 'user' 
                                ? 'bg-primary-600 text-white rounded-tr-sm' 
                                : 'bg-slate-800 text-slate-200 border border-slate-700/50 rounded-tl-sm'
                            }`}>
                                <p className="leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="flex gap-4 max-w-[85%]">
                            <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-primary-900/50 border border-primary-500/30">
                                <Sparkles className="text-primary-400" size={20} />
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700/50 rounded-tl-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-slate-900/50 border-t border-dark-border">
                    {/* Suggested Prompts */}
                    {messages.length === 1 && (
                        <div className="flex flex-wrap gap-2 mb-4 justify-center">
                            {suggestedPrompts.map((prompt, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setInput(prompt.text)}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-full transition-colors border border-slate-700"
                                >
                                    {prompt.icon}
                                    {prompt.text}
                                </button>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSend} className="relative max-w-4xl mx-auto flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Message your AI Mentor..."
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-6 pr-14 py-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-slate-500"
                        />
                        <button 
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="absolute right-2 p-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white rounded-lg transition-colors"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                    <p className="text-center text-xs text-slate-500 mt-3">AI Mentor can make mistakes. Verify information during 1-on-1 sessions.</p>
                </div>
            </div>
        </div>
    );
};

export default AiMentorBot;
