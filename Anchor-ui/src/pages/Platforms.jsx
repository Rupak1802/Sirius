import { useState } from 'react';
import { Briefcase, Plus, Search, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AVAILABLE_PLATFORMS = [
  { id: 'swiggy', name: 'Swiggy', type: 'Delivery', icon: '🍔', popular: true },
  { id: 'zomato', name: 'Zomato', type: 'Delivery', icon: '🛵', popular: true },
  { id: 'rapido', name: 'Rapido', type: 'Ride Share', icon: '🏍️', popular: true },
  { id: 'uber', name: 'Uber', type: 'Ride Share', icon: '🚗', popular: true },
  { id: 'urbancompany', name: 'Urban Company', type: 'Services', icon: '🔧', popular: true },
  { id: 'construction', name: 'Construction', type: 'Daily Wage', icon: '🏗️', popular: false },
  { id: 'freelance', name: 'Freelance / Other', type: 'Flexible', icon: '💻', popular: false },
  { id: 'retail', name: 'Retail Shop', type: 'Part Time', icon: '🏪', popular: false },
];

export default function Platforms() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [activePlatforms, setActivePlatforms] = useState(['swiggy', 'zomato']);

  const togglePlatform = (id) => {
    if (activePlatforms.includes(id)) {
      setActivePlatforms(activePlatforms.filter(p => p !== id));
    } else {
      setActivePlatforms([...activePlatforms, id]);
    }
  };

  const filtered = AVAILABLE_PLATFORMS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">{t('platforms') || "My Work Platforms"}</h1>
          <p className="text-[var(--text-muted)] mt-1">Register the jobs and apps you work with to track your full income.</p>
        </div>
        
      </div>

      <div className="glass-card p-6 md:p-8 border-blue-500/20 bg-blue-900/10">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[var(--text-color)] mb-4">Find your work</h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
              <input 
                type="text" 
                placeholder="Search Swiggy, Construction, etc..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/20 dark:bg-white/5 border border-[var(--card-border)] rounded-xl py-4 pl-12 pr-4 text-[var(--text-color)] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          
          <div className="md:w-64 bg-black/20 dark:bg-white/5 border border-[var(--card-border)] rounded-xl p-4 flex flex-col justify-center items-center text-center">
            <Briefcase size={32} className="text-blue-500 mb-2" />
            <h3 className="font-bold text-[var(--text-color)] text-lg">{activePlatforms.length} Active</h3>
            <p className="text-[var(--text-muted)] text-sm">Income sources registered</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map(platform => {
            const isActive = activePlatforms.includes(platform.id);
            return (
              <div 
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isActive 
                  ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                  : 'bg-black/10 dark:bg-white/5 border-[var(--card-border)] hover:border-[var(--text-muted)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{platform.icon}</div>
                  <div>
                    <h4 className={`font-bold ${isActive ? 'text-blue-500' : 'text-[var(--text-color)]'}`}>{platform.name}</h4>
                    <p className="text-xs text-[var(--text-muted)]">{platform.type}</p>
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
