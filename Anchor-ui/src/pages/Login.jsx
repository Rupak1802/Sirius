import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[60px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[60px] -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-[var(--text-color)] shadow-[0_0_20px_rgba(37,99,235,0.5)] mb-4">
            <Shield size={32} />
          </div>
          <h2 className="text-3xl font-black text-[var(--text-color)]">Welcome back</h2>
          <p className="text-slate-400 mt-2">Log in to your financial co-pilot</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--text-color)] focus:outline-none focus:border-blue-500/50 transition-colors"
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--text-color)] focus:outline-none focus:border-blue-500/50 transition-colors"
              placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-[var(--text-color)] font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 relative z-10">
          Don't have an account? <Link to="/signup" className="text-blue-400 font-bold hover:text-blue-300 transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

