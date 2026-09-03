import React, { useState } from 'react';
import { LanguageProvider } from './components/LanguageContext';
import { GlobalNavigation } from './components/GlobalNavigation';
import { Dashboard } from './components/pages/Dashboard';
import { ActivityTracer } from './components/pages/ActivityTracer';
import { AIAssistant } from './components/pages/AIAssistant';
import { ImageAnalysis } from './components/pages/ImageAnalysis';
import { MyCrops } from './components/pages/MyCrops';
import { VoiceAssistant } from './components/pages/VoiceAssistant';
import { Reminders } from './components/pages/Reminders';
import { PoultrySales } from './components/pages/PoultrySales';
import { FloatingAssistants } from './components/FloatingAssistants';
import { AuthModal } from './components/AuthModal';

// Placeholder components for remaining pages
const GovernmentSchemes = () => {
  const schemes = [
    {
      title: 'PM-KISAN Scheme',
      benefit: '₹6,000 per year',
      deadline: 'March 31, 2024',
      status: 'Active',
      url: 'https://pmkisan.gov.in/',
      description: 'Direct income support for small and marginal farmers'
    },
    {
      title: 'Crop Insurance Scheme',
      benefit: 'Premium subsidy up to 50%',
      deadline: 'April 15, 2024',
      status: 'Apply Now',
      url: 'https://pmfby.gov.in/',
      description: 'Comprehensive crop insurance coverage'
    },
    {
      title: 'Organic Farming Subsidy',
      benefit: '₹50,000 per hectare',
      deadline: 'May 30, 2024',
      status: 'Available',
      url: 'https://pgsindia-ncof.gov.in/',
      description: 'Support for organic farming practices'
    },
    {
      title: 'Drip Irrigation Subsidy',
      benefit: '90% subsidy on equipment',
      deadline: 'June 15, 2024',
      status: 'Limited Slots',
      url: 'https://pmksy.gov.in/',
      description: 'Micro irrigation system support'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl mb-6">Government Schemes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schemes.map((scheme, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="text-lg text-green-700 mb-2">
                {scheme.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {scheme.benefit}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                {scheme.description}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Deadline: {scheme.deadline}
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.open(scheme.url, '_blank')}
                  className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 flex-1"
                >
                  {scheme.status}
                </button>
                <button 
                  onClick={() => window.open(scheme.url, '_blank')}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                  🔗 Visit Site
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Knowledge = () => {
  const articles = [
    { 
      title: 'Rice Cultivation Guide', 
      category: 'Crop Care', 
      icon: '🌾',
      url: 'https://www.icar.org.in/content/rice-production-technology',
      description: 'Complete guide for rice farming in Kerala'
    },
    { 
      title: 'Coconut Tree Management', 
      category: 'Tree Care', 
      icon: '🥥',
      url: 'https://coconutboard.gov.in/technology.htm',
      description: 'Best practices for coconut cultivation'
    },
    { 
      title: 'Pest Control Methods', 
      category: 'Pest Management', 
      icon: '🐛',
      url: 'https://ppqs.gov.in/divisions/integrated-pest-management-ipm',
      description: 'Integrated pest management strategies'
    },
    { 
      title: 'Irrigation Best Practices', 
      category: 'Water Management', 
      icon: '💧',
      url: 'https://incid.org.in/irrigation-practices/',
      description: 'Efficient water management techniques'
    },
    { 
      title: 'Organic Fertilizers', 
      category: 'Soil Health', 
      icon: '🌱',
      url: 'https://ncof.dacnet.nic.in/Training_modules.aspx',
      description: 'Natural fertilizer preparation and usage'
    },
    { 
      title: 'Weather Reading Tips', 
      category: 'Climate', 
      icon: '🌤️',
      url: 'https://mausam.imd.gov.in/imd_latest/contents/agriculture.php',
      description: 'Understanding weather patterns for farming'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl mb-6">Knowledge Center</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">{article.icon}</div>
              <h3 className="text-lg mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {article.category}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                {article.description}
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.open(article.url, '_blank')}
                  className="text-blue-600 text-sm hover:underline flex-1 text-left"
                >
                  Read More →
                </button>
                <button 
                  onClick={() => window.open(article.url, '_blank')}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                >
                  🔗 Visit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard userData={userData} />;
      case 'activity': return <ActivityTracer />;
      case 'ai': return <AIAssistant />;
      case 'analysis': return <ImageAnalysis />;
      case 'schemes': return <GovernmentSchemes />;
      case 'knowledge': return <Knowledge />;
      case 'voice': return <VoiceAssistant />;
      case 'reminder': return <Reminders />;
      case 'crops': return <MyCrops />;
      case 'sales': return <PoultrySales />;
      default: return <Dashboard userData={userData} />;
    }
  };

  const handleVoiceClick = () => {
    setCurrentPage('voice');
  };

  const handleAIClick = () => {
    setCurrentPage('ai');
  };

  const handleLogin = (user: any) => {
    setUserData(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserData(null);
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50">
          <AuthModal 
            isOpen={true} 
            onClose={() => {}} // Prevent closing until logged in
            onLogin={handleLogin}
          />
        </div>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <GlobalNavigation 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          userData={userData}
          onLogout={handleLogout}
        />
        <main>
          {renderPage()}
        </main>
        
        {/* Floating Assistants */}
        <FloatingAssistants 
          onVoiceClick={handleVoiceClick}
          onAIClick={handleAIClick}
        />
      </div>
    </LanguageProvider>
  );
}