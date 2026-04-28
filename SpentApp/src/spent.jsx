import React, { useState } from 'react';
import { LuX, LuPlus } from 'react-icons/lu';
import { MdAttachMoney, MdShoppingBag } from 'react-icons/md';
import Sidebar from './Sidebar';
import Header from './Header';
import StatCard from './StatCard';
import DashboardCharts from './DashboardCharts';
import TransactionList from './TransactionList';
import AIPanel from './AIPanel';

export default function Spent() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // primarily finance data 
  const [financeData, setFinanceData] = useState({
    balance: 14580,
    income: 6800,
    expenses: 4220
  });

  // transaction list
  const [transactions, setTransactions] = useState([
    { id: 1, merchant: 'Starbucks', date: 'Oct 28', category: 'Food', amount: 12.50, isIncome: true, icon: <MdAttachMoney size={20} className="text-emerald-400" />, bgIcon: 'bg-emerald-400/20' },
    { id: 2, merchant: 'Amazon', date: 'Oct 25', category: 'Shopping', amount: 89.99, isIncome: false, icon: <MdShoppingBag size={18} className="text-slate-200" />, bgIcon: 'bg-slate-700' },
  ]);

  // 3. State Form for new transaction
  const [newTx, setNewTx] = useState({ merchant: '', amount: '', category: 'General', isIncome: false });

  // save function
  const handleSaveAction = () => {
    setIsSaving(true);
    setTimeout(() => {
      if (activeMenu === 'Add Transaction') {
        const amountNum = Number(newTx.amount);
        setFinanceData(prev => ({
          ...prev,
          balance: newTx.isIncome ? prev.balance + amountNum : prev.balance - amountNum,
          income: newTx.isIncome ? prev.income + amountNum : prev.income,
          expenses: !newTx.isIncome ? prev.expenses + amountNum : prev.expenses
        }));
        const newEntry = {
          id: Date.now(),
          merchant: newTx.merchant,
          date: 'Today',
          category: newTx.category,
          amount: amountNum,
          isIncome: newTx.isIncome,
          icon: <MdAttachMoney size={20} className={newTx.isIncome ? "text-emerald-400" : "text-slate-200"} />,
          bgIcon: newTx.isIncome ? 'bg-emerald-400/20' : 'bg-slate-700'
        };
        setTransactions([newEntry, ...transactions]);
        setNewTx({ merchant: '', amount: '', category: 'General', isIncome: false });
      }
      
      setIsSaving(false);
      setActiveMenu(null);
    }, 1000);
  };

  const formatCurrency = (amount) => {
    return "$" + amount.toLocaleString('en-US', { minimumFractionDigits: 2 });
  };

  return (
    <div className="relative flex h-screen bg-[#0B0F19] text-white font-sans overflow-hidden">
      <Sidebar onMenuClick={setActiveMenu} />
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={setActiveMenu} />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">Overview & Tracking</h1>
            <button onClick={() => setActiveMenu('Add Transaction')} className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-lg shadow-teal-500/20">
              <LuPlus size={18} /> Add Transaction
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard title="Current Balance:" amount={formatCurrency(financeData.balance)} borderColor="border-t-4 border-t-blue-500" textColor="text-white" />
            <StatCard title="Total Income (Oct):" amount={formatCurrency(financeData.income)} borderColor="border-t-4 border-t-green-500" textColor="text-green-400" />
            <StatCard title="Total Expenses (Oct):" amount={formatCurrency(financeData.expenses)} borderColor="border-t-4 border-t-orange-500" textColor="text-orange-400" />
            <StatCard title="Projected" amount={formatCurrency(financeData.balance + 1200)} borderColor="border-t-4 border-t-teal-500" textColor="text-teal-400" />
          </div>
          
          <DashboardCharts financeData={financeData} />

          <div className="flex gap-6 mt-8 mb-8 items-start">
            <div className="flex-1">
              <TransactionList transactions={transactions} />
            </div>
            <AIPanel />
          </div>
        </main>
      </div>

      {activeMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#151A27] border border-slate-700 rounded-2xl w-[400px] overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
              <h2 className="text-lg font-semibold text-slate-200">{activeMenu}</h2>
              <button onClick={() => setActiveMenu(null)} className="text-slate-400 hover:text-white p-1 rounded"><LuX size={20} /></button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* FORM SETTINGS (first balance editing) */}
              {activeMenu === 'Settings' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Balance ($)</label>
                    <input type="number" value={financeData.balance} onChange={(e) => setFinanceData({...financeData, balance: Number(e.target.value)})} className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg p-2 text-sm text-slate-200 outline-none focus:border-teal-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Income ($)</label>
                    <input type="number" value={financeData.income} onChange={(e) => setFinanceData({...financeData, income: Number(e.target.value)})} className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg p-2 text-sm text-slate-200 outline-none focus:border-teal-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Expenses ($)</label>
                    <input type="number" value={financeData.expenses} onChange={(e) => setFinanceData({...financeData, expenses: Number(e.target.value)})} className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg p-2 text-sm text-slate-200 outline-none focus:border-teal-500" />
                  </div>
                </div>
              ) : activeMenu === 'Add Transaction' ? (
                /* additional transaction form */
                <>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Merchant</label>
                    <input type="text" value={newTx.merchant} onChange={(e) => setNewTx({...newTx, merchant: e.target.value})} className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg p-2 text-sm text-slate-200 outline-none focus:border-teal-500" placeholder="e.g. Netflix" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Amount ($)</label>
                    <input type="number" value={newTx.amount} onChange={(e) => setNewTx({...newTx, amount: e.target.value})} className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg p-2 text-sm text-slate-200 outline-none focus:border-teal-500" placeholder="0.00" />
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setNewTx({...newTx, isIncome: false})} className={`flex-1 py-2 rounded-lg text-xs font-medium border ${!newTx.isIncome ? 'bg-red-500/10 border-red-500 text-red-500' : 'border-slate-700 text-slate-500'}`}> Expense </button>
                    <button onClick={() => setNewTx({...newTx, isIncome: true})} className={`flex-1 py-2 rounded-lg text-xs font-medium border ${newTx.isIncome ? 'bg-green-500/10 border-green-500 text-green-500' : 'border-slate-700 text-slate-500'}`}> Income </button>
                  </div>
                </>
              ) : (
                <p className="text-slate-400 text-sm">Menu {activeMenu} in progress.</p>
              )}

              <button onClick={handleSaveAction} disabled={isSaving} className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 rounded-lg font-medium mt-4">
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}