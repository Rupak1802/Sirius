import { CloudRain, Sun, Zap, Navigation } from 'lucide-react';
import VoiceButton from '../components/ui/VoiceButton';

export default function FinancialWeather() {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">Financial Weather</h1>
          <p className="text-slate-400 mt-1">Look ahead and prepare for what's coming.</p>
        </div>
        <VoiceButton text="Your 7 day forecast is Sunny. Income is steady, and there are no large surprise bills approaching." />
      </div>

      <div className="glass-card p-10 flex flex-col items-center text-center border-blue-500/30 bg-blue-900/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full mix-blend-screen filter blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="p-6 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] relative z-10 text-yellow-400">
          <Sun size={64} className="drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
        </div>
        
        <h2 className="text-4xl font-black text-[var(--text-color)] mb-2 relative z-10">Sunny & Stable</h2>
        <p className="text-blue-200 text-lg max-w-md relative z-10">You have enough buffer to cover all planned expenses. It's a great time to push towards your savings goals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="glass-card p-6">
          <h3 className="font-bold text-[var(--text-color)] mb-4 flex items-center gap-2"><Zap className="text-yellow-400" /> Incoming Energy</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="text-slate-300">Expected Swiggy</span>
              <span className="font-bold text-[var(--text-color)] text-lg">₹3,200</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="text-slate-300">Expected Zomato</span>
              <span className="font-bold text-[var(--text-color)] text-lg">₹2,800</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold text-[var(--text-color)] mb-4 flex items-center gap-2"><Navigation className="text-red-400" /> Outgoing Friction</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="text-slate-300">EMI Due (Friday)</span>
              <span className="font-bold text-red-400 text-lg">₹1,500</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="text-slate-300">Estimated Fuel</span>
              <span className="font-bold text-red-400 text-lg">₹1,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
