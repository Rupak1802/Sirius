import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, LineChart, PieChart, PiggyBank, CloudRain, HelpCircle, AlertTriangle, Lightbulb, LogOut, TrendingUp, FileText, Sun, Moon, Briefcase, Calculator, User } from 'lucide-react';
import AIChat from '../components/ui/AIChat';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage, getLanguageLabel, t } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive ? 'bg-blue-600/20 text-blue-500 shadow-sm border border-blue-500/30 font-bold' : 'text-[var(--text-muted)] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[var(--text-color)]'
    }`;
  };

  return (
    <div className="min-h-screen flex text-[var(--text-color)] font-sans relative">
      {/* Sidebar Navigation */}
      <aside className="w-64 glass-panel hidden md:flex flex-col sticky top-0 h-screen z-10">
        <div className="p-6 border-b border-[var(--card-border)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">M</div>
              <div>
                <h1 className="font-bold text-xl tracking-wide">Flint</h1>
                <p className="text-[10px] text-blue-500 font-bold tracking-widest uppercase">Co-Pilot</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button onClick={toggleTheme} className="p-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-muted)]" title="Toggle Theme">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button onClick={toggleLanguage} className="p-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-muted)] font-bold text-xs" title="Toggle Language">
                {getLanguageLabel()}
              </button>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          <Link to="/" className={getLinkClass('/')}><Home size={18} /> <span>{t('dashboard')}</span></Link>
          <Link to="/earnings" className={getLinkClass('/earnings')}><LineChart size={18} /> <span>{t('earnings')}</span></Link>
          <Link to="/plan" className={getLinkClass('/plan')}><PieChart size={18} /> <span>{t('plan')}</span></Link>
          <Link to="/budget-manager" className={getLinkClass('/budget-manager')}><Calculator size={18} /> <span>{t('budget')}</span></Link>
          <Link to="/savings" className={getLinkClass('/savings')}><PiggyBank size={18} /> <span>{t('savings')}</span></Link>
          <Link to="/weather" className={getLinkClass('/weather')}><CloudRain size={18} /> <span>{t('weather')}</span></Link>
          <Link to="/platforms" className={getLinkClass('/platforms')}><Briefcase size={18} /> <span>{t('platforms')}</span></Link>
          <Link to="/whatif" className={getLinkClass('/whatif')}><HelpCircle size={18} /> <span>{t('whatif')}</span></Link>
          <Link to="/emergency" className={getLinkClass('/emergency')}><AlertTriangle size={18} /> <span>{t('emergency')}</span></Link>
          <Link to="/insights" className={getLinkClass('/insights')}><Lightbulb size={18} /> <span>{t('insights')}</span></Link>
          <Link to="/growth" className={getLinkClass('/growth')}><TrendingUp size={18} /> <span>{t('growth')}</span></Link>
          <Link to="/report" className={getLinkClass('/report')}><FileText size={18} /> <span>{t('report')}</span></Link>
        </nav>

        <div className="p-4 border-t border-[var(--card-border)] flex flex-col gap-2">
          <Link to="/profile" className={getLinkClass('/profile') + " !py-2 !px-3"}>
            <User size={16} /> <span>{t('profile')}</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-red-500 hover:bg-red-500/10 hover:text-red-400 font-bold w-full">
            <LogOut size={16} /> <span>{t('logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-screen overflow-y-auto custom-scrollbar">
        {/* Mobile Header */}
        <header className="md:hidden glass-panel border-b border-[var(--card-border)] p-4 sticky top-0 z-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">M</div>
            <h1 className="font-bold text-lg text-[var(--text-color)]">Flint</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleLanguage} className="font-bold text-sm text-[var(--text-muted)]">{getLanguageLabel()}</button>
            <button onClick={toggleTheme} className="text-[var(--text-muted)]">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button onClick={handleLogout} className="text-red-500"><LogOut size={18} /></button>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-5xl mx-auto w-full flex-1">
          <Outlet />
        </div>
      </main>

      {/* AI Assistant */}
      <AIChat />
    </div>
  );
}
