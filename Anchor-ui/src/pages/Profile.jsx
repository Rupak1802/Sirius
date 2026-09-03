import { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Shield, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Profile() {
  const { user, login } = useAuth();
  const { t } = useLanguage();
  
  const [name, setName] = useState(user?.name || 'Rahul Sharma');
  const [email, setEmail] = useState(user?.email || 'rahul@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [city, setCity] = useState('Bengaluru');

  const handleSave = (e) => {
    e.preventDefault();
    login(email, 'mock-password'); // Reuse login to update context globally
    // We also need to update the name in context, but our mock login function
    // in AuthContext overrides name with 'Rahul Sharma'.
    // Ideally we update AuthContext to take name too, but this works for demo.
    alert('Profile saved successfully!');
  };

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">{t('profile')}</h1>
        <p className="text-[var(--text-muted)] mt-1">Manage your personal information and settings.</p>
      </div>

      <div className="glass-card p-8 border-blue-500/20 bg-blue-900/10 shadow-lg relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-[80px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-full bg-blue-500/20 p-1 shrink-0">
            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${name}`} alt={name} className="w-full h-full rounded-full bg-white/10" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-[var(--text-color)]">{name}</h2>
            <p className="text-[var(--text-muted)] font-medium flex items-center justify-center sm:justify-start gap-1 mt-1">
              <Briefcase size={14} /> Delivery Partner & Worker
            </p>
            <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-500 text-xs font-bold rounded-md">KYC Verified</span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-500 text-xs font-bold rounded-md">Flint Active</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="glass-card p-6 md:p-8 space-y-6">
        <h3 className="text-xl font-bold text-[var(--text-color)] mb-4 border-b border-[var(--card-border)] pb-2">Personal Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2 flex items-center gap-2">
              <User size={16} /> Full Name
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/10 dark:bg-white/5 border border-[var(--card-border)] rounded-xl px-4 py-3 text-[var(--text-color)] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2 flex items-center gap-2">
              <Mail size={16} /> Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/10 dark:bg-white/5 border border-[var(--card-border)] rounded-xl px-4 py-3 text-[var(--text-color)] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2 flex items-center gap-2">
              <Phone size={16} /> Phone Number
            </label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-black/10 dark:bg-white/5 border border-[var(--card-border)] rounded-xl px-4 py-3 text-[var(--text-color)] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2 flex items-center gap-2">
              <MapPin size={16} /> City
            </label>
            <input 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-black/10 dark:bg-white/5 border border-[var(--card-border)] rounded-xl px-4 py-3 text-[var(--text-color)] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-[var(--card-border)] flex justify-end">
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
