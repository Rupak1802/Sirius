import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import VoiceButton from '../components/ui/VoiceButton';
import { Activity, ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

export default function Demo() {
  const [earnings, setEarnings] = useState(1500);

  let state = 'STABLE';
  let message = 'You are safe for 12 days. Good time to save extra.';
  let theme = 'green';
  let Icon = ShieldCheck;

  if (earnings < 500) {
    state = 'SHOCK';
    message = `Money is extremely tight. I have locked ₹1,450 for rent and fuel. DO NOT spend on non-essentials.`;
    theme = 'red';
    Icon = ShieldAlert;
  } else if (earnings < 1000) {
    state = 'FRAGILE';
    message = `Money is tight this week. I have locked ₹1,450 for rent and fuel.`;
    theme = 'yellow';
    Icon = Shield;
  }

  const themes = {
    green: 'border-green-500/30 bg-green-900/20 text-green-400',
    yellow: 'border-yellow-500/30 bg-yellow-900/20 text-yellow-400',
    red: 'border-red-500/30 bg-red-900/20 text-red-400'
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Live Demo</h1>
        <p className="text-[var(--text-color)]/70">
          Stress-test the buffer in real time. Pull earnings down and watch ANCHOR move to protect funds.
        </p>
      </div>

      <GlassCard className="relative overflow-hidden">
        {/* Dynamic ambient glow based on state */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full filter blur-[100px] opacity-30 transition-colors duration-700 ${
          theme === 'green' ? 'bg-green-500' : theme === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
        }`}></div>

        <div className="mb-10 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <label className="font-medium text-lg flex items-center gap-2">
              <Activity className="text-blue-400" />
              Simulated Daily Earnings
            </label>
            <span className="text-3xl font-black text-[var(--text-color)]">₹{earnings}</span>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="2000" 
            step="50"
            value={earnings}
            onChange={(e) => setEarnings(parseInt(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-[var(--text-color)]/50 mt-2 font-medium">
            <span>₹0 (Shock)</span>
            <span>₹1000 (Fragile)</span>
            <span>₹2000 (Stable)</span>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border transition-all duration-500 relative z-10 backdrop-blur-md ${themes[theme]}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 rounded-full shadow-inner">
                <Icon size={28} />
              </div>
              <h2 className="text-3xl font-black tracking-widest">{state}</h2>
            </div>
            <VoiceButton text={message} className="scale-90" />
          </div>
          
          <div className="bg-black/30 p-4 rounded-xl border border-white/5 mt-4">
            <p className="text-[var(--text-color)]/90 text-lg leading-relaxed">{message}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
