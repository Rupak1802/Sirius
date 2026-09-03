import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    dashboard: "Smart Dashboard",
    earnings: "Earnings",
    plan: "Money Plan",
    savings: "Smart Savings",
    weather: "Fin Weather",
    whatif: "What If?",
    emergency: "Emergency",
    insights: "Insights",
    growth: "Growth Engine",
    report: "Weekly Report",
    profile: "Profile",
    platforms: "Platforms",
    budget: "Budget Manager",
    logout: "Logout",
    welcome: "Good evening",
    available: "Available to safely use",
    stable: "Stable",
    income: "Income",
    expenses: "Expenses",
    upcoming: "Upcoming",
    protect: "Keep yourself earning",
    voice_dashboard: "Good evening. Your financial status is stable. You have ₹4,280 available to safely use this week."
  },
  hi: {
    dashboard: "स्मार्ट डैशबोर्ड",
    earnings: "कमाई",
    plan: "मनी प्लान",
    savings: "बचत",
    weather: "वित्तीय मौसम",
    whatif: "अगर ऐसा हुआ?",
    emergency: "आपातकाल",
    insights: "सुझाव",
    growth: "विकास",
    report: "साप्ताहिक रिपोर्ट",
    profile: "प्रोफ़ाइल",
    platforms: "प्लेटफार्म",
    budget: "बजट प्रबंधक",
    logout: "लॉग आउट",
    welcome: "शुभ संध्या",
    available: "सुरक्षित उपयोग के लिए उपलब्ध",
    stable: "स्थिर",
    income: "आय",
    expenses: "खर्च",
    upcoming: "आगामी",
    protect: "अपनी कमाई सुरक्षित रखें",
    voice_dashboard: "शुभ संध्या। आपकी वित्तीय स्थिति स्थिर है। इस सप्ताह आपके पास सुरक्षित उपयोग के लिए ₹4,280 हैं।"
  },
  ta: {
    dashboard: "ஸ்மார்ட் டேஷ்போர்டு",
    earnings: "வருமானம்",
    plan: "பணத் திட்டம்",
    savings: "சேமிப்பு",
    weather: "நிதி வானிலை",
    whatif: "என்ன நடந்தால்?",
    emergency: "அவசரம்",
    insights: "உள்ளுணர்வுகள்",
    growth: "வளர்ச்சி",
    report: "வாராந்திர அறிக்கை",
    profile: "சுயவிவரம்",
    platforms: "தளங்கள்",
    budget: "பட்ஜெட் மேலாளர்",
    logout: "வெளியேறு",
    welcome: "மாலை வணக்கம்",
    available: "பயன்படுத்த கிடைக்கும் தொகை",
    stable: "நிலையானது",
    income: "வருவாய்",
    expenses: "செலவுகள்",
    upcoming: "வரவிருக்கும்",
    protect: "உங்கள் வருமானத்தை பாதுகாக்கவும்",
    voice_dashboard: "மாலை வணக்கம். உங்கள் நிதி நிலை நிலையானது. உங்களிடம் ₹4,280 உள்ளது."
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'hi' : prev === 'hi' ? 'ta' : 'en');
  };

  const getLanguageLabel = () => {
    if(lang === 'en') return 'EN';
    if(lang === 'hi') return 'हि';
    if(lang === 'ta') return 'த';
    return 'EN';
  }

  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, getLanguageLabel, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
