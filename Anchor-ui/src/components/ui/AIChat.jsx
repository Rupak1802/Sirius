import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, Mic, Square } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function AIChat() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Mitra, your financial assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      let aiResponse = "I recommend moving ₹350 into your Emergency Fund today to stay on track for your goal.";
      if (text.toLowerCase().includes('hello') || text.toLowerCase().includes('hi')) {
        aiResponse = "Hello! I can help you analyze your income, set savings goals, or simulate what happens if you take a day off. What do you need?";
      } else if (text.toLowerCase().includes('save') || text.toLowerCase().includes('money')) {
        aiResponse = "To save more money this week, I suggest picking up a weekend evening shift on Swiggy and reducing your flexible spending by ₹300.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: aiResponse, sender: 'ai' }]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Automatically open chat and show the processed recorded answer
      if(!isOpen) setIsOpen(true);
      handleSend("What should I do to save more money this week?"); // Mock recorded text
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Recording indicator outside chat window when closed */}
      {!isOpen && isRecording && (
        <div className="mb-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse flex items-center gap-2">
          <Mic size={16} /> Listening...
        </div>
      )}

      {/* Mic Button Above Chat Toggle */}
      {!isOpen && (
        <button 
          onClick={toggleRecording}
          className={`mb-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110 ${
            isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-white dark:bg-black/80 text-[var(--text-color)] border border-[var(--card-border)] hover:border-blue-500 hover:text-blue-500'
          }`}
        >
          {isRecording ? <Square size={20} fill="currentColor" /> : <Mic size={20} />}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[500px] max-h-[80vh] glass-panel rounded-2xl shadow-2xl flex flex-col overflow-hidden border-blue-500/30 animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg"><Bot size={20} /></div>
              <h3 className="font-bold">Mitra Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/5 dark:bg-white/5">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl max-w-[85%] ${
                  msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-white/10 text-[var(--text-color)] border border-[var(--card-border)] rounded-tl-none shadow-sm'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl max-w-[85%] bg-white dark:bg-white/10 text-[var(--text-color)] border border-[var(--card-border)] rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-blue-500" />
                  <span className="text-xs text-[var(--text-muted)]">Mitra is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-[var(--card-bg)] border-t border-[var(--card-border)] shrink-0">
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleRecording}
                className={`p-2 rounded-xl transition-all flex items-center justify-center shrink-0 ${
                  isRecording 
                  ? 'bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                  : 'bg-black/10 dark:bg-white/10 text-[var(--text-muted)] hover:text-blue-500'
                }`}
              >
                {isRecording ? <Square size={18} fill="currentColor" /> : <Mic size={18} />}
              </button>
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex-1 relative"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isRecording ? "Listening..." : "Message Mitra..."}
                  disabled={isRecording}
                  className="w-full bg-black/5 dark:bg-white/5 border border-[var(--card-border)] rounded-xl py-2 pl-3 pr-10 text-[var(--text-color)] text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isRecording}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-blue-500 disabled:text-[var(--text-muted)] hover:bg-blue-500/10 rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform transform hover:scale-110"
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
}
