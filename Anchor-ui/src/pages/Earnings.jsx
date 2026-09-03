import { ArrowRight, Info } from 'lucide-react';
import VoiceButton from '../components/ui/VoiceButton';

export default function Earnings() {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">Your Earnings</h1>
          <p className="text-slate-400 mt-1">See where your money is really coming from.</p>
        </div>
        <VoiceButton text="You earned ₹5,620 this week. Swiggy is your most profitable platform after accounting for fuel costs." />
      </div>

      <div className="glass-card p-6 md:p-8">
        <p className="text-blue-300 font-medium mb-1 text-sm uppercase tracking-wider">Total this week</p>
        <h2 className="text-5xl font-black text-[var(--text-color)] tracking-tight mb-8 drop-shadow-md">₹5,620</h2>
        
        {/* Simple mock bar chart */}
        <div className="flex items-end justify-between h-40 mt-8 mb-2 gap-2 md:gap-4">
          {[{d:'M', v: 40}, {d:'T', v: 60}, {d:'W', v: 45}, {d:'T', v: 80}, {d:'F', v: 90}, {d:'S', v: 30}, {d:'S', v: 75}].map((day, i) => (
            <div key={i} className="flex flex-col items-center flex-1 gap-3">
              <div className="w-full bg-white/5 rounded-t-md border border-white/5 relative" style={{ height: `${day.v}%` }}>
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md h-full opacity-50 hover:opacity-100 transition-opacity cursor-pointer"></div>
              </div>
              <span className="text-xs text-slate-400 font-bold">{day.d}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl flex gap-4 items-start shadow-[0_0_15px_rgba(245,158,11,0.1)]">
        <div className="text-amber-400 mt-1 p-2 bg-amber-500/20 rounded-lg"><Info size={24} /></div>
        <div>
          <h3 className="font-bold text-amber-300 mb-1">Swiggy is currently your most profitable platform</h3>
          <p className="text-amber-100/70 text-sm mb-3">You earn slightly more from Swiggy after fuel and other work-related costs.</p>
          <button className="text-amber-400 font-bold text-sm flex items-center gap-1 hover:text-amber-300 transition-colors">
            See why <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-[var(--text-color)] mt-8 mb-4">Platform comparison</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PlatformCard name="Swiggy" color="bg-orange-500" gross={3200} cost={600} />
        <PlatformCard name="Zomato" color="bg-red-500" gross={2800} cost={450} />
        <PlatformCard name="Uber" color="bg-zinc-300" gross={1900} cost={300} />
      </div>

      <div className="glass-card p-6 md:p-8 mt-8">
        <h3 className="font-bold text-[var(--text-color)] mb-6 text-xl">Income sources</h3>
        <div className="space-y-6">
          <SourceRow name="Platform income" percent={70} color="bg-blue-500" />
          <SourceRow name="Cash" percent={20} color="bg-emerald-500" />
          <SourceRow name="UPI / Other" percent={10} color="bg-purple-500" />
        </div>
      </div>
    </div>
  );
}

function PlatformCard({ name, color, gross, cost }) {
  const profit = gross - cost;
  return (
    <div className="glass-card p-6 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-20 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl transition-transform group-hover:scale-150`}></div>
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className={`w-4 h-4 rounded-full ${color} shadow-[0_0_10px_currentColor]`}></div>
        <h4 className="font-bold text-[var(--text-color)] text-lg">{name}</h4>
      </div>
      
      <div className="space-y-3 text-sm mb-2 relative z-10">
        <div className="flex justify-between">
          <span className="text-slate-400">Gross</span>
          <span className="font-medium text-[var(--text-color)]">₹{gross}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-slate-400">Work costs</span>
          <span className="text-red-400 font-medium bg-red-500/10 px-2 py-0.5 rounded">-₹{cost}</span>
        </div>
        <div className="flex justify-between pt-2">
          <span className="font-bold text-slate-300">Real profit</span>
          <span className="font-black text-emerald-400 text-lg">₹{profit}</span>
        </div>
      </div>
    </div>
  );
}

function SourceRow({ name, percent, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium text-slate-300">{name}</span>
        <span className="font-bold text-[var(--text-color)]">{percent}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-3 border border-white/5">
        <div className={`${color} h-3 rounded-full shadow-[0_0_10px_currentColor]`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
