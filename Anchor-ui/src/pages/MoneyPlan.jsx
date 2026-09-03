export default function MoneyPlan() {
  return (
    <div className="space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Your Weekly Money Plan</h1>
        <p className="text-slate-500">We divided your expected income into what matters first.</p>
      </div>

      <div className="glass-card p-6 md:p-8">
        <p className="text-slate-500 font-medium mb-1">Expected income</p>
        <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-8">₹5,200</h2>
        
        {/* Horizontal allocation bar */}
        <div className="w-full h-6 rounded-full overflow-hidden flex mb-6">
          <div className="bg-red-500 h-full" style={{ width: '38%' }} title="Essentials"></div>
          <div className="bg-orange-400 h-full" style={{ width: '15%' }} title="Work expenses"></div>
          <div className="bg-emerald-500 h-full" style={{ width: '14%' }} title="Savings"></div>
          <div className="bg-teal-400 h-full" style={{ width: '10%' }} title="Emergency"></div>
          <div className="bg-blue-400 h-full" style={{ width: '23%' }} title="Flexible"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div><div className="w-3 h-3 bg-red-500 rounded-full mb-1 inline-block mr-1"></div><span className="text-slate-600">Essentials</span><p className="font-bold">₹2,000</p></div>
          <div><div className="w-3 h-3 bg-orange-400 rounded-full mb-1 inline-block mr-1"></div><span className="text-slate-600">Work</span><p className="font-bold">₹800</p></div>
          <div><div className="w-3 h-3 bg-emerald-500 rounded-full mb-1 inline-block mr-1"></div><span className="text-slate-600">Savings</span><p className="font-bold">₹700</p></div>
          <div><div className="w-3 h-3 bg-teal-400 rounded-full mb-1 inline-block mr-1"></div><span className="text-slate-600">Emergency</span><p className="font-bold">₹500</p></div>
          <div><div className="w-3 h-3 bg-blue-400 rounded-full mb-1 inline-block mr-1"></div><span className="text-slate-600">Flexible</span><p className="font-bold">₹1,200</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <PriorityCard title="Must Protect" items={['Rent', 'Fuel', 'Food', 'Phone']} color="border-red-200 bg-red-50" dot="bg-red-500" />
        <PriorityCard title="Should Save" items={['Emergency reserve', 'Short-term savings']} color="border-emerald-200 bg-emerald-50" dot="bg-emerald-500" />
        <PriorityCard title="Flexible" items={['Shopping', 'Entertainment', 'Dining']} color="border-blue-200 bg-blue-50" dot="bg-blue-500" />
      </div>

      <div className="glass-card p-6 md:p-8 mt-8 border-l-4 border-l-blue-500">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Your plan changes with your income</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 relative">
            <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">Good Week</div>
            <p className="text-sm text-slate-500 mb-1">Last week</p>
            <p className="font-bold text-lg mb-3">Income: ₹5,200</p>
            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
              <span className="font-medium text-slate-600">Savings</span>
              <span className="font-bold text-emerald-600 text-lg">₹700</span>
            </div>
          </div>
          
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 relative">
            <div className="absolute top-0 right-0 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">Difficult Week</div>
            <p className="text-sm text-slate-500 mb-1">This week</p>
            <p className="font-bold text-lg mb-3">Income: ₹3,400</p>
            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
              <span className="font-medium text-slate-600">Savings</span>
              <span className="font-bold text-slate-800 text-lg">₹250</span>
            </div>
          </div>
        </div>

        <p className="text-slate-500 mt-6 leading-relaxed bg-blue-50 p-4 rounded-xl text-sm border border-blue-100">
          <strong>Mitra reduces your savings target</strong> when income falls so you don't have to sacrifice essentials.
        </p>
      </div>
    </div>
  );
}

function PriorityCard({ title, items, color, dot }) {
  return (
    <div className={`p-5 rounded-2xl border ${color}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${dot}`}></div>
        <h3 className="font-bold text-slate-800">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-slate-700 font-medium text-sm bg-white/60 px-3 py-2 rounded-lg">{item}</li>
        ))}
      </ul>
    </div>
  );
}
