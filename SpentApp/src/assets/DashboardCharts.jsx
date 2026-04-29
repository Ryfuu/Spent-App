import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export default function DashboardCharts({ financeData }) {
  
  // Bar Chart data
  const barData = [
    { name: 'Jun', income: 4000, expenses: 2400 },
    { name: 'Jul', income: 4500, expenses: 3200 },
    { name: 'Aug', income: 5200, expenses: 3900 },
    { name: 'Sep', income: 4800, expenses: 3800 },
    { name: 'Oct', income: financeData.income, expenses: financeData.expenses },
    { name: 'Nov', income: 0, expenses: 0 },
  ];

  // conut chart data
  const pieData = [
    { name: 'Housing', value: financeData.expenses * 0.5, color: '#3b82f6' },
    { name: 'Food & Dining', value: financeData.expenses * 0.25, color: '#f97316' }, 
    { name: 'Subscriptions', value: financeData.expenses * 0.1, color: '#8b5cf6' }, 
    { name: 'Transportation', value: financeData.expenses * 0.15, color: '#14b8a6' }, 
  ];

  return (
    <div className="grid grid-cols-2 gap-6 h-80 mb-8">
      
      {/* bar chart box */}
      <div className="p-5 border border-slate-800 bg-[#151A27] rounded-xl flex flex-col">
        <h3 className="text-lg font-medium text-slate-200 mb-6">Income vs Expenses (Oct)</h3>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} barSize={20}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip 
                cursor={{fill: '#1e293b'}} 
                contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff'}}
              />
              <Bar dataKey="income" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Income" />
              <Bar dataKey="expenses" fill="#f97316" radius={[4, 4, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* donut chart box */}
      <div className="p-5 border border-slate-800 bg-[#151A27] rounded-xl flex flex-col">
        <h3 className="text-lg font-medium text-slate-200 mb-2">Expense Breakdown</h3>
        <div className="flex-1 w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `$${value.toFixed(0)}`}
                contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff'}} 
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* teks inside donut chart */}
          <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-slate-400 text-xs">Total</span>
            <span className="text-white font-bold text-xl">${financeData.expenses.toLocaleString()}</span>
          </div>
        </div>
      </div>

    </div>
  );
}