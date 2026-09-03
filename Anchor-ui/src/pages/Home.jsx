import { Shield, TrendingUp, TrendingDown, ArrowRight, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import VoiceButton from '../components/ui/VoiceButton';

export default function Home() {
  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">Good evening, Rahul <span className="inline-block animate-waving-hand">👋</span></h1>
          <p className="text-slate-400 mt-1">Here's how your money looks this week.</p>
        </div>
        <VoiceButton text="Good evening Rahul. Your financial status is stable. You have ₹4,280 available to safely use this week." />
      </div>

      {/* Hero Financial Health Card */}
      <div className="glass-card p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10">
          <p className="text-blue-200 font-medium mb-1 tracking-wide uppercase text-xs">Available to safely use</p>
          <h2 className="text-5xl md:text-6xl font-black text-[var(--text-color)] tracking-tight mb-6 drop-shadow-lg">₹4,280</h2>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-lg font-bold text-sm shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              Stable
            </div>
            <p className="text-slate-300 text-sm">You're on track to cover your upcoming essentials.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm bg-white/5 px-3 py-2 rounded-lg border border-white/5">
              <TrendingUp size={16} />
              <span>+12% vs last week</span>
            </div>
            <Link to="/plan" className="w-full sm:w-auto bg-white hover:bg-slate-200 text-slate-900 px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] flex items-center justify-center gap-2">
              View my plan <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Income</p>
          <p className="text-2xl font-bold text-[var(--text-color)] mb-2">₹5,620</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">This week</span>
            <span className="text-emerald-400 font-bold flex items-center"><TrendingUp size={12} className="mr-0.5" /> 8%</span>
          </div>
        </div>
        <div className="glass-card p-5">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Expenses</p>
          <p className="text-2xl font-bold text-[var(--text-color)] mb-2">₹2,140</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">This week</span>
            <span className="text-emerald-400 font-bold flex items-center"><TrendingDown size={12} className="mr-0.5" /> 4%</span>
          </div>
        </div>
        <div className="glass-card p-5 border-emerald-500/20 bg-emerald-900/10">
          <p className="text-emerald-300/70 text-xs font-bold uppercase tracking-wider mb-1">Savings</p>
          <p className="text-2xl font-bold text-emerald-400 mb-2">₹640</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-emerald-500/70">This month</span>
          </div>
        </div>
        <div className="glass-card p-5">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Upcoming</p>
          <p className="text-2xl font-bold text-[var(--text-color)] mb-2">₹2,850</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Next 7 days</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Financial Weather */}
        <div className="glass-card p-6 border-blue-500/30 bg-blue-900/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[40px] translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30"><Sun size={24} /></div>
              <h3 className="text-xl font-bold text-[var(--text-color)]">Your week looks stable</h3>
            </div>
          </div>
          
          <div className="space-y-4 mb-6 relative z-10">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-slate-300">Expected income</span>
              <span className="font-semibold text-[var(--text-color)]">₹5,100–₹5,700</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-slate-300">Upcoming essentials</span>
              <span className="font-semibold text-[var(--text-color)]">₹2,850</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Expected buffer</span>
              <span className="font-bold text-blue-400 text-lg">₹1,950</span>
            </div>
          </div>
          <Link to="/weather" className="block w-full text-center bg-white/10 hover:bg-white/20 border border-white/10 text-[var(--text-color)] py-3 rounded-xl font-semibold transition-colors">
            See forecast
          </Link>
        </div>

        {/* Personalized Recommendation */}
        <div className="glass-card p-6 border-emerald-500/30 bg-emerald-900/10 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[40px] translate-x-1/3 translate-y-1/3"></div>
          
          <div className="flex justify-between items-start mb-3 relative z-10">
            <h3 className="text-xl font-bold text-[var(--text-color)]">Mitra's recommendation</h3>
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">New</span>
          </div>
          
          <p className="text-slate-300 text-sm mb-6 leading-relaxed relative z-10">
            You earned more than usual this week. You can safely move <span className="font-bold text-emerald-400 bg-emerald-500/10 px-1 rounded">₹400</span> into savings without affecting your essential expenses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 relative z-10">
            <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              Save ₹400
            </button>
            <button className="px-4 py-3 rounded-xl font-semibold text-slate-400 hover:text-[var(--text-color)] hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors">
              Not now
            </button>
          </div>
        </div>
      </div>

      {/* Protect My Income */}
      <div className="glass-card p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-2">
          <h3 className="text-xl font-bold text-[var(--text-color)] flex items-center gap-2">
            <Shield className="text-emerald-400" /> Keep yourself earning
          </h3>
          <button className="text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors">Manage protection</button>
        </div>
        <p className="text-slate-400 text-sm mb-6">These expenses help you continue working next week.</p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-2 drop-shadow-md">⛽</div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Fuel</p>
            <p className="font-bold text-[var(--text-color)] text-lg">₹500</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-2 drop-shadow-md">📱</div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone</p>
            <p className="font-bold text-[var(--text-color)] text-lg">₹200</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-2 drop-shadow-md">🔧</div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Vehicle</p>
            <p className="font-bold text-[var(--text-color)] text-lg">₹300</p>
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-3 px-4 rounded-xl font-bold">
          <Shield size={18} />
          <span>Total: ₹1,000 protected</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_0_30px_rgba(147,51,234,0.3)]">
        <div>
          <h3 className="text-2xl font-bold text-[var(--text-color)] mb-2">What happens if my income drops?</h3>
          <p className="text-blue-100 text-sm">See how your plan adapts to a difficult week in the simulator.</p>
        </div>
        <Link to="/whatif" className="w-full md:w-auto bg-white hover:bg-slate-100 text-purple-700 px-8 py-3.5 rounded-xl font-bold transition-transform transform hover:scale-105 shadow-xl whitespace-nowrap text-center">
          Try What-If Simulator
        </Link>
      </div>
    </div>
  );
}
