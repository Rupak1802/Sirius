import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, TrendingDown, Clock, Activity, Settings } from 'lucide-react';

export default function MoneyPlan() {
  const [viewMode, setViewMode] = useState('week'); // week or month

  const multiplier = viewMode === 'week' ? 1 : 4;
  
  const income = 5200 * multiplier;
  const essentials = 2000 * multiplier;
  const work = 800 * multiplier;
  const savings = 700 * multiplier;
  const emergency = 500 * multiplier;
  const flexible = 1200 * multiplier;

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">Your {viewMode === 'week' ? 'Weekly' : 'Monthly'} Money Plan</h1>
          <p className="text-[var(--text-muted)] mt-1">We divided your income into clear buckets.</p>
        </div>
      </div>

      <div className="glass-card p-8 md:p-12 text-center border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="flex justify-center mb-6 relative z-10">
          <div className="flex bg-black/20 dark:bg-white/10 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('week')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'week' ? 'bg-[var(--text-color)] text-[var(--bg-color)] shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-color)]'}`}
            >
              Weekly
            </button>
            <button 
              onClick={() => setViewMode('month')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'month' ? 'bg-[var(--text-color)] text-[var(--bg-color)] shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-color)]'}`}
            >
              Monthly
            </button>
          </div>
        </div>
        
        <p className="text-blue-400 font-medium mb-2 uppercase tracking-widest text-sm relative z-10">Total {viewMode} Income</p>
        <h2 className="text-5xl font-black text-[var(--text-color)] tracking-tight mb-8 drop-shadow-md relative z-10">
          ₹{income.toLocaleString()}
        </h2>
        
        <div className="w-full h-6 rounded-full flex overflow-hidden shadow-inner relative z-10">
          <div className="bg-red-500 w-[40%] hover:brightness-110 transition-all cursor-pointer border-r border-black/20" title="Must Protect: 40%"></div>
          <div className="bg-orange-500 w-[15%] hover:brightness-110 transition-all cursor-pointer border-r border-black/20" title="Work Expenses: 15%"></div>
          <div className="bg-emerald-500 w-[15%] hover:brightness-110 transition-all cursor-pointer border-r border-black/20" title="Savings: 15%"></div>
          <div className="bg-teal-500 w-[10%] hover:brightness-110 transition-all cursor-pointer border-r border-black/20" title="Emergency: 10%"></div>
          <div className="bg-blue-500 w-[20%] hover:brightness-110 transition-all cursor-pointer" title="Flexible: 20%"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 relative z-10 text-left">
          <div><div className="w-4 h-4 bg-red-500 rounded-md mb-2 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div><span className="text-[var(--text-muted)] block mb-1">Essentials</span><p className="font-bold text-[var(--text-color)] text-lg">₹{essentials.toLocaleString()}</p></div>
          <div><div className="w-4 h-4 bg-orange-500 rounded-md mb-2 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div><span className="text-[var(--text-muted)] block mb-1">Work</span><p className="font-bold text-[var(--text-color)] text-lg">₹{work.toLocaleString()}</p></div>
          <div><div className="w-4 h-4 bg-emerald-500 rounded-md mb-2 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div><span className="text-[var(--text-muted)] block mb-1">Savings</span><p className="font-bold text-[var(--text-color)] text-lg">₹{savings.toLocaleString()}</p></div>
          <div><div className="w-4 h-4 bg-teal-500 rounded-md mb-2 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div><span className="text-[var(--text-muted)] block mb-1">Emergency</span><p className="font-bold text-[var(--text-color)] text-lg">₹{emergency.toLocaleString()}</p></div>
          <div><div className="w-4 h-4 bg-blue-500 rounded-md mb-2 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div><span className="text-[var(--text-muted)] block mb-1">Flexible</span><p className="font-bold text-[var(--text-color)] text-lg">₹{flexible.toLocaleString()}</p></div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Link to="/budget-manager" className="flex items-center gap-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 px-6 py-3 rounded-xl font-bold transition-all text-[var(--text-color)] border border-[var(--card-border)]">
          <Settings size={18} /> Manage Budget Categories
        </Link>
      </div>

      <div className="glass-card p-6 md:p-8 mt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full filter blur-[40px] translate-x-1/2 -translate-y-1/2"></div>
        <h3 className="text-2xl font-bold text-[var(--text-color)] mb-8 relative z-10">Your plan changes with your income</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="bg-black/5 dark:bg-white/5 border border-[var(--card-border)] p-6 rounded-2xl relative overflow-hidden shadow-inner">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-2xl tracking-wider uppercase">Good Week</div>
            <p className="font-bold text-[var(--text-color)] text-xl mb-6">Income: ₹5,200</p>
            
            <div className="space-y-4">
              <Bucket title="Must Protect" amount={2000} percent={38} color="bg-red-500" />
              <Bucket title="Should Save" amount={1200} percent={23} color="bg-emerald-500" />
              <Bucket title="Flexible" amount={1200} percent={23} color="bg-blue-500" />
            </div>
          </div>
          
          <div className="bg-black/5 dark:bg-white/5 border border-[var(--card-border)] p-6 rounded-2xl relative overflow-hidden shadow-inner">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-2xl tracking-wider uppercase">Difficult Week</div>
            <p className="font-bold text-[var(--text-color)] text-xl mb-6">Income: ₹3,400</p>
            
            <div className="space-y-4">
              <Bucket title="Must Protect" amount={2000} percent={58} color="bg-red-500" />
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-red-400 text-sm">Savings Paused</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Focusing on essentials</p>
                </div>
                <span className="font-black text-red-500 text-lg">₹0</span>
              </div>
              <Bucket title="Flexible" amount={600} percent={17} color="bg-blue-500" />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl flex items-start gap-4">
          <div className="text-blue-500 bg-blue-500/20 p-2 rounded-lg shrink-0 mt-0.5"><Activity size={20} /></div>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed">
            <strong className="text-[var(--text-color)]">Mitra reduces your savings target</strong> when income falls so you don't have to sacrifice essentials. Your rent and fuel are always protected first.
          </p>
        </div>
      </div>
    </div>
  );
}

function Bucket({ title, amount, percent, color }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-[var(--text-color)] text-lg">{title}</h3>
        <span className="font-black text-[var(--text-color)] text-xl">₹{amount}</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2">
        <div className={`${color} h-2 rounded-full shadow-[0_0_10px_currentColor]`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
