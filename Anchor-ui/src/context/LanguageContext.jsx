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
    logout: "Logout",
    welcome: "Good evening, Rahul",
    available: "Available to safely use",
    stable: "Stable",
    income: "Income",
    expenses: "Expenses",
    upcoming: "Upcoming",
    protect: "Keep yourself earning",
    voice_dashboard: "Good evening Rahul. Your financial status is stable. You have ₹4,280 available to safely use this week."
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
    logout: "लॉग आउट",
    welcome: "शुभ संध्या, राहुल",
    available: "सुरक्षित उपयोग के लिए उपलब्ध",
    stable: "स्थिर",
    income: "आय",
    expenses: "खर्च",
    upcoming: "आगामी",
    protect: "अपनी कमाई सुरक्षित रखें",
    voice_dashboard: "शुभ संध्या राहुल। आपकी वित्तीय स्थिति स्थिर है। इस सप्ताह आपके पास सुरक्षित उपयोग के लिए ₹4,280 हैं।"
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
