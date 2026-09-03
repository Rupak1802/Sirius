import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  MessageSquare,
  Bot,
  User,
  Zap
} from 'lucide-react';

interface VoiceMessage {
  id: number;
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
  audioUrl?: string;
}

export const VoiceAssistant: React.FC = () => {
  const { t, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Mock farmer profile data (this would come from user context in real app)
  const farmerProfile = {
    name: 'Ramu Kumar',
    location: 'Kottayam, Kerala',
    farmSize: '3.5 acres',
    crops: ['Rice', 'Coconut', 'Pepper'],
    soilType: 'Laterite',
    recentActivities: ['Irrigation on Rice field', 'Fertilizer application on Coconut trees']
  };
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-IN';
      recognitionRef.current.maxAlternatives = 1;
      
      recognitionRef.current.onstart = () => {
        setError(null);
        console.log('Speech recognition started');
      };
      
      recognitionRef.current.onresult = (event) => {
        const last = event.results.length - 1;
        const transcript = event.results[last][0].transcript;
        setTranscript(transcript);
        
        if (event.results[last].isFinal) {
          handleUserSpeech(transcript);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        let errorMessage = 'Speech recognition error: ';
        
        switch(event.error) {
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please allow microphone permission.';
            break;
          case 'no-speech':
            errorMessage = 'No speech detected. Please try again.';
            break;
          case 'network':
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          case 'audio-capture':
            errorMessage = 'Audio capture error. Please check if microphone is working.';
            break;
          case 'service-not-allowed':
            errorMessage = 'Service not allowed. Please check browser settings.';
            break;
          default:
            errorMessage += event.error;
        }
        setError(errorMessage);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        console.log('Speech recognition ended');
      };
    } else {
      setError('Speech recognition is not supported in this browser.');
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    } else {
      console.warn('Speech synthesis not supported');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, []);

  const startListening = async () => {
    try {
      // Check for microphone permission first
      const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      if (permission.state === 'denied') {
        setError('Microphone permission denied. Please enable microphone access in browser settings.');
        return;
      }

      if (recognitionRef.current && !isListening && !isProcessing) {
        setTranscript('');
        setError(null);
        recognitionRef.current.lang = 'en-IN';
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (err) {
          console.error('Error starting recognition:', err);
          setError('Failed to start speech recognition. Please try again.');
        }
      }
    } catch (err) {
      console.warn('Permission API not supported, proceeding anyway');
      if (recognitionRef.current && !isListening && !isProcessing) {
        setTranscript('');
        setError(null);
        recognitionRef.current.lang = 'en-IN';
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (err) {
          console.error('Error starting recognition:', err);
          setError('Failed to start speech recognition. Please try again.');
        }
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleUserSpeech = async (speechText: string) => {
    if (!speechText.trim()) return;

    // Add user message
    const userMessage: VoiceMessage = {
      id: Date.now(),
      type: 'user',
      text: speechText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setTranscript('');
    setIsProcessing(true);

    // Simulate AI processing and generate response
    setTimeout(() => {
      const aiResponse = generateAIResponse(speechText);
      const aiMessage: VoiceMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
      
      // Speak the AI response (only speak in current language)
      speakText(aiResponse);
    }, 2000);
  };

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Weather related queries
    if (lowerInput.includes('weather') || lowerInput.includes('rain') || lowerInput.includes('temperature')) {
      return `Tomorrow's weather for ${farmerProfile.location}: Light rain 3mm expected. Great for your rice crops in your ${farmerProfile.farmSize} farm. With laterite soil, maintain proper drainage. Temperature 28-32°C.`;
    }
    
    // Market prices
    if (lowerInput.includes('price') || lowerInput.includes('market') || lowerInput.includes('sell')) {
      return 'Today\'s market prices: Pepper ₹450/kg, Rice ₹2,100/quintal, Coconut ₹25/piece, Cardamom ₹2,800/kg. Good selling time for pepper with rising prices.';
    }
    
    // Fertilizer related
    if (lowerInput.includes('fertilizer') || lowerInput.includes('manure') || lowerInput.includes('urea')) {
      return 'Time to apply Urea fertilizer to rice field. Apply 50kg per acre during morning hours. Ensure standing water in field. Also consider adding phosphorus and potash.';
    }
    
    // Irrigation
    if (lowerInput.includes('water') || lowerInput.includes('irrigation') || lowerInput.includes('watering')) {
      return 'Maintain 2-3cm water level in rice field. For pepper, water twice a week. Check soil moisture regularly. Early morning and evening watering is best. Avoid overwatering.';
    }
    
    // Pest control
    if (lowerInput.includes('pest') || lowerInput.includes('disease') || lowerInput.includes('insect')) {
      return 'For coconut pests, spray neem oil solution. Use pheromone traps for rice stem borer. Apply early morning or evening. Organic pesticides are recommended for better crop health.';
    }
    
    // Harvesting
    if (lowerInput.includes('harvest') || lowerInput.includes('cutting') || lowerInput.includes('reap')) {
      return 'Harvest rice when 80% grains are mature. Morning harvest reduces moisture content. Check grain firmness. Use sharp cutting tools. Dry properly before storage.';
    }
    
    // Coconut specific
    if (lowerInput.includes('coconut') || lowerInput.includes('palm')) {
      return 'Coconut trees need monthly fertilization. Apply fertilizer around the root zone. Check for pest attacks regularly. Annual pruning of dry fronds is recommended.';
    }
    
    // Rice specific
    if (lowerInput.includes('rice') || lowerInput.includes('paddy')) {
      return 'Rice cultivation requires standing water. Apply fertilizers on time. Check for pest attacks. Remove weeds regularly. Special care needed during flowering stage.';
    }
    
    // General greetings
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('good morning') || lowerInput.includes('namaste')) {
      return 'Hello! I\'m your farming assistant. You can ask me about weather, market prices, crop care, fertilization, irrigation, and pest control. How can I help you today?';
    }
    
    // Default response
    return 'Sorry, I didn\'t understand. You can ask about weather, market prices, crop care, fertilization, irrigation, or pest control. Try saying "hello" to get started.';
  };

  const speakText = (text: string) => {
    if (synthesisRef.current) {
      // Cancel any ongoing speech
      synthesisRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        console.log('Started speaking:', text.substring(0, 50));
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        console.log('Finished speaking');
      };
      
      utterance.onerror = (event) => {
        setIsSpeaking(false);
        console.error('Speech synthesis error:', event.error);
        // Don't show error to user for speech synthesis failures
      };

      // Wait a bit for the synthesis to be ready
      setTimeout(() => {
        if (synthesisRef.current) {
          synthesisRef.current.speak(utterance);
        }
      }, 100);
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl mb-2">{t('voice.title')}</h1>
          <p className="text-gray-600">{t('voice.speaktoassistant')}</p>
        </div>

        {/* Main Voice Interface */}
        <Card className="p-8 mb-6 text-center">
          <div className="space-y-6">
            {/* Voice Visualizer */}
            <div className="relative">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${
                isListening 
                  ? 'bg-red-100 ring-4 ring-red-200 animate-pulse' 
                  : isSpeaking
                  ? 'bg-blue-100 ring-4 ring-blue-200 animate-pulse'
                  : 'bg-purple-100 hover:bg-purple-200'
              }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isListening 
                    ? 'bg-red-600' 
                    : isSpeaking
                    ? 'bg-blue-600'
                    : 'bg-purple-600'
                }`}>
                  {isListening ? (
                    <Mic className="w-8 h-8 text-white" />
                  ) : isSpeaking ? (
                    <Volume2 className="w-8 h-8 text-white" />
                  ) : (
                    <Mic className="w-8 h-8 text-white" />
                  )}
                </div>
              </div>
              
              {/* Audio Waveform Animation */}
              {isListening && (
                <div className="flex justify-center space-x-1 mt-4">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-red-500 rounded animate-pulse"
                      style={{
                        height: `${16 + Math.random() * 24}px`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '0.8s'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Status Text */}
            <div>
              <h2 className="text-xl mb-2">
                {isListening 
                  ? t('voice.listening')
                  : isProcessing
                  ? t('voice.processing')
                  : isSpeaking
                  ? t('voice.response')
                  : t('voice.speaktoassistant')
                }
              </h2>
              <p className="text-gray-600">{t('voice.askabout')}</p>
            </div>

            {/* Live Transcript */}
            {transcript && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-700">"{transcript}"</p>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex justify-center space-x-4">
              {!isListening ? (
               <Button 
                  onClick={startListening}
                  disabled={isProcessing || isSpeaking}
                  size="lg"
                  className="flex items-center space-x-2"
                >
                  <Mic className="w-5 h-5" />
                  <span>{t('voice.startlistening')}</span>
                </Button>
              ) : (
                <Button 
                  onClick={stopListening}
                  variant="destructive"
                  size="lg"
                  className="flex items-center space-x-2"
                >
                  <MicOff className="w-5 h-5" />
                  <span>{t('voice.stoplistening')}</span>
                </Button>
              )}
              
              {isSpeaking && (
                <Button 
                  onClick={stopSpeaking}
                  variant="outline"
                  size="lg"
                  className="flex items-center space-x-2"
                >
                  <VolumeX className="w-5 h-5" />
                  <span>Stop</span>
                </Button>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Conversation History */}
        {messages.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg">Conversation History</h3>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%]`}>
                    {message.type === 'ai' && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                    )}
                    
                    <div>
                      <div
                        className={`p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Voice Tips */}
        <Card className="p-6 mt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg">Voice Tips</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm">You can ask about:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Weather forecast</li>
                <li>• Market prices</li>
                <li>• Crop care tips</li>
                <li>• Irrigation schedule</li>
                <li>• Pest control advice</li>
                <li>• Harvest timing</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm">Voice Commands:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "What's the weather?"</li>
                <li>• "Rice price today"</li>
                <li>• "When to water crops?"</li>
                <li>• "Fertilizer timing"</li>
                <li>• "Hello" or "Hi"</li>
                <li>• "Coconut tree care"</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};