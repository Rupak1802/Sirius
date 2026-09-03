import VoiceButton from '../components/ui/VoiceButton';

export default function MoneyPlan() {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">Your Weekly Money Plan</h1>
          <p className="text-slate-400 mt-1">We divided your expected income into what matters first.</p>
        </div>
        <VoiceButton text="Your expected income is ₹5,200. I have allocated ₹2,000 for essentials and ₹700 for savings." />
      </div>

      <div className="glass-card p-6 md:p-8">
        <p className="text-blue-300 font-medium mb-1 text-sm uppercase tracking-wider">Expected income</p>
        <h2 className="text-5xl font-black text-[var(--text-color)] tracking-tight mb-8 drop-shadow-md">₹5,200</h2>
        
        {/* Horizontal allocation bar */}
        <div className="w-full h-8 rounded-xl overflow-hidden flex mb-8 shadow-inner border border-white/10">
          <div className="bg-red-500 hover:bg-red-400 transition-colors cursor-pointer h-full" style={{ width: '38%' }} title="Essentials"></div>
          <div className="bg-orange-500 hover:bg-orange-400 transition-colors cursor-pointer h-full" style={{ width: '15%' }} title="Work expenses"></div>
          <div className="bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-pointer h-full" style={{ width: '14%' }} title="Savings"></div>
          <div className="bg-teal-500 hover:bg-teal-400 transition-colors cursor-pointer h-full" style={{ width: '10%' }} title="Emergency"></div>
          <div className="bg-blue-500 hover:bg-blue-400 transition-colors cursor-pointer h-full" style={{ width: '23%' }} title="Flexible"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
          <div><div className="w-4 h-4 bg-red-500 rounded-md mb-2 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div><span className="text-slate-400 block mb-1">Essentials</span><p className="font-bold text-[var(--text-color)] text-lg">₹2,000</p></div>
          <div><div className="w-4 h-4 bg-orange-500 rounded-md mb-2 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div><span className="text-slate-400 block mb-1">Work</span><p className="font-bold text-[var(--text-color)] text-lg">₹800</p></div>
          <div><div className="w-4 h-4 bg-emerald-500 rounded-md mb-2 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div><span className="text-slate-400 block mb-1">Savings</span><p className="font-bold text-[var(--text-color)] text-lg">₹700</p></div>
          <div><div className="w-4 h-4 bg-teal-500 rounded-md mb-2 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div><span className="text-slate-400 block mb-1">Emergency</span><p className="font-bold text-[var(--text-color)] text-lg">₹500</p></div>
          <div><div className="w-4 h-4 bg-blue-500 rounded-md mb-2 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div><span className="text-slate-400 block mb-1">Flexible</span><p className="font-bold text-[var(--text-color)] text-lg">₹1,200</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <PriorityCard title="Must Protect" items={['Rent', 'Fuel', 'Food', 'Phone']} color="border-red-500/30 bg-red-500/10" dot="bg-red-500" />
        <PriorityCard title="Should Save" items={['Emergency reserve', 'Short-term savings']} color="border-emerald-500/30 bg-emerald-500/10" dot="bg-emerald-500" />
        <PriorityCard title="Flexible" items={['Shopping', 'Entertainment', 'Dining']} color="border-blue-500/30 bg-blue-500/10" dot="bg-blue-500" />
      </div>

      <div className="glass-card p-6 md:p-8 mt-8 border-l-4 border-l-blue-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full mix-blend-screen filter blur-[60px] translate-x-1/2 -translate-y-1/2"></div>
        
        <h3 className="text-2xl font-bold text-[var(--text-color)] mb-8 relative z-10">Your plan changes with your income</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="bg-white/5 p-6 rounded-2xl border border-emerald-500/30 relative shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-2xl tracking-wider uppercase">Good Week</div>
            <p className="text-sm text-slate-400 mb-1">Last week</p>
            <p className="font-bold text-[var(--text-color)] text-xl mb-6">Income: ₹5,200</p>
            <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
              <span className="font-medium text-slate-300">Savings</span>
              <span className="font-black text-emerald-400 text-2xl">₹700</span>
            </div>
          </div>
          
          <div className="bg-white/5 p-6 rounded-2xl border border-red-500/30 relative shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-2xl tracking-wider uppercase">Difficult Week</div>
            <p className="text-sm text-slate-400 mb-1">This week</p>
            <p className="font-bold text-[var(--text-color)] text-xl mb-6">Income: ₹3,400</p>
            <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
              <span className="font-medium text-slate-300">Savings</span>
              <span className="font-black text-[var(--text-color)] text-2xl">₹250</span>
            </div>
          </div>
        </div>

        <p className="text-slate-300 mt-8 leading-relaxed bg-blue-900/30 p-5 rounded-xl border border-blue-500/20 relative z-10">
          <strong className="text-[var(--text-color)]">Mitra reduces your savings target</strong> when income falls so you don't have to sacrifice essentials.
        </p>
      </div>
    </div>
  );
}

function PriorityCard({ title, items, color, dot }) {
  return (
    <div className={`p-6 rounded-2xl border ${color} relative overflow-hidden backdrop-blur-sm`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-4 h-4 rounded-md ${dot} shadow-[0_0_10px_currentColor]`}></div>
        <h3 className="font-bold text-[var(--text-color)] text-lg">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="text-slate-300 font-medium text-sm bg-black/20 border border-white/5 px-4 py-2.5 rounded-xl">{item}</li>
        ))}
      </ul>
    </div>
  );
}
