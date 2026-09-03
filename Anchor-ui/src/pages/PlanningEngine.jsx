import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassInput from '../components/ui/GlassInput';
import { CalendarClock, Map, TrendingDown, Target, Zap } from 'lucide-react';

export default function PlanningEngine() {
  const [days, setDays] = useState(5);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Planning Engine</h1>
        <p className="text-white/70 max-w-2xl">
          Plan before the shock happens. Simulate missed days and get a concrete recovery plan.
        </p>
      </div>

      <GlassCard className="border-blue-500/20 bg-blue-900/10">
        <label className="block mb-4 font-medium text-lg text-white">What if I don't work for...</label>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <GlassInput 
              type="number" 
              value={days} 
              onChange={(e) => setDays(e.target.value)}
              className="w-24 text-center font-bold text-xl"
              min="1"
            />
            <span className="text-xl font-medium text-white/80">days?</span>
          </div>
          <GlassButton variant="primary" className="w-full sm:w-auto sm:ml-auto">
            Simulate Future
          </GlassButton>
        </div>
      </GlassCard>

      <GlassCard className="border-yellow-500/30 bg-yellow-900/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full filter blur-3xl"></div>
        
        <div className="flex items-center gap-3 mb-6">
          <CalendarClock className="text-yellow-400" size={28} />
          <h2 className="text-2xl font-bold text-yellow-400">Simulated Impact</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-white/50 mb-1">
              <TrendingDown size={16} />
              <p className="text-sm">Estimated Income Loss</p>
            </div>
            <p className="text-3xl font-black text-white">₹{days * 192}</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-white/50 mb-1">
              <Target size={16} />
              <p className="text-sm">Goal Delay</p>
            </div>
            <p className="text-3xl font-black text-white">{Math.ceil(days * 1.2)} days</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Map className="text-blue-300" size={20} />
          <h3 className="font-bold text-xl text-white">Recovery Plan</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
            <p className="text-white/80">Work <span className="font-bold text-white">~7 extra hours</span> over the next week to fully recover.</p>
          </div>
          <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
            <p className="text-white/80">Or switch to a higher-paying platform for <span className="font-bold text-white">{days} days</span> after returning.</p>
          </div>
          <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
            <p className="text-white/80">Reduce discretionary spending by <span className="font-bold text-white">₹384</span> to offset the gap.</p>
          </div>
        </div>
        
        <GlassButton variant="primary" className="w-full mt-6 flex items-center justify-center gap-2">
          <Zap size={18} /> Apply Recovery Plan
        </GlassButton>
      </GlassCard>
    </div>
  );
}
