import { useState, useEffect } from 'react';
import { Shield, TrendingUp, TrendingDown, ArrowRight, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { mockData } from '../data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function useAnimatedNumber(endValue, duration = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.floor(easeProgress * endValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [endValue, duration]);

  return value;
}

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const animatedSafeAmount = useAnimatedNumber(mockData.financialState.safe_to_spend);
  
  // Speedometer data
  const score = 85; 
  // Map CIBIL score logic (300-900) to 0-100 or use segments
  // Red (0-40), Yellow (40-70), Green (70-100)
  // Instead of dynamic gradient, we split the pie into 3 zones and use needle, or just colored pie slices.
  const speedoData = [
    { name: 'Red', value: 40, color: '#ef4444' },
    { name: 'Yellow', value: 30, color: '#f59e0b' },
    { name: 'Green', value: 30, color: '#10b981' }
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">{t('welcome')} <span className="inline-block animate-waving-hand">👋</span></h1>
          <p className="text-[var(--text-muted)] mt-1">Here's how your money looks this week.</p>
        </div>
      </div>

      {/* Hero Financial Health Card */}
      <div className="glass-card p-6 md:p-8 relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-transparent">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full filter blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10">
          <p className="text-blue-400 font-medium mb-1 tracking-wide uppercase text-xs">{t('available')}</p>
          <h2 className="text-5xl md:text-6xl font-black text-[var(--text-color)] tracking-tight mb-6 drop-shadow-lg">
            ₹{animatedSafeAmount.toLocaleString()}
          </h2>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-lg font-bold text-sm shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              {t('stable')}
            </div>
            <p className="text-[var(--text-muted)] text-sm">You're on track to cover your upcoming essentials.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm bg-white/5 px-3 py-2 rounded-lg border border-white/10">
              <TrendingUp size={16} />
              <span>{mockData.income.trend} vs last week</span>
            </div>
            <Link to="/plan" className="w-full sm:w-auto bg-[var(--text-color)] hover:opacity-90 text-[var(--bg-color)] px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2">
              View my plan <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5">
          <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider mb-1">{t('income')}</p>
          <p className="text-2xl font-bold text-[var(--text-color)] mb-2">₹{mockData.income.current_weekly}</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[var(--text-muted)]">This week</span>
            <span className="text-emerald-500 font-bold flex items-center"><TrendingUp size={12} className="mr-0.5" /> 8%</span>
          </div>
        </div>
        <div className="glass-card p-5">
          <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider mb-1">{t('expenses')}</p>
          <p className="text-2xl font-bold text-[var(--text-color)] mb-2">₹{mockData.expenses.current_weekly}</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[var(--text-muted)]">This week</span>
            <span className="text-emerald-500 font-bold flex items-center"><TrendingDown size={12} className="mr-0.5" /> 4%</span>
          </div>
        </div>
        <div className="glass-card p-5 border-emerald-500/20 bg-emerald-500/5">
          <p className="text-emerald-500 text-xs font-bold uppercase tracking-wider mb-1">Savings</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">₹{mockData.savings.current_weekly}</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-emerald-600/70 dark:text-emerald-500/70">This month</span>
          </div>
        </div>
        <div className="glass-card p-5">
          <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider mb-1">{t('upcoming')}</p>
          <p className="text-2xl font-bold text-[var(--text-color)] mb-2">₹2,850</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[var(--text-muted)]">Next 7 days</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-4 flex justify-between items-center shadow-sm">
          <span className="text-[var(--text-muted)] font-medium">Total Monthly Income</span>
          <span className="text-[var(--text-color)] font-bold text-lg">₹{(mockData.income.current_weekly * 4).toLocaleString()}</span>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-4 flex justify-between items-center shadow-sm">
          <span className="text-[var(--text-muted)] font-medium">Total Monthly Expenses</span>
          <span className="text-[var(--text-color)] font-bold text-lg">₹{(mockData.expenses.current_weekly * 4).toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 border-blue-500/30 bg-blue-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-[40px] translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/20 text-blue-500 rounded-xl border border-blue-500/30"><Sun size={24} /></div>
              <h3 className="text-xl font-bold text-[var(--text-color)]">Your week looks stable</h3>
            </div>
          </div>
          
          <div className="space-y-4 mb-6 relative z-10">
            <div className="flex justify-between items-center border-b border-[var(--card-border)] pb-3">
              <span className="text-[var(--text-muted)]">Expected income</span>
              <span className="font-semibold text-[var(--text-color)]">₹5,100–₹5,700</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--card-border)] pb-3">
              <span className="text-[var(--text-muted)]">Upcoming essentials</span>
              <span className="font-semibold text-[var(--text-color)]">₹2,850</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-muted)]">Expected buffer</span>
              <span className="font-bold text-blue-500 text-lg">₹{mockData.financialState.expected_buffer}</span>
            </div>
          </div>
          <Link to="/weather" className="block w-full text-center bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-[var(--card-border)] text-[var(--text-color)] py-3 rounded-xl font-semibold transition-colors">
            See forecast
          </Link>
        </div>

        <div className="glass-card p-6 border-emerald-500/30 bg-emerald-500/5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-[40px] translate-x-1/3 translate-y-1/3"></div>
          
          <div>
            <div className="flex justify-between items-start mb-2 relative z-10">
              <h3 className="text-xl font-bold text-[var(--text-color)]">Flint's recommendation</h3>
              <span className="bg-emerald-500 text-[var(--bg-color)] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">New</span>
            </div>
            <p className="text-[var(--text-muted)] text-sm mb-4">Investment readiness score based on your surplus.</p>
          </div>
          
          <div className="relative h-32 w-full flex justify-center items-end -mt-4 mb-4 z-10">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={speedoData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {speedoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                {/* Needle for 85 score */}
                <Pie
                  data={[{ value: 1 }]}
                  cx="50%"
                  cy="100%"
                  startAngle={180 - (180 * (score/100))}
                  endAngle={180 - (180 * (score/100)) - 2}
                  innerRadius={40}
                  outerRadius={90}
                  dataKey="value"
                  fill="var(--text-color)"
                  stroke="none"
                  isAnimationActive={false}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="text-3xl font-black text-[var(--text-color)]">{score}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Excellent</span>
            </div>
          </div>
          
          <button onClick={() => navigate('/growth')} className="w-full bg-emerald-500 hover:bg-emerald-600 text-[var(--bg-color)] py-3 rounded-xl font-bold transition-all shadow-md z-10 flex items-center justify-center gap-2">
            Invest Now <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-2">
          <h3 className="text-xl font-bold text-[var(--text-color)] flex items-center gap-2">
            <Shield className="text-emerald-500" /> {t('protect')}
          </h3>
        </div>
        <p className="text-[var(--text-muted)] text-sm mb-6">These expenses help you continue working next week.</p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-[var(--card-border)] text-center">
            <div className="text-3xl mb-2 drop-shadow-md">⛽</div>
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Fuel</p>
            <p className="font-bold text-[var(--text-color)] text-lg">₹500</p>
          </div>
          <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-[var(--card-border)] text-center">
            <div className="text-3xl mb-2 drop-shadow-md">📱</div>
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Phone</p>
            <p className="font-bold text-[var(--text-color)] text-lg">₹200</p>
          </div>
          <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-[var(--card-border)] text-center">
            <div className="text-3xl mb-2 drop-shadow-md">🔧</div>
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Vehicle</p>
            <p className="font-bold text-[var(--text-color)] text-lg">₹300</p>
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-3 px-4 rounded-xl font-bold">
          <Shield size={18} />
          <span>Total: ₹{mockData.expenses.protected_total} protected</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg">
        <div>
          <h3 className="text-2xl font-bold text-[var(--text-color)] mb-2">What happens if my income drops?</h3>
          <p className="text-[var(--text-muted)] text-sm">See how your plan adapts to a difficult week in the simulator.</p>
        </div>
        <Link to="/whatif" className="w-full md:w-auto bg-[var(--text-color)] hover:opacity-90 text-[var(--bg-color)] px-8 py-3.5 rounded-xl font-bold transition-transform transform hover:scale-105 shadow-xl whitespace-nowrap text-center">
          Try What-If Simulator
        </Link>
      </div>
    </div>
  );
}
