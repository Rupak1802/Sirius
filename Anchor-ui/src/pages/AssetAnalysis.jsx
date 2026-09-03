import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Shield, Activity, Sparkles, BrainCircuit } from 'lucide-react';

const ANALYSIS_DATA = {
  'gold': {
    name: 'Digital Gold',
    currentTrend: 'Up 12.4% YTD',
    aiVerdict: 'Strong Buy',
    confidence: '94%',
    analysis: 'Digital gold offers a highly liquid hedge against inflation. For gig workers with volatile income, it acts as a perfect micro-investment because you can buy increments as small as ₹10. Flint AI has analyzed recent market volatility and recommends gold as a primary safety net.',
    topPicks: [
      { name: 'MMTC-PAMP Gold 24K', returns: '+1.2% (7d)' },
      { name: 'SafeGold 24K', returns: '+1.1% (7d)' },
    ]
  },
  'health': {
    name: 'Micro Health Policy',
    currentTrend: 'Essential',
    aiVerdict: 'Critical Need',
    confidence: '99%',
    analysis: 'As a gig worker, a single medical emergency can wipe out your savings and pause your ability to earn. Flint AI strongly recommends a micro health policy before any other investment. A premium of just ₹50/week covers ₹1 Lakh in emergency hospitalization.',
    topPicks: [
      { name: 'Digit Gig Worker Cover', returns: '₹1L Cover' },
      { name: 'Acko Micro Health', returns: '₹50k Cover' },
    ]
  },
  'mutual-fund': {
    name: 'Liquid Mutual Fund',
    currentTrend: 'Stable ~7% Annual',
    aiVerdict: 'Hold',
    confidence: '85%',
    analysis: 'Liquid funds give better returns than a savings account but can be withdrawn in 24 hours. Flint AI suggests moving your core Emergency Fund here only AFTER you have built at least a ₹5,000 baseline in your bank account.',
    topPicks: [
      { name: 'Quant Liquid Fund Direct-Growth', returns: '7.2% p.a.' },
      { name: 'Nippon India Liquid Fund', returns: '7.1% p.a.' },
    ]
  }
};

export default function AssetAnalysis() {
  const { assetId } = useParams();
  const navigate = useNavigate();
  
  const data = ANALYSIS_DATA[assetId] || {
    name: 'Unknown Asset',
    currentTrend: 'N/A',
    aiVerdict: 'N/A',
    confidence: '0%',
    analysis: 'No analysis available for this asset.',
    topPicks: []
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors mb-4"
      >
        <ArrowLeft size={20} /> Back to Growth Options
      </button>

      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">{data.name}</h1>
            <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1 border border-emerald-500/30">
              <Sparkles size={12} /> AI Analyzed
            </span>
          </div>
          <p className="text-[var(--text-muted)]">Real-time market insights powered by Flint AI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="glass-card p-6 border-blue-500/20 bg-blue-500/5">
          <TrendingUp className="text-blue-500 mb-3" size={24} />
          <h3 className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-wider mb-1">Current Trend</h3>
          <p className="text-2xl font-black text-[var(--text-color)]">{data.currentTrend}</p>
        </div>
        
        <div className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5">
          <Shield className="text-emerald-500 mb-3" size={24} />
          <h3 className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-wider mb-1">Flint Verdict</h3>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{data.aiVerdict}</p>
        </div>

        <div className="glass-card p-6 border-purple-500/20 bg-purple-500/5">
          <Activity className="text-purple-500 mb-3" size={24} />
          <h3 className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-wider mb-1">AI Confidence</h3>
          <p className="text-2xl font-black text-[var(--text-color)]">{data.confidence}</p>
        </div>
      </div>

      <div className="glass-card p-8 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)] mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full filter blur-[60px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <BrainCircuit className="text-blue-500" size={28} />
          <h2 className="text-xl font-bold text-[var(--text-color)]">Flint AI Analysis</h2>
        </div>
        <p className="text-lg text-[var(--text-color)] leading-relaxed relative z-10 font-medium">
          {data.analysis}
        </p>
      </div>

      <h3 className="text-xl font-bold text-[var(--text-color)] mb-4">Top AI Picks for You</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.topPicks.map((pick, i) => (
          <div key={i} className="glass-card p-5 border-[var(--card-border)] hover:border-emerald-500/50 transition-colors flex justify-between items-center cursor-pointer group">
            <span className="font-bold text-[var(--text-color)] group-hover:text-emerald-500 transition-colors">{pick.name}</span>
            <span className="font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg">{pick.returns}</span>
          </div>
        ))}
      </div>
      
    </div>
  );
}
