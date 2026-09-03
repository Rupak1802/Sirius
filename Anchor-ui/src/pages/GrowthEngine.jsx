import GlassCard from '../components/ui/GlassCard';
import { Sprout, Briefcase, TrendingUp } from 'lucide-react';

export default function GrowthEngine() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Growth Engine</h1>
        <p className="text-white/70 max-w-2xl">
          Growth without risk: surplus only, never essentials. Automatically invests spare money left after rent, fuel, and goals are covered.
        </p>
      </div>

      <GlassCard className="text-center py-8 relative overflow-hidden border-blue-500/20 bg-blue-900/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
        <h2 className="text-xl font-medium text-white/80 mb-2">Today's Surplus</h2>
        <p className="text-6xl font-black text-blue-300">₹117</p>
        <p className="text-white/50 text-sm mt-4">Protected: ₹200 (Rent/Fuel) + ₹50 (Savings Goal)</p>
      </GlassCard>

      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight px-2">Active Investments</h3>
        
        <GlassCard className="flex items-center justify-between p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 text-yellow-400 rounded-xl">
              <Briefcase size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg">Digital Gold</h4>
              <p className="text-white/50 text-sm">Most liquid, easy to understand</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-blue-300">₹35 / day</p>
            <p className="text-xs text-green-400 mt-1 flex items-center gap-1 justify-end">
              <TrendingUp size={12} /> Investing active
            </p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center justify-between p-4 bg-white/5 border-white/10 opacity-60">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
              <Sprout size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg">Liquid Mutual Fund</h4>
              <p className="text-white/50 text-sm">Modest step up</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">₹0</p>
            <p className="text-xs text-white/40 mt-1">Buffer &lt; 14 days</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
