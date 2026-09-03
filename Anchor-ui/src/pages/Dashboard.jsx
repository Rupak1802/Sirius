import GlassCard from '../components/ui/GlassCard';
import VoiceButton from '../components/ui/VoiceButton';
import { ShieldCheck, Lock, Car, Home } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Buffer Status</h1>
        <VoiceButton text="You are safe for 12 days. Good time to save extra." />
      </div>
      
      <GlassCard className="border-green-500/30 bg-green-900/10 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-green-500/20 rounded-full text-green-400">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-400">STABLE</h2>
            <p className="text-gray-300">Runway: 12 Days</p>
          </div>
        </div>
        <p className="text-green-100/70">
          Aap 12 dinon tak surakshit hain. You are safe for 12 days. Good time to save extra.
        </p>
      </GlassCard>

      <GlassCard title="Protected Essentials">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <Home className="text-blue-300" size={24} />
            <div className="flex-grow">
              <p className="font-semibold">Rent</p>
              <p className="text-gray-400 text-sm">₹4,000 / month</p>
            </div>
            <Lock className="text-gray-500" size={20} />
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <Car className="text-blue-300" size={24} />
            <div className="flex-grow">
              <p className="font-semibold">Fuel</p>
              <p className="text-gray-400 text-sm">₹1,500 / week</p>
            </div>
            <Lock className="text-gray-500" size={20} />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
