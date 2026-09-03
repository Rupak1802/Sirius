import { useState } from 'react';
import { CloudRain, Sun, Activity, AlertTriangle, Loader2, CheckSquare, Square } from 'lucide-react';

const ALL_JOBS = [
  { id: 'swiggy', name: 'Swiggy' },
  { id: 'rapido', name: 'Rapido' },
  { id: 'construction', name: 'Construction' },
  { id: 'retail', name: 'Retail Shop' }
];

const JOB_FORECASTS = [
  { job: 'Swiggy', date: 'Monday', demand: 'High', expected: '₹800 - ₹1,000' },
  { job: 'Swiggy', date: 'Tuesday', demand: 'Medium', expected: '₹600 - ₹800' },
  { job: 'Rapido', date: 'Wednesday', demand: 'Low', expected: '₹300 - ₹500' },
  { job: 'Construction', date: 'Thursday', demand: 'High (Fixed)', expected: '₹850' },
  { job: 'Construction', date: 'Friday', demand: 'High (Fixed)', expected: '₹850' },
  { job: 'Swiggy', date: 'Saturday', demand: 'Very High', expected: '₹1,200 - ₹1,500' },
  { job: 'Swiggy', date: 'Sunday', demand: 'Very High', expected: '₹1,200 - ₹1,500' },
];

export default function FinancialWeather() {
  const [selectedJobs, setSelectedJobs] = useState(['swiggy', 'rapido', 'construction']);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const toggleJob = (id) => {
    if(selectedJobs.includes(id)) {
      setSelectedJobs(selectedJobs.filter(j => j !== id));
    } else {
      setSelectedJobs([...selectedJobs, id]);
    }
  };

  const handleAnalyze = () => {
    if(selectedJobs.length === 0) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 2000); 
  };

  // Filter forecasts based on selected jobs (case insensitive)
  const displayForecasts = JOB_FORECASTS.filter(f => selectedJobs.includes(f.job.toLowerCase()));

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">Financial Weather</h1>
          <p className="text-[var(--text-muted)] mt-1">AI forecast based on your specific jobs.</p>
        </div>
      </div>

      {!showResults && !analyzing && (
        <div className="glass-card p-8 md:p-10 max-w-2xl mx-auto flex flex-col items-center">
          <CloudRain size={48} className="text-blue-500 mb-6 opacity-80" />
          <h2 className="text-2xl font-bold text-[var(--text-color)] mb-2">Ready to forecast your week?</h2>
          <p className="text-[var(--text-muted)] mb-8 text-center">
            Select the platforms you plan to work on this week. Flint will analyze local demand and historical data.
          </p>
          
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {ALL_JOBS.map(job => (
              <div 
                key={job.id} 
                onClick={() => toggleJob(job.id)}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedJobs.includes(job.id) ? 'bg-blue-500/10 border-blue-500' : 'bg-black/5 dark:bg-white/5 border-[var(--card-border)]'
                }`}
              >
                <span className="font-bold text-[var(--text-color)]">{job.name}</span>
                {selectedJobs.includes(job.id) ? <CheckSquare className="text-blue-500" size={20} /> : <Square className="text-[var(--text-muted)]" size={20} />}
              </div>
            ))}
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={selectedJobs.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <Activity size={20} /> Analyze Job Demand
          </button>
        </div>
      )}

      {analyzing && (
        <div className="glass-card p-16 text-center flex flex-col items-center border-blue-500/30 bg-blue-500/5 max-w-2xl mx-auto">
          <Loader2 size={48} className="text-blue-500 animate-spin mb-6" />
          <h2 className="text-2xl font-bold text-[var(--text-color)] mb-2">Flint AI Analyzing...</h2>
          <p className="text-[var(--text-muted)] animate-pulse">Comparing {selectedJobs.length} job roles, weather, and local events...</p>
        </div>
      )}

      {showResults && (
        <div className="animate-in fade-in duration-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-color)]">Your Forecast</h2>
            <button onClick={() => setShowResults(false)} className="text-sm font-bold text-blue-500 hover:underline">Edit Jobs</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6 border-emerald-500/30 bg-emerald-500/5">
              <div className="flex items-center gap-3 mb-2">
                <Sun className="text-emerald-500" size={24} />
                <h3 className="font-bold text-lg text-[var(--text-color)]">Forecast</h3>
              </div>
              <p className="text-3xl font-black text-[var(--text-color)]">Stable</p>
            </div>
            
            <div className="glass-card p-6">
              <p className="text-[var(--text-muted)] font-bold text-sm uppercase tracking-wider mb-2">Expected Total</p>
              <p className="text-3xl font-black text-blue-500">₹5,800 - ₹6,500</p>
            </div>

            <div className="glass-card p-6">
              <p className="text-[var(--text-muted)] font-bold text-sm uppercase tracking-wider mb-2">Best Opportunity</p>
              <p className="text-xl font-bold text-[var(--text-color)]">Weekend Delivery</p>
              <p className="text-sm text-emerald-500 font-medium">Very High Demand</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[var(--text-color)] mb-4">Job Role Comparison</h3>
          
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/10 dark:bg-white/5 border-b border-[var(--card-border)]">
                    <th className="p-4 font-bold text-[var(--text-color)]">Day</th>
                    <th className="p-4 font-bold text-[var(--text-color)]">Platform / Job</th>
                    <th className="p-4 font-bold text-[var(--text-color)]">Demand</th>
                    <th className="p-4 font-bold text-[var(--text-color)]">Expected Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {displayForecasts.length > 0 ? displayForecasts.map((forecast, i) => (
                    <tr key={i} className="border-b border-[var(--card-border)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 text-[var(--text-muted)]">{forecast.date}</td>
                      <td className="p-4 font-bold text-[var(--text-color)]">{forecast.job}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          forecast.demand.includes('High') ? 'bg-emerald-500/20 text-emerald-500' :
                          forecast.demand.includes('Medium') ? 'bg-blue-500/20 text-blue-500' :
                          'bg-amber-500/20 text-amber-500'
                        }`}>
                          {forecast.demand}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-[var(--text-color)]">{forecast.expected}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4" className="p-8 text-center text-[var(--text-muted)]">No forecast data available for selected jobs.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl flex gap-4 items-start mt-6 shadow-sm">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[var(--text-color)]">Flint Suggestion</h4>
              <p className="text-[var(--text-muted)] text-sm mt-1">
                Wednesday shows low demand for Rapido. You might want to pick up an extra Construction shift instead to maintain your target income.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
