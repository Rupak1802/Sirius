import { mockData } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, Award, Shield, ArrowRight } from 'lucide-react';
import VoiceButton from '../components/ui/VoiceButton';

export default function Growth() {
  const { t } = useLanguage();
  
  // SRS Logic: Cap at 30% of surplus or 100/day
  const surplus = mockData.growth.surplus;
  const isFragile = mockData.financialState.state === 'FRAGILE' || mockData.financialState.state === 'SHOCK';
  
  const rawTarget = surplus * 0.3;
  const recommendedDaily = Math.min(Math.round(rawTarget / 7), 100);
  const recommendedWeekly = recommendedDaily * 7;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">{t('growth')}</h1>
          <p className="text-[var(--text-muted)] mt-1">Invest your surplus automatically.</p>
        </div>
        <VoiceButton text={isFragile ? "Growth is currently paused because your buffer is low. Protect your essentials first." : `You have a healthy surplus. You can safely invest ₹${recommendedWeekly} this week into Digital Gold.`} />
      </div>

      {isFragile ? (
        <div className="glass-card p-8 border-red-500/30 bg-red-900/10 text-center">
          <Shield className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-[var(--text-color)] mb-2">Growth Paused</h2>
          <p className="text-[var(--text-muted)] max-w-md mx-auto">Your financial state is currently tight. Mitra has automatically paused your investments so you have cash for your essentials.</p>
        </div>
      ) : (
        <>
          <div className="glass-card p-8 border-emerald-500/30 bg-emerald-900/10 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full filter blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <TrendingUp className="text-emerald-500" size={32} />
              <h2 className="text-2xl font-bold text-[var(--text-color)]">Mitra AI Recommendation</h2>
            </div>
            
            <p className="text-[var(--text-muted)] mb-8 text-lg relative z-10">
              Your buffer is healthy (₹{surplus}). Based on our safety rules, you can comfortably invest <span className="font-bold text-emerald-500 text-2xl mx-1">₹{recommendedWeekly}</span> this week without risking your essentials.
            </p>

            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2 relative z-10">
              Auto-Invest ₹{recommendedWeekly} / week <ArrowRight />
            </button>
          </div>

          <h3 className="text-xl font-bold text-[var(--text-color)] mt-10 mb-6">Available Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockData.growth.options.map((opt, i) => (
              <div key={i} className="glass-card p-6 border-blue-500/10 hover:border-blue-500/30 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                    <Award size={24} />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-black/10 dark:bg-white/10 rounded-md text-[var(--text-muted)]">Min ₹{opt.minimum}</span>
                </div>
                <h4 className="text-lg font-bold text-[var(--text-color)] mb-2">{opt.name}</h4>
                <p className="text-[var(--text-muted)] text-sm mb-4 h-10">{opt.description}</p>
                <div className="flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-4">
                  <span className="text-sm font-medium text-emerald-500">Risk: {opt.risk}</span>
                  <ArrowRight size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
