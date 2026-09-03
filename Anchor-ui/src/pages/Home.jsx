import { Shield, TrendingUp, TrendingDown, ArrowRight, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Good evening, Rahul <span className="inline-block animate-waving-hand">👋</span></h1>
          <p className="text-slate-500">Here's how your money looks this week.</p>
        </div>
      </div>

      {/* Hero Financial Health Card */}
      <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-white to-blue-50/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10">
          <p className="text-slate-500 font-medium mb-1">Available to safely use</p>
          <h2 className="text-5xl font-black text-slate-800 tracking-tight mb-6">₹4,280</h2>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-bold text-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              Stable
            </div>
            <p className="text-slate-600 text-sm">You're on track to cover your upcoming essentials.</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm bg-white/60 px-3 py-1.5 rounded-lg">
              <TrendingUp size={16} />
              <span>+12% vs last week</span>
            </div>
            <Link to="/plan" className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2">
              View my plan <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <p className="text-slate-500 text-sm font-medium">Income</p>
          <p className="text-2xl font-bold text-slate-800 my-1">₹5,620</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">This week</span>
            <span className="text-emerald-500 font-bold flex items-center"><TrendingUp size={12} className="mr-0.5" /> 8%</span>
          </div>
        </div>
        <div className="glass-card p-4">
          <p className="text-slate-500 text-sm font-medium">Expenses</p>
          <p className="text-2xl font-bold text-slate-800 my-1">₹2,140</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">This week</span>
            <span className="text-emerald-500 font-bold flex items-center"><TrendingDown size={12} className="mr-0.5" /> 4%</span>
          </div>
        </div>
        <div className="glass-card p-4">
          <p className="text-slate-500 text-sm font-medium">Savings</p>
          <p className="text-2xl font-bold text-slate-800 my-1">₹640</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">This month</span>
          </div>
        </div>
        <div className="glass-card p-4">
          <p className="text-slate-500 text-sm font-medium">Upcoming</p>
          <p className="text-2xl font-bold text-slate-800 my-1">₹2,850</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Next 7 days</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Financial Weather */}
        <div className="glass-card p-6 border-blue-100 bg-blue-50/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Sun size={24} /></div>
            <h3 className="text-xl font-bold text-slate-800">Your week looks stable</h3>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Expected income</span>
              <span className="font-semibold text-slate-800">₹5,100–₹5,700</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Upcoming essentials</span>
              <span className="font-semibold text-slate-800">₹2,850</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Expected buffer</span>
              <span className="font-bold text-blue-600">₹1,950</span>
            </div>
          </div>
          <button className="w-full bg-white border border-blue-200 text-blue-700 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
            See forecast
          </button>
        </div>

        {/* Personalized Recommendation */}
        <div className="glass-card p-6 border-emerald-100 bg-emerald-50/30">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Mitra's recommendation</h3>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            You earned more than usual this week. You can safely move <span className="font-bold text-emerald-700">₹400</span> into savings without affecting your essential expenses.
          </p>
          <div className="flex gap-3">
            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-semibold transition-colors">
              Save ₹400
            </button>
            <button className="px-4 py-2.5 rounded-xl font-semibold text-slate-500 hover:bg-slate-100 transition-colors">
              Not now
            </button>
          </div>
        </div>
      </div>

      {/* Protect My Income */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Keep yourself earning</h3>
          <button className="text-blue-600 text-sm font-semibold hover:underline">Manage protection</button>
        </div>
        <p className="text-slate-500 text-sm mb-4">These expenses help you continue working next week.</p>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
            <div className="text-2xl mb-1">⛽</div>
            <p className="text-xs font-semibold text-slate-500">Fuel</p>
            <p className="font-bold text-slate-800 mt-1">₹500</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
            <div className="text-2xl mb-1">📱</div>
            <p className="text-xs font-semibold text-slate-500">Phone</p>
            <p className="font-bold text-slate-800 mt-1">₹200</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
            <div className="text-2xl mb-1">🔧</div>
            <p className="text-xs font-semibold text-slate-500">Vehicle</p>
            <p className="font-bold text-slate-800 mt-1">₹300</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-xl font-semibold">
          <Shield size={18} />
          <span>Total: ₹1,000 protected</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-800 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-xl font-bold mb-1">What happens if my income drops?</h3>
          <p className="text-slate-300 text-sm">See how your plan adapts to a difficult week.</p>
        </div>
        <button className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/20 whitespace-nowrap">
          Try What-If
        </button>
      </div>
    </div>
  );
}
