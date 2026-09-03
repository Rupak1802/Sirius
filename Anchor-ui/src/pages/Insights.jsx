import { Lightbulb, TrendingUp, BarChart2 } from 'lucide-react';
import VoiceButton from '../components/ui/VoiceButton';

export default function Insights() {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">AI Insights</h1>
          <p className="text-slate-400 mt-1">Mitra analyzes your earnings to find hidden opportunities.</p>
        </div>
        <VoiceButton text="Insight. Working Friday evenings on Swiggy yields 30% more profit than Sunday mornings." />
      </div>

      <div className="glass-card p-6 md:p-8 border-purple-500/30 bg-purple-900/10 relative overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.15)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
            <Lightbulb size={28} className="drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Top Discovery</h2>
        </div>
        
        <p className="text-xl text-purple-100/90 font-medium leading-relaxed mb-6 relative z-10">
          You are currently averaging <span className="text-white font-bold bg-purple-500/20 px-2 py-0.5 rounded">₹120/hr</span> on Zomato during weekday lunches, but your historical data shows you made <span className="text-white font-bold bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400">₹180/hr</span> doing grocery delivery (Instamart) during the same time slot last month.
        </p>
        
        <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] relative z-10">
          Prioritize Grocery This Week
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="glass-card p-6 border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <TrendingUp className="text-emerald-400" /> Income Velocity
            </h3>
          </div>
          
          <div className="flex items-end h-32 gap-3 mb-4">
            {/* Simple sparkline visualization */}
            {[20, 35, 25, 45, 60, 40, 85, 70, 95].map((val, i) => (
              <div key={i} className="flex-1 bg-white/5 rounded-t-sm relative group cursor-pointer" style={{ height: `${val}%` }}>
                <div className="absolute inset-0 bg-emerald-500/50 rounded-t-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
          
          <p className="text-slate-400 text-sm">Your earning speed is accelerating. You made your first ₹1,000 this week 4 hours faster than last week.</p>
        </div>

        <div className="glass-card p-6 border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <BarChart2 className="text-blue-400" /> Expense Leaks
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-black/20 p-4 rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium">Idle Fuel Burn</p>
                <p className="text-slate-400 text-xs mt-1">Waiting between orders</p>
              </div>
              <p className="text-red-400 font-bold">-₹140</p>
            </div>
            <div className="flex items-center justify-between bg-black/20 p-4 rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium">Bank Transfer Fees</p>
                <p className="text-slate-400 text-xs mt-1">Instant withdrawal costs</p>
              </div>
              <p className="text-red-400 font-bold">-₹45</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
