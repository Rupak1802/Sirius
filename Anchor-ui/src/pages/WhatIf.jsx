import { useState } from 'react';
import { Target, TrendingDown, Clock, Activity } from 'lucide-react';
import VoiceButton from '../components/ui/VoiceButton';

export default function WhatIf() {
  const [days, setDays] = useState(5);

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">What If Simulator</h1>
          <p className="text-slate-400 mt-1">Plan before the shock happens. Simulate missed days.</p>
        </div>
        <VoiceButton text={`If you don't work for ${days} days, you will lose ₹${days * 192} and delay your goals by ${Math.ceil(days * 1.2)} days.`} />
      </div>

      <div className="glass-card p-6 md:p-10 border-blue-500/20 bg-blue-900/10 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
        <label className="block mb-6 font-medium text-xl text-blue-200">What if I don't work for...</label>
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <input 
              type="range" 
              min="1" 
              max="14" 
              value={days} 
              onChange={(e) => setDays(e.target.value)}
              className="w-full sm:w-64 h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 shadow-inner"
            />
            <span className="text-4xl font-black text-[var(--text-color)] w-16 text-center">{days}</span>
            <span className="text-xl font-medium text-slate-400">days?</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 border-yellow-500/30 bg-yellow-900/10 relative overflow-hidden mt-8 shadow-[0_0_30px_rgba(234,179,8,0.1)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/20 rounded-full filter blur-[60px] translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="flex items-center gap-3 mb-8 relative z-10">
          <Activity className="text-yellow-400" size={32} />
          <h2 className="text-3xl font-bold text-yellow-400 drop-shadow-lg">Simulated Impact</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 relative z-10">
          <div className="bg-black/40 p-6 rounded-2xl border border-white/5 shadow-inner">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <TrendingDown size={18} className="text-red-400" />
              <p className="text-sm font-medium uppercase tracking-wider">Estimated Income Loss</p>
            </div>
            <p className="text-4xl font-black text-[var(--text-color)]">₹{days * 192}</p>
          </div>
          <div className="bg-black/40 p-6 rounded-2xl border border-white/5 shadow-inner">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Target size={18} className="text-orange-400" />
              <p className="text-sm font-medium uppercase tracking-wider">Goal Delay</p>
            </div>
            <p className="text-4xl font-black text-[var(--text-color)]">{Math.ceil(days * 1.2)} days</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 relative z-10">
          <Clock className="text-blue-400" size={24} />
          <h3 className="font-bold text-2xl text-[var(--text-color)]">Recovery Plan</h3>
        </div>
        
        <div className="space-y-4 relative z-10">
          <div className="flex items-start gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]">1</div>
            <p className="text-slate-300 text-lg leading-relaxed">Work <span className="font-bold text-[var(--text-color)]">~7 extra hours</span> over the next week to fully recover.</p>
          </div>
          <div className="flex items-start gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]">2</div>
            <p className="text-slate-300 text-lg leading-relaxed">Switch strictly to your most profitable platform for <span className="font-bold text-[var(--text-color)]">{days} days</span> after returning.</p>
          </div>
          <div className="flex items-start gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]">3</div>
            <p className="text-slate-300 text-lg leading-relaxed">Reduce discretionary spending by <span className="font-bold text-emerald-400">₹384</span> to offset the gap without working extra.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
