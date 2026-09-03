import { ArrowRight, Info } from 'lucide-react';

export default function Earnings() {
  return (
    <div className="space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Your Earnings</h1>
        <p className="text-slate-500">See where your money is really coming from.</p>
      </div>

      <div className="glass-card p-6">
        <p className="text-slate-500 font-medium mb-1">Total this week</p>
        <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-6">₹5,620</h2>
        
        {/* Simple mock bar chart */}
        <div className="flex items-end justify-between h-32 mt-8 mb-2 gap-2">
          {[{d:'M', v: 40}, {d:'T', v: 60}, {d:'W', v: 45}, {d:'T', v: 80}, {d:'F', v: 90}, {d:'S', v: 30}, {d:'S', v: 75}].map((day, i) => (
            <div key={i} className="flex flex-col items-center flex-1 gap-2">
              <div className="w-full bg-blue-100 rounded-t-sm" style={{ height: `${day.v}%` }}>
                <div className="w-full bg-blue-500 rounded-t-sm h-full opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-xs text-slate-400 font-medium">{day.d}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex gap-4 items-start">
        <div className="text-amber-500 mt-1"><Info size={24} /></div>
        <div>
          <h3 className="font-bold text-amber-900 mb-1">Swiggy is currently your most profitable platform</h3>
          <p className="text-amber-700 text-sm mb-3">You earn slightly more from Swiggy after fuel and other work-related costs.</p>
          <button className="text-amber-800 font-bold text-sm flex items-center gap-1 hover:underline">
            See why <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">Platform comparison</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PlatformCard name="Swiggy" color="bg-orange-500" gross={3200} cost={600} />
        <PlatformCard name="Zomato" color="bg-red-500" gross={2800} cost={450} />
        <PlatformCard name="Uber" color="bg-black" gross={1900} cost={300} />
      </div>

      <div className="glass-card p-6 mt-8">
        <h3 className="font-bold text-slate-800 mb-4">Income sources</h3>
        <div className="space-y-4">
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
    <div className="glass-card p-5 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-16 h-16 ${color} opacity-10 rounded-full translate-x-1/2 -translate-y-1/2 blur-lg`}></div>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <h4 className="font-bold text-slate-800">{name}</h4>
      </div>
      
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-slate-500">Gross</span>
          <span className="font-medium">₹{gross}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span className="text-slate-500">Work costs</span>
          <span className="text-red-500 font-medium">-₹{cost}</span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="font-bold text-slate-700">Real profit</span>
          <span className="font-bold text-emerald-600">₹{profit}</span>
        </div>
      </div>
    </div>
  );
}

function SourceRow({ name, percent, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium text-slate-700">{name}</span>
        <span className="font-bold text-slate-800">{percent}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
