import React from 'react';

export default function StatCard({ title, amount, borderColor, textColor }) {
  return (
    <div className={`p-5 rounded-xl border border-slate-800 bg-[#151A27] flex flex-col justify-center ${borderColor} transition-all hover:bg-slate-800/50`}>
      <p className="text-slate-400 text-sm mb-2">{title}</p>
      <h3 className={`text-3xl font-bold tracking-tight ${textColor}`}>{amount}</h3>
    </div>
  );
}