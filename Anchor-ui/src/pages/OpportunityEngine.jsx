import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import { TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';

export default function OpportunityEngine() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Opportunity Engine</h1>
          <p className="text-white/70 max-w-2xl">
            The AI reacts to opportunity. Compares live hourly rates across connected platforms and suggests switches when the gap matters.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="border-red-500/20 bg-red-900/10 opacity-75">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white/80">Swiggy</h2>
            <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/60">Current</div>
          </div>
          
          <div className="flex items-center gap-3 text-red-400 mb-2">
            <TrendingDown size={28} />
            <span className="text-4xl font-black tracking-tight">₹128<span className="text-lg font-medium">/hr</span></span>
          </div>
          
          <div className="flex items-center gap-2 text-white/50 bg-black/20 p-3 rounded-lg mt-4">
            <AlertCircle size={16} />
            <span className="text-sm">Today's earnings are 30% below your average.</span>
          </div>
        </GlassCard>

        <GlassCard className="border-green-500/30 bg-green-900/10 shadow-[0_0_20px_rgba(34,197,94,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full filter blur-2xl"></div>
          
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white">Rapido</h2>
            <div className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-bold animate-pulse">Opportunity</div>
          </div>
          
          <div className="flex items-center gap-3 text-green-400 mb-2">
            <TrendingUp size={28} />
            <span className="text-4xl font-black tracking-tight">₹187<span className="text-lg font-medium">/hr</span></span>
          </div>
          
          <p className="text-green-100/70 text-sm mb-6 mt-4">
            Switching for your next shift keeps you on track for your ₹5,000 goal. Worth an estimated extra ₹236 today.
          </p>
          
          <GlassButton variant="success" className="w-full py-4 text-lg font-bold shadow-lg shadow-green-500/20">
            Switch to Rapido
          </GlassButton>
        </GlassCard>
      </div>
    </div>
  );
}
