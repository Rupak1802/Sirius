import { Target, TrendingUp, AlertTriangle } from 'lucide-react';
import VoiceButton from '../components/ui/VoiceButton';

export default function Savings() {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">Smart Savings</h1>
          <p className="text-slate-400 mt-1">Save more on good weeks. Stay flexible on difficult weeks.</p>
        </div>
        <VoiceButton text="You are 45% towards your Emergency Fund goal. You can comfortably save ₹350 this week." />
      </div>

      <div className="glass-card p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
        
        <h3 className="text-xl font-bold text-[var(--text-color)] mb-2 relative z-10">Emergency Fund</h3>
        <p className="text-emerald-400 font-medium mb-8 relative z-10">₹6,800 / ₹15,000</p>
        
        <div className="relative w-48 h-48 mb-6 z-10">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray="283" strokeDashoffset="155" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-4xl font-black text-[var(--text-color)]">45%</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 border-emerald-500/30 bg-emerald-900/10">
        <h3 className="text-2xl font-bold text-[var(--text-color)] mb-2">Save ₹350 this week</h3>
        <p className="text-slate-300 mb-6 border-l-2 border-emerald-500 pl-4 py-1">Your income is 14% above your normal weekly average.</p>
        
        <div className="flex gap-4">
          <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]">Move ₹350 to savings</button>
          <button className="px-6 py-3 rounded-xl font-semibold text-slate-300 hover:text-[var(--text-color)] bg-white/5 hover:bg-white/10 transition-colors border border-white/10">Change</button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-[var(--text-color)] mt-8 mb-4">Savings Goals</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GoalCard icon="🛟" name="Emergency Fund" amount={6800} />
        <GoalCard icon="🏠" name="Rent Buffer" amount={2500} />
        <GoalCard icon="🔧" name="Vehicle Repair" amount={1300} />
      </div>
    </div>
  );
}

function GoalCard({ icon, name, amount }) {
  return (
    <div className="glass-card p-6 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer">
      <div className="text-3xl bg-white/5 p-3 rounded-xl border border-white/10">{icon}</div>
      <div>
        <h4 className="font-bold text-[var(--text-color)]">{name}</h4>
        <p className="text-emerald-400 font-bold text-lg mt-1">₹{amount}</p>
      </div>
    </div>
  );
}
