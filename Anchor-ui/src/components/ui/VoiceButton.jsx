import { Volume2 } from 'lucide-react';
import GlassButton from './GlassButton';

export default function VoiceButton({ text, className = '' }) {
  const handlePlay = () => {
    // In a real app, this would use Web Speech API or a TTS service
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <GlassButton 
      variant="primary" 
      onClick={handlePlay} 
      className={`flex items-center gap-2 ${className}`}
      title="Listen to this text"
    >
      <Volume2 size={18} />
      <span>Listen</span>
    </GlassButton>
  );
}
