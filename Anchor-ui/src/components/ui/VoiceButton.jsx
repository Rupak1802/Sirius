import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

export default function VoiceButton({ text, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech not supported in this browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    // Try to find a good English/Indian voice
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(v => v.lang.includes('en-IN')) || voices[0];
    if (indianVoice) utterance.voice = indianVoice;
    
    utterance.rate = 1.0;
    
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button 
      onClick={speak}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
        isPlaying 
          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
          : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
      } ${className}`}
      aria-label="Listen to text"
    >
      {isPlaying ? <VolumeX size={16} className="animate-pulse" /> : <Volume2 size={16} />}
      {isPlaying ? 'Stop' : 'Listen'}
    </button>
  );
}
