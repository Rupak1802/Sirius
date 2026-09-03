import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, LineChart, PieChart, PiggyBank, CloudRain, HelpCircle, AlertTriangle, Lightbulb } from 'lucide-react';

export default function MainLayout() {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
    }`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg">M</div>
            <div>
              <h1 className="font-bold text-xl text-slate-800">Mitra</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Financial co-pilot</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link to="/" className={getLinkClass('/')}>
            <Home size={20} /> <span className="font-semibold">Overview</span>
          </Link>
          <Link to="/earnings" className={getLinkClass('/earnings')}>
            <LineChart size={20} /> <span className="font-semibold">Earnings</span>
          </Link>
          <Link to="/plan" className={getLinkClass('/plan')}>
            <PieChart size={20} /> <span className="font-semibold">Money Plan</span>
          </Link>
          <Link to="/savings" className={getLinkClass('/savings')}>
            <PiggyBank size={20} /> <span className="font-semibold">Savings</span>
          </Link>
          <Link to="/weather" className={getLinkClass('/weather')}>
            <CloudRain size={20} /> <span className="font-semibold">Financial Weather</span>
          </Link>
          <Link to="/whatif" className={getLinkClass('/whatif')}>
            <HelpCircle size={20} /> <span className="font-semibold">What If?</span>
          </Link>
          <Link to="/emergency" className={getLinkClass('/emergency')}>
            <AlertTriangle size={20} /> <span className="font-semibold">Emergency</span>
          </Link>
          <Link to="/insights" className={getLinkClass('/insights')}>
            <Lightbulb size={20} /> <span className="font-semibold">Insights</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rahul" alt="Rahul" className="w-10 h-10 rounded-full bg-blue-100" />
            <div>
              <p className="font-bold text-sm">Rahul Sharma</p>
              <p className="text-xs text-slate-500">Delivery Partner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-screen overflow-y-auto">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">M</div>
            <h1 className="font-bold text-lg text-slate-800">Mitra</h1>
          </div>
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rahul" alt="Rahul" className="w-8 h-8 rounded-full bg-blue-100" />
        </header>

        <div className="p-4 md:p-8 max-w-5xl mx-auto w-full flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
