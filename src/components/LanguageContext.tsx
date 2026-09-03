import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.activity': 'Activity',
    'nav.ai': 'AI Assistant',
    'nav.analysis': 'Image Analysis',
    'nav.schemes': 'Schemes',
    'nav.knowledge': 'Knowledge',
    'nav.voice': 'Voice',
    'nav.reminder': 'Reminder',
    'nav.crops': 'My Crops',
    'nav.sales': 'Poultry & Livestock',
    
    // Dashboard
    'dashboard.title': 'Farmer Dashboard',
    'dashboard.weather': 'Weather Forecast',
    'dashboard.market': 'Market Prices',
    'dashboard.profile': 'Farmer Profile',
    'dashboard.mycrops': 'My Crops',
    'dashboard.addcrop': 'Add Crop',
    'dashboard.logactivity': 'Log Activity',
    'dashboard.checkscheme': 'Check Scheme',
    'dashboard.setreminder': 'Set Reminder',
    'dashboard.voiceassistant': 'Voice Assistant',
    'dashboard.chatassistant': 'Chat Assistant',
    
    // Common
    'common.hello': 'Hello',
    'common.farmer': 'Farmer',
    'common.landsize': 'Land Size',
    'common.soiltype': 'Soil Type',
    'common.healthy': 'Healthy',
    'common.warning': 'Warning',
    'common.critical': 'Critical',
    'common.days': 'days',
    'common.acres': 'acres',
    'common.upload': 'Upload Photo',
    'common.speak': 'Speak Now',
    'common.search': 'Search',
    
    // Activities
    'activity.title': 'Activity Tracer',
    'activity.sowing': 'Sowing',
    'activity.irrigation': 'Irrigation',
    'activity.fertilization': 'Fertilization',
    'activity.pest': 'Pest Notice',
    
    // AI Assistant
    'ai.title': 'AI Assistant',
    'ai.suggestions': 'Quick Suggestions',
    'ai.rainalert': 'Rain expected tomorrow, delay irrigation',
    'ai.fertilizer': 'Time to apply fertilizer to rice crop',
    'ai.pestcontrol': 'Check for pests in coconut trees',
    
    // Schemes
    'schemes.title': 'Government Schemes',
    'schemes.active': 'Active Schemes',
    'schemes.apply': 'Apply Now',
    'schemes.bookmark': 'Bookmark',
    
    // Voice
    'voice.title': 'Voice Assistant',
    'voice.listening': 'Listening...',
    'voice.processing': 'Processing...',
    'voice.response': 'Speaking response...',
    'voice.speaktoassistant': 'Tap to speak with your AI assistant',
    'voice.askabout': 'Ask about weather, crops, market prices, or farming tips',
    'voice.startlistening': 'Start Listening',
    'voice.stoplistening': 'Stop Listening',
    'voice.tapmic': 'Tap microphone to speak',
    
    // Knowledge
    'knowledge.title': 'Knowledge Center',
    'knowledge.categories': 'Categories',
    'knowledge.cropcare': 'Crop Care',
    'knowledge.pest': 'Pest Management',
    'knowledge.irrigation': 'Irrigation',
    'knowledge.practices': 'Best Practices',
    
    // Crops
    'crops.stage': 'Stage',
    'crops.health': 'Health',
    'crops.yield': 'Expected Yield',
    'crops.recommendations': 'AI Recommendations',
    
    // Weather
    'weather.today': 'Today',
    'weather.temperature': 'Temperature',
    'weather.humidity': 'Humidity',
    'weather.rainfall': 'Rainfall',
    
    // Add Crop Modal
    'addcrop.title': 'Add New Crop',
    'addcrop.description': 'Add a new crop to your farm management system. Fill in the details to start tracking your crop\'s progress.',
    'addcrop.name': 'Crop Name',
    'addcrop.variety': 'Variety',
    'addcrop.area': 'Area',
    'addcrop.plantingdate': 'Planting Date',
    'addcrop.stage': 'Growth Stage',
    'addcrop.save': 'Save Crop',
    
    // Profile
    'profile.cancel': 'Cancel',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};