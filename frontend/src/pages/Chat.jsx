import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import useAuthStore from '../store/authStore';
import { Send, Users, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const socket = io.connect(import.meta.env.VITE_API_URL || "http://localhost:5000");

const Chat = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [room, setRoom] = useState("");
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [inRoom, setInRoom] = useState(false);
    
    // Auto-scroll to bottom of chat
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const joinRoom = (e) => {
        e.preventDefault();
        if (room !== "") {
            socket.emit("join_room", room);
            setInRoom(true);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: user.username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        const receiveMessageHandler = (data) => {
            setMessageList((list) => [...list, data]);
        };

        socket.on("receive_message", receiveMessageHandler);

        // Cleanup the listener on component unmount
        return () => {
            socket.off("receive_message", receiveMessageHandler);
        };
    }, []);

    return (
        <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex flex-col">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Live Sessions & Chat</h1>
                <p className="text-slate-400">Connect with your mentor or mentee in real-time.</p>
            </div>

            {!inRoom ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="bg-dark-card border border-dark-border p-8 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in-up">
                        <div className="w-16 h-16 bg-primary-500/20 text-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-center text-white mb-6">Join a Session Room</h2>
                        <form onSubmit={joinRoom} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Enter Room ID (e.g. react-101)"
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                                className="w-full bg-slate-900 border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                required
                            />
                            <button 
                                type="submit"
                                className="w-full bg-primary-600 hover:bg-primary-500 text-white font-semibold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                            >
                                Join Room
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col bg-dark-card border border-dark-border rounded-2xl overflow-hidden shadow-2xl max-h-[70vh]">
                    
                    {/* Chat Header */}
                    <div className="p-4 border-b border-dark-border bg-slate-900/50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center font-bold text-white">
                                {room.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Room: {room}</h3>
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span className="text-xs text-slate-400">Live</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                             <button 
                                onClick={() => navigate(`/video-room?room=${room}`)}
                                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700" title="Start Video Call">
                                <Video className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={() => setInRoom(false)}
                                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-lg transition-colors border border-red-500/20"
                            >
                                Leave Room
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages Area */}
                    <div className="flex-1 p-6 overflow-y-auto bg-dark-bg/50 space-y-4">
                        {messageList.map((messageContent, index) => {
                            const isMe = user.username === messageContent.author;
                            return (
                                <div key={index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                                        isMe 
                                        ? 'bg-primary-600 text-white rounded-tr-sm' 
                                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm'
                                    }`}>
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1 px-1">
                                        <span className="text-xs font-medium text-slate-400">{isMe ? 'You' : messageContent.author}</span>
                                        <span className="text-[10px] text-slate-500">{messageContent.time}</span>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-dark-border bg-slate-900/50">
                        <form onSubmit={sendMessage} className="flex gap-2">
                            <input
                                type="text"
                                value={currentMessage}
                                placeholder="Type a message..."
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                            />
                            <button 
                                type="submit"
                                disabled={!currentMessage.trim()}
                                className="px-6 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:hover:bg-primary-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Chat;
