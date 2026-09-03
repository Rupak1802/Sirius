import { useState } from 'react';
import { Target, TrendingUp, AlertTriangle, Edit2, Trash2, Check, X, Plus } from 'lucide-react';

const INITIAL_GOALS = [
  { id: 1, name: "Rent Buffer", current: 1500, target: 2500, icon: "🏠" },
  { id: 2, name: "Vehicle Repair", current: 300, target: 1300, icon: "🔧" }
];

export default function Savings() {
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [isEditingGoal, setIsEditingGoal] = useState(null);
  const [editGoalData, setEditGoalData] = useState({ name: '', target: '' });
  
  // Save Widget Change logic
  const [savingsAmount, setSavingsAmount] = useState(350);
  const [isChangingAmount, setIsChangingAmount] = useState(false);

  const emergencyFundTarget = 15000;
  const emergencyFundCurrent = 6800;
  const progressPercent = Math.round((emergencyFundCurrent / emergencyFundTarget) * 100);

  const startEditGoal = (goal) => {
    setIsEditingGoal(goal.id);
    setEditGoalData({ name: goal.name, target: goal.target });
  };

  const saveEditGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, name: editGoalData.name, target: Number(editGoalData.target) } : g));
    setIsEditingGoal(null);
  };

  const removeGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">Smart Savings</h1>
          <p className="text-[var(--text-muted)] mt-1">Save more on good weeks. Stay flexible on difficult weeks.</p>
        </div>
        
      </div>

      <div className="glass-card p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full filter blur-[60px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/20 rounded-full filter blur-[60px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        
        <h3 className="text-xl font-bold text-[var(--text-color)] mb-2 relative z-10">Emergency Fund Milestone</h3>
        <p className="text-[var(--text-muted)] mb-8 relative z-10">Level 2 Reached! Keep going for true peace of mind.</p>
        
        {/* Milestone Graph UI */}
        <div className="w-full max-w-2xl relative z-10 mb-8 px-4">
          <div className="h-4 bg-black/20 dark:bg-white/10 rounded-full w-full relative overflow-hidden shadow-inner">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between mt-4">
            <div className="text-center">
              <div className="w-4 h-4 bg-emerald-500 rounded-full mx-auto mb-1 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="text-xs font-bold text-[var(--text-muted)]">₹5,000<br/>Level 1</span>
            </div>
            <div className="text-center -ml-8">
              <div className="w-4 h-4 bg-emerald-500 rounded-full mx-auto mb-1 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="text-xs font-bold text-[var(--text-muted)]">₹10,000<br/>Level 2</span>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-black/20 dark:bg-white/10 border border-emerald-500/50 rounded-full mx-auto mb-1"></div>
              <span className="text-xs font-bold text-[var(--text-muted)]">₹15,000<br/>Goal</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-12 mt-4">
          <div>
            <p className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-wider mb-1">Current</p>
            <p className="text-3xl font-bold text-[var(--text-color)]">₹{emergencyFundCurrent}</p>
          </div>
          <div>
            <p className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-wider mb-1">Target</p>
            <p className="text-3xl font-bold text-[var(--text-color)]">₹{emergencyFundTarget}</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 border-emerald-500/30 bg-emerald-900/10">
        <h3 className="text-2xl font-bold text-[var(--text-color)] mb-2">Save ₹{savingsAmount} this week</h3>
        <p className="text-[var(--text-muted)] mb-6 border-l-2 border-emerald-500 pl-4 py-1">Your income is 14% above your normal weekly average.</p>
        
        <div className="flex gap-4 items-center">
          <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-[var(--bg-color)] py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            Move ₹{savingsAmount} to savings
          </button>
          
          {isChangingAmount ? (
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                value={savingsAmount} 
                onChange={(e) => setSavingsAmount(Number(e.target.value))}
                className="bg-black/20 dark:bg-white/10 px-4 py-3 rounded-xl w-24 text-[var(--text-color)] text-center font-bold outline-none border border-[var(--card-border)]"
              />
              <button onClick={() => setIsChangingAmount(false)} className="p-3 bg-[var(--text-color)] text-[var(--bg-color)] rounded-xl font-bold"><Check size={20}/></button>
            </div>
          ) : (
            <button onClick={() => setIsChangingAmount(true)} className="px-6 py-3 rounded-xl font-semibold text-[var(--text-muted)] hover:text-[var(--text-color)] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-[var(--card-border)]">
              Change
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8 mb-4">
        <h3 className="text-xl font-bold text-[var(--text-color)]">Savings Goals</h3>
        <button className="text-sm font-bold text-blue-500 flex items-center gap-1 hover:text-blue-400">
          <Plus size={16} /> Add Goal
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map(goal => (
          <div key={goal.id} className="glass-card p-6 relative group">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl bg-black/10 dark:bg-white/5 p-3 rounded-xl border border-[var(--card-border)]">{goal.icon}</div>
              <div className="flex-1">
                {isEditingGoal === goal.id ? (
                  <input 
                    value={editGoalData.name} 
                    onChange={e => setEditGoalData({...editGoalData, name: e.target.value})}
                    className="bg-black/20 dark:bg-white/10 px-2 py-1 rounded w-full mb-1 text-[var(--text-color)] text-sm"
                  />
                ) : (
                  <h4 className="font-bold text-[var(--text-color)]">{goal.name}</h4>
                )}
                
                {isEditingGoal === goal.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--text-muted)]">Target: ₹</span>
                    <input 
                      type="number" 
                      value={editGoalData.target} 
                      onChange={e => setEditGoalData({...editGoalData, target: e.target.value})}
                      className="bg-black/20 dark:bg-white/10 px-2 py-1 rounded w-20 text-[var(--text-color)] text-sm"
                    />
                  </div>
                ) : (
                  <p className="text-[var(--text-muted)] text-sm">Target: ₹{goal.target}</p>
                )}
              </div>
            </div>

            {isEditingGoal === goal.id ? (
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => saveEditGoal(goal.id)} className="bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded-md text-sm font-bold flex items-center gap-1"><Check size={14}/> Save</button>
                <button onClick={() => setIsEditingGoal(null)} className="bg-red-500/20 text-red-500 px-3 py-1 rounded-md text-sm font-bold flex items-center gap-1"><X size={14}/> Cancel</button>
              </div>
            ) : (
              <>
                <div className="mb-2 flex justify-between items-end">
                  <span className="text-2xl font-bold text-emerald-500">₹{goal.current}</span>
                  <span className="text-xs font-bold text-[var(--text-muted)]">{Math.round((goal.current/goal.target)*100)}%</span>
                </div>
                <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${(goal.current/goal.target)*100}%` }}></div>
                </div>
                
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEditGoal(goal)} className="p-1.5 bg-blue-500/20 text-blue-500 rounded-md hover:bg-blue-500/40"><Edit2 size={14}/></button>
                  <button onClick={() => removeGoal(goal.id)} className="p-1.5 bg-red-500/20 text-red-500 rounded-md hover:bg-red-500/40"><Trash2 size={14}/></button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
