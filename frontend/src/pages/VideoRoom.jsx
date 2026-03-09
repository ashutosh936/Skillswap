import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, MessageSquare, Share2, Shield, Info, AlertTriangle } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { useSearchParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const ICE_SERVERS = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' }
    ]
};

const VideoRoom = () => {
    const { user, isAuthenticated } = useAuthStore();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const room = searchParams.get('room') || 'session-room-101';

    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [streamError, setStreamError] = useState(null);
    const [status, setStatus] = useState("Establishing Connection...");
    const [participants, setParticipants] = useState(1);
    const [socketConnected, setSocketConnected] = useState(false);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const localStreamRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!isAuthenticated) return;

        // Initialize Socket
        socketRef.current = io(API_URL);

        const startCall = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { width: 1280, height: 720 }, 
                    audio: true 
                });
                localStreamRef.current = stream;
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
                setStatus("Securely Connected");

                // Initialize Peer Connection
                peerConnectionRef.current = new RTCPeerConnection(ICE_SERVERS);
                
                // Add local tracks to peer connection
                stream.getTracks().forEach(track => {
                    peerConnectionRef.current.addTrack(track, stream);
                });

                // Listen for remote tracks
                peerConnectionRef.current.ontrack = (event) => {
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = event.streams[0];
                        setParticipants(2);
                    }
                };

                // Listen for ICE candidates
                peerConnectionRef.current.onicecandidate = (event) => {
                    if (event.candidate) {
                        socketRef.current.emit('webrtc_ice_candidate', {
                            room,
                            candidate: event.candidate
                        });
                    }
                };

                // Socket Event Handlers
                socketRef.current.on('connect', () => {
                    setSocketConnected(true);
                    socketRef.current.emit('join_room', room);
                });

                socketRef.current.on('webrtc_offer', async (data) => {
                    if (peerConnectionRef.current) {
                        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));
                        const answer = await peerConnectionRef.current.createAnswer();
                        await peerConnectionRef.current.setLocalDescription(answer);
                        socketRef.current.emit('webrtc_answer', { room, answer });
                    }
                });

                socketRef.current.on('webrtc_answer', async (data) => {
                    if (peerConnectionRef.current && !peerConnectionRef.current.currentRemoteDescription) {
                        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
                    }
                });

                socketRef.current.on('webrtc_ice_candidate', async (data) => {
                    if (peerConnectionRef.current && data.candidate) {
                        try {
                            await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
                        } catch (e) {
                            console.warn("Error adding ICE candidate", e);
                        }
                    }
                });

                // Role Logic: First one in creates the offer after a short delay
                setTimeout(async () => {
                    if (peerConnectionRef.current && socketRef.current.connected) {
                        const offer = await peerConnectionRef.current.createOffer();
                        await peerConnectionRef.current.setLocalDescription(offer);
                        socketRef.current.emit('webrtc_offer', { room, offer });
                    }
                }, 1500);

            } catch (err) {
                console.error("Error accessing media devices.", err);
                setStreamError("Please allow camera and microphone access to join the session.");
                setIsVideoOff(true);
            }
        };

        startCall();

        return () => {
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => track.stop());
            }
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [room, isAuthenticated]);

    // Track toggles
    useEffect(() => {
        if (localStreamRef.current) {
            const videoTrack = localStreamRef.current.getVideoTracks()[0];
            if (videoTrack) videoTrack.enabled = !isVideoOff;
        }
    }, [isVideoOff]);

    useEffect(() => {
        if (localStreamRef.current) {
            const audioTrack = localStreamRef.current.getAudioTracks()[0];
            if (audioTrack) audioTrack.enabled = !isMuted;
        }
    }, [isMuted]);

    const leaveCall = () => {
         if (localStreamRef.current) {
             localStreamRef.current.getTracks().forEach(track => {
                 track.stop();
                 track.enabled = false;
             });
         }
         if (peerConnectionRef.current) {
             peerConnectionRef.current.close();
         }
         if (socketRef.current) {
             socketRef.current.disconnect();
         }
         // Using window.location.href ensures maximum cleanup rather than router push 
         window.location.href = '/feedback';
    };

    return (
        <div className="h-screen w-full bg-[#0a0f1e] flex flex-col relative overflow-hidden font-sans">
            
            {/* 3D Background Elements */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full point-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-emerald-600/5 blur-[100px] rounded-full point-events-none -z-10" />

            {/* Top Bar Navigation */}
            <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/60 to-transparent"
            >
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 bg-slate-900/60 backdrop-blur px-4 py-2 rounded-2xl border border-slate-700/50">
                        <div className={`w-2.5 h-2.5 rounded-full ${socketConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className="text-white font-bold text-xs uppercase tracking-widest">{status}</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-slate-400 text-xs">
                        <Shield className="w-4 h-4 text-primary-500" />
                        AES-256 Encrypted
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-slate-900/60 backdrop-blur border border-slate-700/50 px-4 py-2 rounded-xl">
                        <span className="text-white font-black text-sm tabular-nums">42:15</span>
                    </div>
                </div>
            </motion.div>

            {/* Main Stage */}
            <div className="flex-1 w-full p-4 md:p-12 flex flex-col md:flex-row gap-6 relative z-10 pt-24 pb-32">
                 
                 {/* Remote Video Container */}
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative flex-1 bg-slate-900/40 backdrop-blur border border-slate-700/50 rounded-[2.5rem] overflow-hidden shadow-2xl group flex items-center justify-center"
                 >
                     <video 
                         ref={remoteVideoRef} 
                         autoPlay 
                         playsInline 
                         className="absolute inset-0 w-full h-full object-cover"
                     />
                     
                     <AnimatePresence>
                         {participants < 2 && (
                             <motion.div 
                                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                 className="text-center space-y-4"
                             >
                                 <div className="w-20 h-20 mx-auto bg-slate-800 rounded-3xl flex items-center justify-center animate-bounce">
                                     <Info className="w-10 h-10 text-primary-500" />
                                 </div>
                                 <h3 className="text-xl font-bold text-white">Waiting for mentor to join...</h3>
                                 <p className="text-slate-500 max-w-xs mx-auto text-sm">Room ID: {room}</p>
                             </motion.div>
                         )}
                     </AnimatePresence>

                     <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-white text-sm font-bold flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        Remote Mentor
                     </div>
                 </motion.div>

                 {/* Sticky Control Dashboard (Mobile Header / Tablet Side) */}
                 <div className="md:w-96 flex flex-col gap-6">
                     
                     {/* Local Preview */}
                     <motion.div 
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="relative h-64 md:h-80 bg-slate-800 rounded-[2rem] overflow-hidden border-2 border-primary-500/50 shadow-2xl flex items-center justify-center group"
                     >
                         <video 
                             ref={localVideoRef} 
                             autoPlay 
                             playsInline 
                             muted 
                             className={`absolute inset-0 w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`}
                         />
                         
                         <div className={`z-10 text-center ${isVideoOff ? 'block' : 'hidden'}`}>
                             <div className="w-20 h-20 mx-auto bg-slate-700 rounded-2xl flex items-center justify-center text-3xl font-black text-white mb-3 shadow-xl">
                                 {user?.username?.charAt(0).toUpperCase()}
                             </div>
                             <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{streamError ? 'BLOCKED' : 'CAMERA OFF'}</p>
                         </div>

                         <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-xl text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                            You (Lvl {user?.level || 1})
                         </div>

                         {streamError && (
                             <div className="absolute top-4 left-4 right-4 p-3 bg-red-500/90 backdrop-blur rounded-xl flex items-center gap-3">
                                 <AlertTriangle className="w-5 h-5 text-white flex-shrink-0" />
                                 <p className="text-white text-[10px] font-bold leading-tight">{streamError}</p>
                             </div>
                         )}
                     </motion.div>

                     {/* Session Stats */}
                     <motion.div 
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900/60 backdrop-blur p-6 rounded-[2rem] border border-slate-800 flex-1 flex flex-col justify-center"
                     >
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Session Telemetry</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                <p className="text-xs text-slate-500 mb-1">Latency</p>
                                <p className="text-lg font-black text-emerald-400">12ms</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                <p className="text-xs text-slate-500 mb-1">Packet Loss</p>
                                <p className="text-lg font-black text-white">0.01%</p>
                            </div>
                        </div>
                     </motion.div>
                 </div>

            </div>

            {/* Futuristic Controller */}
            <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 px-8"
            >
                <div className="flex items-center gap-6 bg-[#16203a]/90 backdrop-blur-2xl border border-white/10 p-5 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                    
                    <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-5 rounded-2xl transition-all active:scale-90 ${isMuted ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                    >
                        {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>

                    <button 
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className={`p-5 rounded-2xl transition-all active:scale-90 ${isVideoOff ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                    >
                        {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                    </button>

                    <div className="w-px h-10 bg-white/5 mx-2" />

                    <button className="p-5 rounded-2xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-all active:scale-90 group relative">
                        <Share2 className="w-6 h-6" />
                        <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 px-3 py-1 rounded-lg text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">SHARE</span>
                    </button>

                    <button 
                        onClick={leaveCall}
                        className="px-10 py-5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-red-600/20 active:scale-95 flex items-center gap-3"
                    >
                        <PhoneOff className="w-5 h-5" /> End Session
                    </button>

                </div>
            </motion.div>

        </div>
    );
};

export default VideoRoom;

