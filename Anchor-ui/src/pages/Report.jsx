import { useLanguage } from '../context/LanguageContext';
import { mockData } from '../data/mockData';
import { Download, ShieldCheck, HeartPulse, Activity } from 'lucide-react';
import VoiceButton from '../components/ui/VoiceButton';

export default function Report() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">{t('report')}</h1>
          <p className="text-[var(--text-muted)] mt-1">Simple summary of your money this week.</p>
        </div>
        <VoiceButton text="Your weekly report is ready. You are in a STABLE condition. You earned ₹5,620, protected your rent, and have 7 days of runway." />
      </div>

      <div className="glass-card p-10 text-center border-blue-500/30 bg-blue-500/5 relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full filter blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
        
        <HeartPulse size={64} className="mx-auto text-emerald-500 mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
        <h2 className="text-4xl font-black text-[var(--text-color)] mb-2">You are Safe</h2>
        <p className="text-xl text-[var(--text-muted)] max-w-md mx-auto relative z-10">
          Your income easily covers your essentials this week.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-[var(--text-muted)] text-sm font-bold uppercase">Money In</p>
              <p className="text-2xl font-bold text-[var(--text-color)]">₹{mockData.income.current_weekly}</p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-muted)]">You earned more this week than usual.</p>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-[var(--text-muted)] text-sm font-bold uppercase">Runway</p>
              <p className="text-2xl font-bold text-[var(--text-color)]">{mockData.financialState.runway_days} Days</p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-muted)]">If you stop working, you are safe for a week.</p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button className="bg-[var(--text-color)] text-[var(--bg-color)] hover:opacity-90 font-bold py-4 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2">
          <Download size={20} /> Download PDF Report
        </button>
      </div>
    </div>
  );
}
