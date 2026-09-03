import { useState } from 'react';
import { Target, TrendingDown, Clock, Activity, Loader2, Play } from 'lucide-react';

export default function WhatIf() {
  const [days, setDays] = useState(3);
  const [simulating, setSimulating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeDays, setActiveDays] = useState(3); // To hold the submitted value for dynamic rendering

  const handleSimulate = () => {
    setSimulating(true);
    setShowResults(false);
    setTimeout(() => {
      setSimulating(false);
      setActiveDays(days);
      setShowResults(true);
    }, 1500);
  };

  const lossAmount = activeDays * 350; // Dynamic formula
  const delayDays = Math.ceil(activeDays * 1.5);
  const extraHours = Math.ceil(activeDays * 2.5);
  const reduceSpend = activeDays * 150;

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">What If Simulator</h1>
          <p className="text-[var(--text-muted)] mt-1">Plan before the shock happens. Simulate missed days.</p>
        </div>
        
      </div>

      <div className="glass-card p-6 md:p-10 border-blue-500/20 bg-blue-900/10 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
        
        <div className="mb-10 text-center">
          <label className="block mb-4 font-medium text-lg text-[var(--text-color)]">What if I don't work for...</label>
          <div className="flex items-center justify-center gap-4">
            <input 
              type="range" 
              min="1" 
              max="14" 
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full sm:w-64 h-3 bg-black/20 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 shadow-inner"
            />
            <span className="text-4xl font-black text-[var(--text-color)] w-16 text-center">{days}</span>
            <span className="text-xl font-medium text-[var(--text-muted)]">days?</span>
          </div>
          
          <button 
            onClick={handleSimulate}
            disabled={simulating}
            className="mt-8 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2 mx-auto"
          >
            {simulating ? <Loader2 className="animate-spin" size={20} /> : <Play size={20} />}
            {simulating ? 'Mitra AI Simulating...' : 'Run Simulation'}
          </button>
        </div>

        {showResults && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="bg-black/5 dark:bg-white/5 p-6 rounded-2xl border border-[var(--card-border)] shadow-inner">
                <div className="flex items-center gap-2 text-[var(--text-muted)] mb-2">
                  <TrendingDown size={18} className="text-red-400" />
                  <p className="text-sm font-medium uppercase tracking-wider">Estimated Income Loss</p>
                </div>
                <p className="text-4xl font-black text-[var(--text-color)]">₹{lossAmount}</p>
              </div>
              <div className="bg-black/5 dark:bg-white/5 p-6 rounded-2xl border border-[var(--card-border)] shadow-inner">
                <div className="flex items-center gap-2 text-[var(--text-muted)] mb-2">
                  <Target size={18} className="text-orange-400" />
                  <p className="text-sm font-medium uppercase tracking-wider">Goal Delay</p>
                </div>
                <p className="text-4xl font-black text-[var(--text-color)]">{delayDays} days</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6 relative z-10">
              <Clock className="text-blue-400" size={24} />
              <h3 className="font-bold text-2xl text-[var(--text-color)]">Mitra's Recovery Plan</h3>
            </div>
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-start gap-4 bg-black/5 dark:bg-white/5 p-5 rounded-2xl border border-[var(--card-border)] backdrop-blur-md">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]">1</div>
                <p className="text-[var(--text-muted)] text-lg leading-relaxed">Work <span className="font-bold text-[var(--text-color)]">~{extraHours} extra hours</span> over the next week to fully recover.</p>
              </div>
              <div className="flex items-start gap-4 bg-black/5 dark:bg-white/5 p-5 rounded-2xl border border-[var(--card-border)] backdrop-blur-md">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]">2</div>
                <p className="text-[var(--text-muted)] text-lg leading-relaxed">Switch strictly to your most profitable platform for <span className="font-bold text-[var(--text-color)]">{activeDays} days</span> after returning.</p>
              </div>
              <div className="flex items-start gap-4 bg-black/5 dark:bg-white/5 p-5 rounded-2xl border border-[var(--card-border)] backdrop-blur-md">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]">3</div>
                <p className="text-[var(--text-muted)] text-lg leading-relaxed">Reduce flexible spending by <span className="font-bold text-emerald-500">₹{reduceSpend}</span> to offset the gap without working extra.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
