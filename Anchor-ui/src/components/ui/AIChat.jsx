import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi Rahul! I'm Mitra, your financial co-pilot. I noticed your income might dip this week. Want to review your fuel expenses?", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      let response = "I've recorded that. Let's keep your essentials protected.";
      if (input.toLowerCase().includes("fuel")) {
        response = "Your typical fuel expense is ₹500/week. Since you're driving less this week, we could lower the protected amount to ₹300. Shall I update your plan?";
      } else if (input.toLowerCase().includes("save")) {
        response = "Great idea! You have a ₹1,950 buffer right now. We could move ₹400 into your Emergency Fund safely.";
      }
      
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: "ai" }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all transform hover:scale-110 z-50 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-80 sm:w-96 glass-card border border-white/10 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right z-50 ${isOpen ? 'scale-100 opacity-100 h-[500px]' : 'scale-0 opacity-0 h-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-blue-600/20 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Mitra AI Coach</h3>
              <p className="text-xs text-blue-200">Online & Ready</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/50 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-sm' 
                  : 'bg-white/10 text-slate-200 border border-white/5 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-white/10 bg-black/20">
          <form onSubmit={handleSend} className="flex gap-2 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Mitra for advice..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
