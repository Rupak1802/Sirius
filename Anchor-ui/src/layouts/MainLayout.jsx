import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, LineChart, PieChart, PiggyBank, CloudRain, HelpCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import AIChat from '../components/ui/AIChat';

export default function MainLayout() {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive ? 'bg-blue-600/40 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] border border-blue-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
    }`;
  };

  return (
    <div className="min-h-screen flex text-slate-200 font-sans relative">
      {/* Sidebar Navigation */}
      <aside className="w-64 glass-panel hidden md:flex flex-col sticky top-0 h-screen z-10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-[var(--text-color)] shadow-lg border border-white/20">M</div>
            <div>
              <h1 className="font-bold text-xl text-[var(--text-color)] tracking-wide">Mitra</h1>
              <p className="text-[10px] text-blue-300 font-bold tracking-widest uppercase">Financial Co-Pilot</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <Link to="/" className={getLinkClass('/')}>
            <Home size={18} /> <span className="font-medium">Overview</span>
          </Link>
          <Link to="/earnings" className={getLinkClass('/earnings')}>
            <LineChart size={18} /> <span className="font-medium">Earnings</span>
          </Link>
          <Link to="/plan" className={getLinkClass('/plan')}>
            <PieChart size={18} /> <span className="font-medium">Money Plan</span>
          </Link>
          <Link to="/savings" className={getLinkClass('/savings')}>
            <PiggyBank size={18} /> <span className="font-medium">Smart Savings</span>
          </Link>
          <Link to="/weather" className={getLinkClass('/weather')}>
            <CloudRain size={18} /> <span className="font-medium">Fin Weather</span>
          </Link>
          <Link to="/whatif" className={getLinkClass('/whatif')}>
            <HelpCircle size={18} /> <span className="font-medium">What If?</span>
          </Link>
          <Link to="/emergency" className={getLinkClass('/emergency')}>
            <AlertTriangle size={18} /> <span className="font-medium">Emergency</span>
          </Link>
          <Link to="/insights" className={getLinkClass('/insights')}>
            <Lightbulb size={18} /> <span className="font-medium">Insights</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rahul" alt="Rahul" className="w-10 h-10 rounded-full bg-blue-900/50 border border-white/20" />
            <div>
              <p className="font-bold text-sm text-[var(--text-color)]">Rahul Sharma</p>
              <p className="text-xs text-slate-400">Delivery Partner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-screen overflow-y-auto">
        {/* Mobile Header */}
        <header className="md:hidden glass-panel border-b border-white/10 p-4 sticky top-0 z-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-[var(--text-color)] border border-white/20">M</div>
            <h1 className="font-bold text-lg text-[var(--text-color)]">Mitra</h1>
          </div>
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rahul" alt="Rahul" className="w-8 h-8 rounded-full bg-blue-900/50 border border-white/20" />
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
