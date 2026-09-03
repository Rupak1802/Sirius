import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    <div className="min-h-screen flex font-sans">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black items-center justify-center order-2">
        <img 
          src="/login_hero.jpg" 
          alt="Abstract Finance Illustration" 
          className="absolute inset-0 w-full h-full object-cover opacity-90 scale-x-[-1]"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 text-white p-12 max-w-lg mt-32 text-right w-full">
          <h1 className="text-5xl font-black mb-6 leading-tight drop-shadow-lg">Take control of your future.</h1>
          <p className="text-xl text-emerald-200/90 font-medium leading-relaxed drop-shadow-md">
            Join thousands of smart gig workers building their safety nets and accelerating their earnings with Flint.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-[var(--bg-color)] relative order-1">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg border border-[var(--card-border)] bg-white/50 dark:bg-white/10 mb-6">
              <img src="/FLint logo.png" alt="Flint Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-3xl font-black text-[var(--text-color)] text-center">Join Flint</h2>
            <p className="text-[var(--text-muted)] mt-2 text-center">Start protecting your income today</p>
          </div>

          <div className="glass-card p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-emerald-500/20">
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[var(--text-color)] mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-black/5 dark:bg-white/5 border border-[var(--card-border)] rounded-xl px-4 py-3.5 text-[var(--text-color)] focus:outline-none focus:border-emerald-500 transition-colors shadow-inner font-medium"
                  placeholder="Rahul Sharma"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[var(--text-color)] mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-black/5 dark:bg-white/5 border border-[var(--card-border)] rounded-xl px-4 py-3.5 text-[var(--text-color)] focus:outline-none focus:border-emerald-500 transition-colors shadow-inner font-medium"
                  placeholder="rahul@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[var(--text-color)] mb-2">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-black/5 dark:bg-white/5 border border-[var(--card-border)] rounded-xl px-4 py-3.5 text-[var(--text-color)] focus:outline-none focus:border-emerald-500 transition-colors shadow-inner font-medium tracking-widest"
                  placeholder="••••••••"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-transform transform hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.4)] mt-4"
              >
                Create Account
              </button>
            </form>
          </div>

          <p className="text-center text-[var(--text-muted)] mt-8 font-medium">
            Already have an account? <Link to="/login" className="text-emerald-500 font-bold hover:text-emerald-600 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
