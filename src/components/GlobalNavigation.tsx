import React from 'react';
import { useLanguage } from './LanguageContext';
import { 
  Home, 
  Calendar, 
  Bot, 
  Camera, 
  Building2, 
  BookOpen, 
  Mic, 
  Bell, 
  Sprout,
  LogOut,
  User,
  ShoppingBag
} from 'lucide-react';

interface GlobalNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  userData?: any;
  onLogout?: () => void;
}

const navigationItems = [
  { id: 'dashboard', icon: Home, key: 'nav.dashboard' },
  { id: 'activity', icon: Calendar, key: 'nav.activity' },
  { id: 'ai', icon: Bot, key: 'nav.ai' },
  { id: 'analysis', icon: Camera, key: 'nav.analysis' },
  { id: 'schemes', icon: Building2, key: 'nav.schemes' },
  { id: 'knowledge', icon: BookOpen, key: 'nav.knowledge' },
  { id: 'voice', icon: Mic, key: 'nav.voice' },
  { id: 'reminder', icon: Bell, key: 'nav.reminder' },
  { id: 'crops', icon: Sprout, key: 'nav.crops' },
  { id: 'sales', icon: ShoppingBag, key: 'nav.sales' },
];

const navStyles = `
  .nav-container {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(229, 231, 235, 0.6);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    transition: all 0.3s ease;
  }
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  .nav-logo:hover {
    transform: scale(1.02);
  }
  .nav-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 500;
    color: #4b5563;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid transparent;
  }
  .nav-btn:hover {
    color: #16a34a;
    background-color: #f0fdf4;
  }
  .nav-btn-active {
    color: #15803d !important;
    background-color: #ecfdf5 !important;
    border-color: #bbf7d0 !important;
    box-shadow: 0 2px 4px rgba(22, 163, 74, 0.06);
    font-weight: 600;
  }
  .nav-btn-active svg {
    color: #16a34a;
  }
  .nav-profile {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
    border: 1px solid #bbf7d0;
    border-radius: 9999px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  }
  .nav-logout {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 500;
    color: #4b5563;
    transition: all 0.2s ease;
  }
  .nav-logout:hover {
    color: #dc2626;
    background-color: #fef2f2;
  }
  
  .nav-scroll-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    flex-grow: 1;
    max-width: calc(100% - 280px);
  }
  .nav-scroll-wrapper::-webkit-scrollbar {
    display: none;
  }
  
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const GlobalNavigation: React.FC<GlobalNavigationProps> = ({ 
  currentPage, 
  onPageChange,
  userData,
  onLogout
}) => {
  const { t } = useLanguage();

  return (
    <nav className="nav-container">
      <style dangerouslySetInnerHTML={{ __html: navStyles }} />
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div 
              className="nav-logo shrink-0" 
              onClick={() => onPageChange('dashboard')}
            >
              <Sprout className="w-5 h-5" style={{ color: '#16a34a' }} />
              <span className="font-bold text-gray-800 text-sm lg:text-base tracking-tight">Krishi Sakhi</span>
            </div>

            {/* Navigation Items (Scrollable if overflow) */}
            <div className="nav-scroll-wrapper px-4 mx-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`nav-btn whitespace-nowrap ${isActive ? 'nav-btn-active' : ''}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{t(item.key)}</span>
                  </button>
                );
              })}
            </div>
            
            {/* User Info & Logout */}
            <div className="flex items-center space-x-2 shrink-0">
              {userData && (
                <div className="nav-profile">
                  <User className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-xs font-semibold text-green-800">{userData.name}</span>
                </div>
              )}

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="nav-logout"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span className="hidden lg:inline text-xs">Logout</span>
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div 
            className="flex items-center space-x-1.5"
            onClick={() => onPageChange('dashboard')}
          >
            <Sprout className="w-5 h-5 text-green-600" />
            <span className="font-bold text-gray-800 text-sm">Krishi Sakhi</span>
          </div>
          <div className="flex items-center space-x-2">
            {/* Mobile User Info */}
            {userData && (
              <div className="flex items-center space-x-1 px-2.5 py-1 bg-green-50 rounded-full text-green-700 text-xs font-medium border border-green-100">
                <User className="w-3 h-3" />
                <span>{userData.name.split(' ')[0]}</span>
              </div>
            )}

            {/* Mobile Logout */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center p-1.5 rounded-full text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation Scrollable */}
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex space-x-1 px-4 py-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all text-xs whitespace-nowrap border ${
                    isActive
                      ? 'bg-green-50 text-green-700 border-green-200 font-semibold shadow-xs'
                      : 'text-gray-500 hover:text-green-600 border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t(item.key)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};