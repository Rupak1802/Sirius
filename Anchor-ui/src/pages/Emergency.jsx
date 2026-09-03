import { ShieldAlert, AlertCircle, Phone, IndianRupee } from 'lucide-react';
import VoiceButton from '../components/ui/VoiceButton';

export default function Emergency() {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">Emergency Protocol</h1>
          <p className="text-slate-400 mt-1">Immediate actions for when income stops.</p>
        </div>
        <VoiceButton text="Emergency protocol. If your buffer hits zero, you can access your emergency reserve or request a payout gap advance." />
      </div>

      <div className="glass-card p-8 border-red-500/40 bg-red-950/40 relative overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.2)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/30 rounded-full mix-blend-screen filter blur-[80px] translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
        
        <div className="flex items-start gap-4 relative z-10">
          <div className="p-3 bg-red-500/20 text-red-500 rounded-2xl border border-red-500/30">
            <ShieldAlert size={36} className="drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-red-400 mb-2">Buffer Critically Low</h2>
            <p className="text-red-200/80 mb-6 max-w-xl leading-relaxed">
              You are currently projected to miss rent by ₹1,200 next week. Mitra has automatically locked all flexible spending until this gap is closed.
            </p>
            
            <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all">
              Unlock Emergency Reserve
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="glass-card p-6 border-orange-500/20 bg-orange-950/20 hover:border-orange-500/40 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <IndianRupee className="text-orange-400" />
            <h3 className="font-bold text-[var(--text-color)] text-lg">Payout Gap Protection</h3>
          </div>
          <p className="text-slate-400 mb-6 text-sm">Access up to ₹2,000 of next week's projected earnings today for a flat ₹20 fee.</p>
          <button className="w-full py-3 rounded-xl border border-orange-500/30 text-orange-400 font-semibold hover:bg-orange-500/10 transition-colors">
            Request Early Access
          </button>
        </div>

        <div className="glass-card p-6 border-slate-700 hover:border-slate-500 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-slate-300" />
            <h3 className="font-bold text-[var(--text-color)] text-lg">Report Accident/Issue</h3>
          </div>
          <p className="text-slate-400 mb-6 text-sm">Notify Mitra that you cannot work. We will pause your savings targets and recalculate your timeline.</p>
          <button className="w-full py-3 rounded-xl border border-slate-600 text-slate-300 font-semibold hover:bg-white/5 transition-colors">
            Pause My Targets
          </button>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-[var(--text-color)] mb-1">Need human help?</h4>
          <p className="text-slate-400 text-sm">Talk to a financial counselor for free.</p>
        </div>
        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-medium transition-colors">
          <Phone size={16} /> Call Support
        </button>
      </div>
    </div>
  );
}
