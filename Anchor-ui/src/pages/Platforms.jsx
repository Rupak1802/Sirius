import { useState } from 'react';
import { Briefcase, Plus, Search, CheckCircle, Landmark, Wallet, IndianRupee, Loader2, ArrowRight, Clock, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AVAILABLE_PLATFORMS = [
  { id: 'swiggy', name: 'Swiggy', type: 'Delivery', icon: '🍔' },
  { id: 'zomato', name: 'Zomato', type: 'Delivery', icon: '🛵' },
  { id: 'rapido', name: 'Rapido', type: 'Ride Share', icon: '🏍️' },
  { id: 'uber', name: 'Uber', type: 'Ride Share', icon: '🚗' },
  { id: 'urbancompany', name: 'Urban Company', type: 'Services', icon: '🔧' },
  { id: 'construction', name: 'Construction', type: 'Daily Wage', icon: '🏗️' },
];

export default function Platforms() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [activePlatforms, setActivePlatforms] = useState(['swiggy', 'rapido']);
  
  // Bank State
  const [bankStatus, setBankStatus] = useState('unlinked'); // 'unlinked', 'linking', 'linked'
  
  // Earnings State (Only manual cash now)
  const [earnings, setEarnings] = useState({});

  const togglePlatform = (id) => {
    if (activePlatforms.includes(id)) {
      setActivePlatforms(activePlatforms.filter(p => p !== id));
    } else {
      setActivePlatforms([...activePlatforms, id]);
    }
  };

  const handleLinkBank = () => {
    setBankStatus('linking');
    setTimeout(() => {
      setBankStatus('linked');
    }, 2000);
  };

  const handleEarningChange = (platformId, field, value) => {
    setEarnings(prev => ({
      ...prev,
      [platformId]: {
        ...prev[platformId],
        [field]: value
      }
    }));
  };

  const filtered = AVAILABLE_PLATFORMS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">Income & Platforms</h1>
        <p className="text-[var(--text-muted)] mt-1">Manage jobs, track pending payouts, and log daily earnings.</p>
      </div>

      {/* BANK LINKING SECTION */}
      <div className="glass-card p-6 md:p-8 border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-[80px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl border shrink-0 transition-colors ${bankStatus === 'linked' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' : 'bg-black/5 dark:bg-white/5 text-[var(--text-muted)] border-[var(--card-border)]'}`}>
              <Landmark size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-color)]">Flint Bank Sync</h2>
              {bankStatus === 'unlinked' && <p className="text-[var(--text-muted)] text-sm mt-1">Link to auto-sync UPI receipts and platform payouts.</p>}
              {bankStatus === 'linking' && <p className="text-blue-500 text-sm mt-1 animate-pulse">Securely connecting to your accounts...</p>}
              {bankStatus === 'linked' && (
                <div className="mt-2 space-y-1">
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm flex items-center gap-1"><CheckCircle size={14} /> Auto-Sync Active</p>
                  <p className="text-[var(--text-color)] font-medium text-sm">HDFC Bank (4021) • PhonePe Wallet linked</p>
                </div>
              )}
            </div>
          </div>

          {bankStatus === 'unlinked' && (
            <button onClick={handleLinkBank} className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
              Activate Auto-Sync <ArrowRight size={18} />
            </button>
          )}
          {bankStatus === 'linking' && (
            <button disabled className="w-full md:w-auto bg-emerald-500/50 text-white font-bold py-3 px-6 rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
              <Loader2 size={18} className="animate-spin" /> Connecting...
            </button>
          )}
          {bankStatus === 'linked' && (
            <button onClick={() => setBankStatus('unlinked')} className="text-sm font-bold text-[var(--text-muted)] hover:text-red-500 transition-colors underline">
              Unlink Account
            </button>
          )}
        </div>
      </div>

      {/* PENDING PAYOUTS TRACKER */}
      <div className="glass-card p-6 md:p-8 border-amber-500/20 bg-amber-500/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full filter blur-[60px] translate-x-1/3 translate-y-1/3"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-500/20 text-amber-500 rounded-lg">
              <Clock size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-color)]">Pending Payouts Tracker</h2>
              <p className="text-[var(--text-muted)] text-sm mt-0.5">Money you earned that platforms haven't deposited yet.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/5 dark:bg-white/5 border border-[var(--card-border)] rounded-xl p-5">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-[var(--text-color)]">Swiggy</span>
                <span className="text-amber-500 text-xs font-bold bg-amber-500/10 px-2 py-1 rounded">Expected Tue</span>
              </div>
              <p className="text-2xl font-black text-[var(--text-color)]">₹840</p>
              <p className="text-[var(--text-muted)] text-xs mt-1">From weekend deliveries</p>
            </div>
            
            <div className="bg-black/5 dark:bg-white/5 border border-[var(--card-border)] rounded-xl p-5">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-[var(--text-color)]">Rapido</span>
                <span className="text-amber-500 text-xs font-bold bg-amber-500/10 px-2 py-1 rounded">Processing</span>
              </div>
              <p className="text-2xl font-black text-[var(--text-color)]">₹320</p>
              <p className="text-[var(--text-muted)] text-xs mt-1">From today's rides</p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 flex flex-col justify-center">
              <p className="text-amber-600 dark:text-amber-400 font-bold uppercase tracking-widest text-xs mb-1">Total Stuck in Apps</p>
              <p className="text-3xl font-black text-amber-600 dark:text-amber-400">₹1,160</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-start gap-3 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
            <ShieldAlert size={16} className="text-amber-500 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-200/80 font-medium">
              You are running low on cash for rent. You can request early access to these pending funds via the <a href="/emergency" className="underline font-bold">Emergency Protocol</a>.
            </p>
          </div>
        </div>
      </div>

      {/* INCOME ENTRY SECTION */}
      <div>
        <h2 className="text-xl font-bold text-[var(--text-color)] mb-4 flex items-center gap-2">
          <Wallet className="text-blue-500" /> Log Today's Earnings
        </h2>
        {activePlatforms.length === 0 ? (
          <div className="glass-card p-8 text-center border-dashed border-[var(--card-border)]">
            <p className="text-[var(--text-muted)]">No active platforms. Select your jobs below to start logging income.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePlatforms.map(platformId => {
              const platform = AVAILABLE_PLATFORMS.find(p => p.id === platformId) || { name: platformId, icon: '💼' };
              const cash = parseFloat(earnings[platformId]?.cash || 0);
              
              // Simulated Auto-synced data
              const autoUpi = bankStatus === 'linked' ? (platformId === 'swiggy' ? 120 : 80) : 0;
              const platformPayout = bankStatus === 'linked' ? (platformId === 'swiggy' ? 450 : 320) : 0;
              
              const total = cash + autoUpi + platformPayout;

              return (
                <div key={platformId} className="glass-card p-6 border-blue-500/20 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--card-border)]">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl bg-white/10 w-10 h-10 rounded-full flex items-center justify-center shadow-inner">{platform.icon}</span>
                      <h3 className="font-bold text-[var(--text-color)] text-lg">{platform.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] block mb-0.5">Total Shift</span>
                      <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">₹{total}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      {/* Manual Cash Entry */}
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-[var(--text-color)] uppercase mb-1 flex justify-between">
                          <span>Cash Collected</span>
                          <span className="text-[10px] text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded">Manual</span>
                        </label>
                        <div className="relative">
                          <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-color)]" />
                          <input 
                            type="number" 
                            placeholder="0"
                            value={earnings[platformId]?.cash || ''}
                            onChange={(e) => handleEarningChange(platformId, 'cash', e.target.value)}
                            className="w-full bg-black/5 dark:bg-white/5 border border-blue-500/30 rounded-lg py-2.5 pl-8 pr-3 text-[var(--text-color)] font-bold focus:outline-none focus:border-blue-500 shadow-inner"
                          />
                        </div>
                      </div>
                      
                      {/* Auto UPI Entry */}
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Direct UPI</label>
                        {bankStatus === 'linked' ? (
                          <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 px-3 py-2.5 rounded-lg">
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><CheckCircle size={12} /> Sync</span>
                            <span className="font-black text-[var(--text-color)]">₹{autoUpi}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 border border-[var(--card-border)] px-3 py-2.5 rounded-lg opacity-60">
                            <span className="text-xs font-medium text-[var(--text-muted)]">Unlinked</span>
                            <span className="font-bold text-[var(--text-muted)]">₹0</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Platform Payout</label>
                      {bankStatus === 'linked' ? (
                        <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-lg">
                          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2"><CheckCircle size={16} /> Auto-synced</span>
                          <span className="font-black text-[var(--text-color)]">₹{platformPayout}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 border border-[var(--card-border)] px-4 py-2.5 rounded-lg opacity-60">
                          <span className="text-sm font-medium text-[var(--text-muted)]">Awaiting Bank Link</span>
                          <span className="font-bold text-[var(--text-muted)]">₹0</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FIND WORK SECTION */}
      <div className="glass-card p-6 md:p-8 mt-12 border-blue-500/20">
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-end">
          <div className="flex-1 w-full">
            <h2 className="text-xl font-bold text-[var(--text-color)] mb-4">Manage Active Platforms</h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
              <input 
                type="text" 
                placeholder="Search platforms to add..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border border-[var(--card-border)] rounded-xl py-4 pl-12 pr-4 text-[var(--text-color)] focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map(platform => {
            const isActive = activePlatforms.includes(platform.id);
            return (
              <div 
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                  isActive 
                  ? 'bg-blue-500/10 border-blue-500' 
                  : 'bg-black/5 dark:bg-white/5 border-[var(--card-border)] hover:border-[var(--text-muted)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl bg-white/10 w-10 h-10 rounded-full flex items-center justify-center shadow-inner">{platform.icon}</div>
                  <div>
                    <h4 className={`font-bold ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-[var(--text-color)]'}`}>{platform.name}</h4>
                    <p className="text-xs text-[var(--text-muted)] font-medium">{platform.type}</p>
                  </div>
                </div>
                {isActive ? (
                  <CheckCircle className="text-blue-500" size={20} />
                ) : (
                  <Plus className="text-[var(--text-muted)]" size={20} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
