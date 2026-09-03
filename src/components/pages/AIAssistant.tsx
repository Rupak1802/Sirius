import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Bot,
  Send,
  Mic,
  User,
  Cloud,
  Droplets,
  Bug,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface ChatMessage {
  id: number;
  sender: 'user' | 'ai';
  message: string;
  timestamp: Date;
  type?: 'suggestion' | 'alert' | 'info';
}

export const AIAssistant: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Mock farmer profile data (this would come from user context in real app)
  const farmerProfile = {
    name: 'Ramu Kumar',
    location: 'Kottayam, Kerala',
    farmSize: '3.5 acres',
    crops: ['Rice', 'Coconut', 'Pepper'],
    soilType: 'Laterite'
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'ai',
      message: `Hello ${farmerProfile.name}! I'm your personalized AI farming assistant. I know you're farming ${farmerProfile.crops.join(', ')} in ${farmerProfile.location}. How can I help you today?`,
      timestamp: new Date(),
      type: 'info'
    },
    {
      id: 2,
      sender: 'ai',
      message: `Weather Alert: Light rain expected in ${farmerProfile.location} tomorrow. Perfect timing for your rice fields!`,
      timestamp: new Date(),
      type: 'alert'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const quickSuggestions = [
    {
      text: 'When should I irrigate my rice?',
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      text: 'Check weather for next 3 days',
      icon: Cloud,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      text: 'How to treat coconut pests?',
      icon: Bug,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      text: 'Current market price for pepper',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      sender: 'user',
      message: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const aiMessage: ChatMessage = {
        id: messages.length + 2,
        sender: 'ai',
        message: aiResponse.message,
        timestamp: new Date(),
        type: aiResponse.type
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string): { message: string; type: 'suggestion' | 'alert' | 'info' } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('irrigate') || lowerMessage.includes('water')) {
      return {
        message: `Based on current weather conditions and your rice crop stage (flowering) in ${farmerProfile.location}, I recommend irrigating tomorrow morning. Maintain water level at 2-3 inches for your ${farmerProfile.farmSize} farm. Avoid irrigation on Friday as rain is expected in your area.`,
        type: 'suggestion'
      };
    }
    
    if (lowerMessage.includes('weather')) {
      return {
        message: `Next 3 days forecast for ${farmerProfile.location}: Tomorrow - Light rain (5mm), Day 2 - Cloudy (0mm), Day 3 - Partly cloudy (2mm). Good conditions for your ${farmerProfile.crops.join(', ')} crops, but delay any fertilizer application until after tomorrow's rain.`,
        type: 'info'
      };
    }
    
    if (lowerMessage.includes('pest') || lowerMessage.includes('coconut')) {
      return {
        message: `For your coconut trees in ${farmerProfile.location}: 1) Spray neem oil solution (10ml per liter) early morning, 2) Remove affected fronds, 3) Apply organic pesticide suitable for ${farmerProfile.soilType} soil. Monitor for red palm weevil signs common in Kerala. Would you like detailed treatment steps for your ${farmerProfile.farmSize} grove?`,
        type: 'suggestion'
      };
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('market')) {
      return {
        message: `Current market prices in ${farmerProfile.location}: Pepper - ₹450/kg (+8% from last week), Rice - ₹2,100/quintal (+5%), Coconut - ₹25/piece (-2%). Based on your crops (${farmerProfile.crops.join(', ')}), it's the best time to sell pepper. Hold rice for better prices.`,
        type: 'info'
      };
    }
    
    return {
      message: `I understand you're asking about farming. As your assistant familiar with your ${farmerProfile.farmSize} farm in ${farmerProfile.location}, I can help with crop care, weather, market prices, pest control, irrigation schedules, and government schemes for your ${farmerProfile.crops.join(', ')} crops. Could you be more specific?`,
      type: 'info'
    };
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl">{t('ai.title')}</h1>
              <p className="text-sm text-gray-600">Your smart farming companion</p>
            </div>
          </div>
        </div>

        {/* Quick Suggestions */}
        <Card className="p-4 mb-6">
          <h3 className="text-lg mb-3">{t('ai.suggestions')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickSuggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleSendMessage(suggestion.text)}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${suggestion.bgColor} hover:opacity-80 transition-opacity text-left`}
                >
                  <Icon className={`w-5 h-5 ${suggestion.color}`} />
                  <span className="text-sm">{suggestion.text}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Chat Interface */}
        <Card className="flex flex-col h-96">
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%]`}>
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  
                  <div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-green-600 text-white'
                          : message.type === 'alert'
                          ? 'bg-yellow-50 border border-yellow-200'
                          : message.type === 'suggestion'
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-gray-100'
                      }`}
                    >
                      {message.sender === 'ai' && message.type === 'alert' && (
                        <div className="flex items-center space-x-1 mb-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          <span className="text-xs text-yellow-600 uppercase tracking-wide">Alert</span>
                        </div>
                      )}
                      
                      {message.sender === 'ai' && message.type === 'suggestion' && (
                        <div className="flex items-center space-x-1 mb-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-xs text-blue-600 uppercase tracking-wide">Suggestion</span>
                        </div>
                      )}
                      
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your farming question..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  className="pr-12"
                />
                <button
                  onClick={() => setIsListening(!isListening)}
                  className={`absolute right-3 top-3 p-1 rounded ${
                    isListening 
                      ? 'text-red-600 animate-pulse' 
                      : 'text-gray-400 hover:text-purple-600'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
              <Button 
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim()}
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {isListening && (
              <div className="flex items-center justify-center space-x-2 mt-2 text-sm text-purple-600">
                <div className="flex space-x-1">
                  <div className="w-1 h-3 bg-purple-400 rounded animate-pulse"></div>
                  <div className="w-1 h-4 bg-purple-500 rounded animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-5 bg-purple-600 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1 h-4 bg-purple-500 rounded animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  <div className="w-1 h-3 bg-purple-400 rounded animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <span>{t('voice.listening')}</span>
              </div>
            )}
          </div>
        </Card>

        {/* AI Capabilities */}
        <Card className="p-4 mt-6">
          <h3 className="text-lg mb-3">What I can help you with:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Cloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Weather Forecasts</p>
            </div>
            <div className="text-center">
              <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Irrigation Schedule</p>
            </div>
            <div className="text-center">
              <Bug className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Pest Control</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Market Prices</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};