import React from 'react';
import { Button } from './ui/button';
import { MessageSquare, Mic } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface FloatingAssistantsProps {
  onVoiceClick: () => void;
  onAIClick: () => void;
}

export function FloatingAssistants({ onVoiceClick, onAIClick }: FloatingAssistantsProps) {
  const { language } = useLanguage();

  const texts = {
    en: {
      voiceAssistant: 'Voice Assistant',
      aiAssistant: 'AI Assistant'
    },
    ml: {
      voiceAssistant: 'വോയ്‌സ് അസിസ്റ്റന്റ്',
      aiAssistant: 'AI അസിസ്റ്റന്റ്'
    }
  };

  const t = texts[language] || texts.en;

  return (
    <div className="fixed right-4 bottom-20 flex flex-col gap-3 z-50">
      <Button
        onClick={onVoiceClick}
        size="lg"
        className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg h-14 w-14 p-0 group"
        title={t.voiceAssistant}
      >
        <Mic className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </Button>
      
      <Button
        onClick={onAIClick}
        size="lg"
        className="rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg h-14 w-14 p-0 group"
        title={t.aiAssistant}
      >
        <MessageSquare className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </Button>
    </div>
  );
}