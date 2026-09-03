import { useState } from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, ArrowRight, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { mockData } from '../data/mockData';

export default function Insights() {
  const { t } = useLanguage();

  const data = mockData.income.daily_history;

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">{t('insights')}</h1>
        <p className="text-[var(--text-muted)] mt-1">Deep analysis of your financial behavior.</p>
      </div>

      {/* Hero Graph Widget */}
      <div className="glass-card p-6 md:p-8 border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-2.5 bg-blue-500/20 text-blue-500 rounded-xl border border-blue-500/30">
            <TrendingUp size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--text-color)]">Weekly Velocity</h2>
            <p className="text-sm text-[var(--text-muted)]">Your earning speed vs. spending speed</p>
          </div>
        </div>
        
        <div className="h-64 w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="var(--text-color)" tick={{fill: 'var(--text-color)'}} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '10px', color: 'var(--text-color)' }} />
              <Area type="monotone" dataKey="amount" stroke="#3b82f6" fillOpacity={1} fill="url(#colorIncome)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 flex flex-col md:flex-row gap-4 relative z-10">
          <div className="flex-1 bg-black/10 dark:bg-white/5 p-4 rounded-xl border border-[var(--card-border)]">
            <p className="text-sm text-[var(--text-muted)] font-bold uppercase tracking-wider mb-1">Observation</p>
            <p className="text-[var(--text-color)] text-sm">Your earning velocity peaks on weekends, but your expenses peak on Wednesdays due to bulk grocery purchases. Spreading grocery runs could improve mid-week cash flow.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recommendation Widget */}
        <div className="glass-card p-6 border-emerald-500/30 bg-emerald-500/5 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="text-emerald-500" size={24} />
            <h3 className="font-bold text-lg text-[var(--text-color)]">Actionable Strategy</h3>
          </div>
          <p className="text-[var(--text-color)] mb-6 text-lg leading-relaxed">
            Switch entirely to <span className="font-bold text-emerald-500">Swiggy Delivery</span> this Saturday evening. 
            Rain is forecasted, meaning surge pricing will be active. 
          </p>
          <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl mb-6">
            <span className="block text-sm text-[var(--text-muted)] font-medium mb-1">Expected Earnings Boost</span>
            <span className="text-2xl font-black text-emerald-500">+ ₹450 / shift</span>
          </div>
          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-[var(--bg-color)] py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2">
            Add to Schedule <ArrowRight size={18} />
          </button>
        </div>

        {/* Risk Alert Widget */}
        <div className="glass-card p-6 border-amber-500/30 bg-amber-500/5 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-amber-500" size={24} />
            <h3 className="font-bold text-lg text-[var(--text-color)]">Risk Factor Detected</h3>
          </div>
          <p className="text-[var(--text-color)] mb-6 text-lg leading-relaxed">
            Your fuel expenses are consuming <span className="font-bold text-red-400">18%</span> of your total gross income, which is 5% higher than the city average.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 bg-black/10 dark:bg-white/5 p-3 rounded-xl">
              <Shield className="text-blue-500 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-[var(--text-muted)]"><strong className="text-[var(--text-color)]">Flint Fix:</strong> Optimize your delivery routes. We recommend rejecting orders over 8km unless surge is active.</p>
            </div>
            <div className="flex items-start gap-3 bg-black/10 dark:bg-white/5 p-3 rounded-xl">
              <Shield className="text-blue-500 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-[var(--text-muted)]"><strong className="text-[var(--text-color)]">Flint Fix:</strong> Check tire pressure weekly; poor pressure reduces mileage by up to 10%.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
