import { useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { mockData } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Earnings() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'

  const weekData = mockData.income.daily_history.map(day => ({
    day: day.day,
    amount: day.amount,
    amount2: Math.max(0, day.amount - 200 + Math.random() * 400)
  }));

  const monthData = mockData.income.daily_history.map(day => ({
    day: day.day + " (W1-W4)",
    amount: day.amount * 4,
    amount2: Math.max(0, (day.amount - 200 + Math.random() * 400) * 4)
  }));

  const displayData = viewMode === 'week' ? weekData : monthData;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">{t('earnings')}</h1>
          <p className="text-[var(--text-muted)] mt-1">See where your money is really coming from.</p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-blue-500 font-medium mb-1 text-sm uppercase tracking-wider">
              Total this {viewMode}
            </p>
            <h2 className="text-5xl font-black text-[var(--text-color)] tracking-tight drop-shadow-md">
              ₹{viewMode === 'week' ? mockData.income.current_weekly : mockData.income.current_weekly * 4}
            </h2>
          </div>
          <div className="flex bg-black/10 dark:bg-white/10 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('week')}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${viewMode === 'week' ? 'bg-[var(--text-color)] text-[var(--bg-color)] shadow' : 'text-[var(--text-muted)]'}`}
            >
              This Week
            </button>
            <button 
              onClick={() => setViewMode('month')}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${viewMode === 'month' ? 'bg-[var(--text-color)] text-[var(--bg-color)] shadow' : 'text-[var(--text-muted)]'}`}
            >
              This Month
            </button>
          </div>
        </div>
        
        {/* Animated Recharts Line Chart */}
        <div className="h-64 mt-8 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={displayData}>
              <XAxis dataKey="day" stroke="var(--text-color)" tick={{fill: 'var(--text-color)'}} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-color)" tick={{fill: 'var(--text-color)'}} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '10px', color: 'var(--text-color)' }}
                itemStyle={{ color: '#60a5fa' }}
              />
              <Line type="monotone" dataKey="amount" name="Current" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="amount2" name="Previous" stroke="#a1a1aa" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl flex gap-4 items-start shadow-[0_0_15px_rgba(245,158,11,0.1)]">
        <div className="text-amber-400 mt-1 p-2 bg-amber-500/20 rounded-lg"><Info size={24} /></div>
        <div>
          <h3 className="font-bold text-[var(--text-color)] mb-1">Swiggy is currently your most profitable platform</h3>
          <p className="text-[var(--text-muted)] text-sm mb-3">You earn slightly more from Swiggy after fuel and other work-related costs.</p>
          <button className="text-amber-500 font-bold text-sm flex items-center gap-1 hover:text-amber-400 transition-colors">
            See why <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-[var(--text-color)] mt-8 mb-4">Platform comparison</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockData.income.sources.map((source, i) => (
          <PlatformCard key={i} name={source.name} color={i === 0 ? "bg-orange-500" : i === 1 ? "bg-red-500" : "bg-zinc-500"} gross={source.amount} cost={Math.round(source.amount * 0.15)} />
        ))}
      </div>

      <div className="glass-card p-6 md:p-8 mt-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 w-full overflow-hidden">
          <h3 className="font-bold text-[var(--text-color)] mb-6 text-xl">Income sources</h3>
          <div className="space-y-6">
            {mockData.income.sources.map((source, i) => (
              <SourceRow key={i} name={source.name} percent={source.percent} color={i === 0 ? "bg-orange-500" : i === 1 ? "bg-red-500" : "bg-zinc-500"} delay={i * 200} />
            ))}
          </div>
        </div>
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockData.income.sources}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="percent"
              >
                {mockData.income.sources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#f97316' : index === 1 ? '#ef4444' : '#71717a'} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: 'none', borderRadius: '10px', color: 'var(--text-color)' }} />
            </PieChart>
          </ResponsiveContainer>
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
          <span className="text-[var(--text-muted)]">Gross</span>
          <span className="font-medium text-[var(--text-color)]">₹{gross}</span>
        </div>
        <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-3">
          <span className="text-[var(--text-muted)]">Work costs</span>
          <span className="text-red-500 font-medium bg-red-500/10 px-2 py-0.5 rounded">-₹{cost}</span>
        </div>
        <div className="flex justify-between pt-2">
          <span className="font-bold text-[var(--text-muted)]">Real profit</span>
          <span className="font-black text-emerald-500 text-lg">₹{profit}</span>
        </div>
      </div>
    </div>
  );
}

function SourceRow({ name, percent, color, delay }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium text-[var(--text-color)]">{name}</span>
        <span className="font-bold text-[var(--text-color)]">{percent}%</span>
      </div>
      <div className="w-full bg-black/5 dark:bg-white/10 rounded-full h-3 overflow-hidden">
        <div 
          className={`${color} h-3 rounded-full shadow-[0_0_10px_currentColor] transition-all duration-1000 ease-out`} 
          style={{ width: '0%', animation: `fillBar 1s ease-out ${delay}ms forwards` }}
        ></div>
      </div>
      <style>{`
        @keyframes fillBar {
          from { width: 0%; }
          to { width: ${percent}%; }
        }
      `}</style>
    </div>
  );
}
