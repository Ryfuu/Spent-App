import React from 'react';
import { MdCoffee, MdHome, MdAttachMoney } from 'react-icons/md';
import { FaAmazon } from 'react-icons/fa';
import { LuPlus } from 'react-icons/lu';

export default function TransactionList({ transactions }) {
  return (
    <div className="p-6 border border-slate-800 bg-[#151A27] rounded-xl flex-1">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-slate-200">Recent Transactions</h3>
      </div>

      <div className="flex flex-col gap-5">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center group cursor-pointer">
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.bgIcon}`}>
                {tx.icon}
              </div>
              <div>
                <p className="text-slate-200 font-medium group-hover:text-teal-400 transition-colors">{tx.merchant}</p>
                <p className="text-slate-500 text-xs">{tx.date}</p>
              </div>
            </div>

            <div className="hidden md:block text-slate-500 text-sm w-32">
              {tx.category}
            </div>

            <div className={`font-medium w-24 text-right ${tx.isIncome ? 'text-emerald-400' : 'text-slate-300'}`}>
              {tx.isIncome ? `+${tx.amount}` : `-${tx.amount}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}