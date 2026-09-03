import { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const INITIAL_BUDGET = {
  mustProtect: [
    { id: 1, name: 'Rent', amount: 3500 },
    { id: 2, name: 'Fuel', amount: 2000 },
    { id: 3, name: 'Groceries', amount: 2500 }
  ],
  shouldSave: [
    { id: 4, name: 'Emergency Fund', amount: 1000 },
    { id: 5, name: 'Bike Repair', amount: 500 }
  ],
  flexible: [
    { id: 6, name: 'Entertainment', amount: 800 },
    { id: 7, name: 'Eating Out', amount: 1000 }
  ]
};

export default function BudgetManager() {
  const { t } = useLanguage();
  const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [addingCategory, setAddingCategory] = useState(null);

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditAmount(item.amount);
  };

  const saveEdit = (category) => {
    setBudget({
      ...budget,
      [category]: budget[category].map(item => 
        item.id === editingId ? { ...item, name: editName, amount: Number(editAmount) } : item
      )
    });
    setEditingId(null);
  };

  const removeItem = (category, id) => {
    setBudget({
      ...budget,
      [category]: budget[category].filter(item => item.id !== id)
    });
  };

  const addItem = (category) => {
    if(!newItemName || !newItemAmount) return;
    const newItem = { id: Date.now(), name: newItemName, amount: Number(newItemAmount) };
    setBudget({
      ...budget,
      [category]: [...budget[category], newItem]
    });
    setAddingCategory(null);
    setNewItemName('');
    setNewItemAmount('');
  };

  const renderSection = (title, category, colorClass, borderColor) => (
    <div className={`glass-card p-6 border-t-4 ${borderColor} mb-6`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[var(--text-color)]">{title}</h2>
        <span className="font-bold text-[var(--text-muted)]">
          Total: ₹{budget[category].reduce((acc, curr) => acc + curr.amount, 0)}
        </span>
      </div>
      
      <div className="space-y-3 mb-4">
        {budget[category].map(item => (
          <div key={item.id} className="flex justify-between items-center bg-black/10 dark:bg-white/5 p-3 rounded-xl">
            {editingId === item.id ? (
              <div className="flex gap-2 flex-1 items-center">
                <input 
                  value={editName} onChange={e => setEditName(e.target.value)}
                  className="bg-white/10 px-2 py-1 rounded w-1/2 text-sm"
                />
                <input 
                  type="number" value={editAmount} onChange={e => setEditAmount(e.target.value)}
                  className="bg-white/10 px-2 py-1 rounded w-1/4 text-sm"
                />
                <button onClick={() => saveEdit(category)} className="text-emerald-500 p-1 hover:bg-white/10 rounded"><Check size={16}/></button>
                <button onClick={() => setEditingId(null)} className="text-red-500 p-1 hover:bg-white/10 rounded"><X size={16}/></button>
              </div>
            ) : (
              <>
                <span className="font-medium text-[var(--text-color)]">{item.name}</span>
                <div className="flex items-center gap-4">
                  <span className="font-bold">₹{item.amount}</span>
                  <div className="flex gap-1">
                    <button onClick={() => startEdit(item)} className="text-blue-500 p-1 hover:bg-white/10 rounded"><Edit2 size={16}/></button>
                    <button onClick={() => removeItem(category, item.id)} className="text-red-500 p-1 hover:bg-white/10 rounded"><Trash2 size={16}/></button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {addingCategory === category ? (
        <div className="flex gap-2 items-center bg-black/10 dark:bg-white/5 p-3 rounded-xl mt-2">
          <input 
            placeholder="Name" value={newItemName} onChange={e => setNewItemName(e.target.value)}
            className="bg-white/10 px-2 py-1 rounded w-1/2 text-sm"
          />
          <input 
            type="number" placeholder="Amount" value={newItemAmount} onChange={e => setNewItemAmount(e.target.value)}
            className="bg-white/10 px-2 py-1 rounded w-1/4 text-sm"
          />
          <button onClick={() => addItem(category)} className="text-emerald-500 p-1 hover:bg-white/10 rounded"><Check size={16}/></button>
          <button onClick={() => setAddingCategory(null)} className="text-red-500 p-1 hover:bg-white/10 rounded"><X size={16}/></button>
        </div>
      ) : (
        <button 
          onClick={() => setAddingCategory(category)}
          className={`flex items-center gap-2 text-sm font-bold ${colorClass} hover:opacity-80 mt-2`}
        >
          <Plus size={16} /> Add {title}
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-color)] tracking-tight">{t('budget')}</h1>
        <p className="text-[var(--text-muted)] mt-1">Manage your spending categories.</p>
      </div>
      
      {renderSection("Must Protect (Essentials)", "mustProtect", "text-red-500", "border-red-500")}
      {renderSection("Should Save", "shouldSave", "text-emerald-500", "border-emerald-500")}
      {renderSection("Flexible Spending", "flexible", "text-blue-500", "border-blue-500")}
    </div>
  );
}
