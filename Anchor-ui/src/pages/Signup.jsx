import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    login(email, password); // Mock signup just logs them in
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[60px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[60px] -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center font-bold text-[var(--text-color)] shadow-[0_0_20px_rgba(16,185,129,0.5)] mb-4">
            <Shield size={32} />
          </div>
          <h2 className="text-3xl font-black text-[var(--text-color)]">Join Mitra</h2>
          <p className="text-slate-400 mt-2">Start protecting your income today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--text-color)] focus:outline-none focus:border-emerald-500/50 transition-colors"
              placeholder="Rahul Sharma"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--text-color)] focus:outline-none focus:border-emerald-500/50 transition-colors"
              placeholder="rahul@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--text-color)] focus:outline-none focus:border-emerald-500/50 transition-colors"
              placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-[var(--text-color)] font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] mt-4"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 relative z-10">
          Already have an account? <Link to="/login" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

