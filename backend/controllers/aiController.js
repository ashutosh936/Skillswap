const axios = require('axios');

// @desc    Chat with the AI Mentor (OpenAI proxy)
// @route   POST /api/ai/chat
// @access  Private (requires auth token)
const aiChat = async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ message: 'Messages array is required' });
        }

        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

        if (!OPENAI_API_KEY || OPENAI_API_KEY === 'YOUR_OPENAI_API_KEY_HERE') {
            // Fallback to intelligent mock responses when no API key is set
            const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
            const mockReply = getSmartMockResponse(lastUserMsg);
            return res.json({
                reply: mockReply,
                source: 'mock'
            });
        }

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `You are an AI Peer Learning Mentor on the PeerLoom platform. You help users:
1. Find the best learning paths for their goals.
2. Debug code snippets they paste.
3. Recommend trending skills based on market demand.
4. Suggest platform features like 1-on-1 mentoring, communities, and marketplace courses.
5. Provide motivational and actionable advice.
Keep responses concise (2-4 paragraphs max), friendly, and actionable. Use emojis sparingly.`
                    },
                    ...messages
                ],
                max_tokens: 500,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        const reply = response.data.choices[0].message.content;
        res.json({ reply, source: 'openai' });

    } catch (error) {
        console.error('AI Chat Error:', error.response?.data || error.message);
        
        // Graceful fallback on API error
        const lastUserMsg = req.body.messages?.filter(m => m.role === 'user').pop()?.content || '';
        res.json({
            reply: getSmartMockResponse(lastUserMsg),
            source: 'fallback'
        });
    }
};

// Smart mock responses when OpenAI is unavailable
function getSmartMockResponse(query) {
    const q = query.toLowerCase();
    
    if (q.includes('react') || q.includes('frontend'))
        return "React is one of the most in-demand frontend skills! 🚀 Here's a recommended path:\n\n1. **Basics**: Learn JSX, components, props, and state\n2. **Hooks**: Master useState, useEffect, useContext\n3. **Routing**: React Router for multi-page apps\n4. **State Management**: Zustand or Redux Toolkit\n5. **Projects**: Build a portfolio with 2-3 real apps\n\nI'd recommend joining our 'React Enthusiasts' community on the platform — you can find mentors who teach React for just 15 credits per session!";

    if (q.includes('python') || q.includes('backend') || q.includes('django'))
        return "Python is incredibly versatile! 🐍 Here's what I suggest:\n\n1. **Fundamentals**: Variables, loops, functions, OOP\n2. **Web**: Django or FastAPI for backend development\n3. **Data**: Pandas, NumPy for data analysis\n4. **AI/ML**: Scikit-learn, then TensorFlow/PyTorch\n\nPython developers are earning $95K-$150K on average. Check the Marketplace for our 'Python Mastery' course!";

    if (q.includes('career') || q.includes('job') || q.includes('interview'))
        return "Great question about career planning! 💼 Here are the most in-demand skills right now:\n\n1. **AI/ML Engineering** — Highest growth\n2. **Full-Stack Development** (React + Node.js)\n3. **Cloud Architecture** (AWS/GCP)\n4. **DevOps/Platform Engineering**\n\nI recommend building a portfolio with 3-5 projects and contributing to open source. Book a 1-on-1 session with a senior mentor on our platform for personalized guidance!";

    if (q.includes('debug') || q.includes('error') || q.includes('bug') || q.includes('fix'))
        return "I'd love to help you debug! 🔍 Please share:\n\n1. **The code snippet** — paste it in your next message\n2. **The error message** — exact text from the console\n3. **What you expected** vs what actually happened\n\nCommon debugging tips:\n- Check the browser DevTools console (F12)\n- Add `console.log()` at key points\n- Verify your variable types with `typeof`\n- Check for typos in variable/function names";

    if (q.includes('skill') || q.includes('trend') || q.includes('market') || q.includes('learn'))
        return "Based on current market trends, here are the hottest skills for 2026: 🔥\n\n1. **AI/LLM Integration** (LangChain, RAG pipelines)\n2. **TypeScript** — now required at most top companies\n3. **System Design** — critical for senior roles\n4. **Rust/Go** — growing fast in infrastructure\n5. **Next.js/Remix** — modern full-stack frameworks\n\nWould you like me to recommend a mentor who specializes in any of these?";

    return "That's a great question! 🎯 On PeerLoom, you have several options:\n\n1. **Find a Mentor** — Browse our Explore page for experts in your topic\n2. **Join a Community** — Peer-learning groups for collaborative study\n3. **Marketplace Courses** — Unlock structured courses with your credits\n4. **1-on-1 Video Sessions** — Deep-dive with a real mentor\n\nWhat specific topic would you like to explore? I can give you a personalized learning roadmap!";
}

module.exports = { aiChat };
