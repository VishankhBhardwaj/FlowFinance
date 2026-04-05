import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp } from 'lucide-react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
const COLORS = ['#4f46e5', '#c084fc', '#f97316', '#eab308', '#0ea5e9']; 

export default function Dashboard({ transactions = [] }) {
  const [trendData, setTrendData] = useState([]);
  let totalIncome = 0;
  let totalExpense = 0;
  let balance = 0;

  for (let i = 0; i < transactions.length; i++) {
    let tx = transactions[i];
    if (tx.type === 'income') {
      totalIncome += tx.amount;
      balance += tx.amount;
    } else {
      totalExpense += tx.amount;
      balance -= tx.amount;
    }
  }

  let categoryTotals = {};
  for (let i = 0; i < transactions.length; i++) {
    let tx = transactions[i];
    if (tx.type === 'expense') {
      if (categoryTotals[tx.category] === undefined) {
        categoryTotals[tx.category] = 0;
      }
      categoryTotals[tx.category] += tx.amount;
    }
  }

  let expensesByCategory = [];
  for (let category in categoryTotals) {
    expensesByCategory.push({ name: category, value: categoryTotals[category] });
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/data/fetch', { balance });
        if (response?.data?.data) {
          setTrendData(response.data.data);
          toast.success("Trend data fetched successfully");
        } else {
          toast.error("Failed to fetch data");
        }
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, [balance]);
  const highestSpendingCategory = expensesByCategory.length
    ? [...expensesByCategory].sort((a, b) => b.value - a.value)[0]
    : { name: 'None', value: 0 };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate__animated animate__fadeInDown">
        <div className="bg-[#151a27] p-6 rounded-xl border border-[#1e293b] shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <p className="text-gray-400 text-sm font-medium">Total Balance</p>
            <div className="p-1.5 bg-indigo-500/10 rounded-md text-indigo-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">${balance}</h3>
        </div>
        <div className="bg-[#151a27] p-6 rounded-xl border border-[#1e293b] shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <p className="text-gray-400 text-sm font-medium">Monthly Income</p>
            <div className="p-1.5 bg-emerald-500/10 rounded-md text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">${totalIncome}</h3>
        </div>
        <div className="bg-[#151a27] p-6 rounded-xl border border-[#1e293b] shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <p className="text-gray-400 text-sm font-medium">Total Expenses</p>
            <div className="p-1.5 bg-red-500/10 rounded-md text-red-400">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">${totalExpense}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate__animated animate__fadeInUp">
        <div className="lg:col-span-3 bg-[#151a27] p-6 rounded-xl border border-[#1e293b] shadow-sm">
          <h3 className="text-sm text-white font-medium mb-6">Balance Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3241" vertical={true} horizontal={true} />
                <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} dy={10} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} dx={-10} />
                <RechartsTooltip cursor={{ stroke: '#334155', strokeWidth: 1 }} contentStyle={{ backgroundColor: '#1e2433', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }} formatter={(val) => [`$${val}`, 'Balance']} />
                <Line type="basis" dataKey="balance" stroke="#4f46e5" strokeWidth={2.5} dot={false} activeDot={{ r: 6, fill: '#4f46e5', stroke: '#151a27', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#151a27] p-6 rounded-xl border border-[#1e293b] shadow-sm flex flex-col">
          <h3 className="text-sm text-white font-medium mb-4">Spending Breakdown</h3>
          <div className="flex-1 flex flex-col">
            <div className="h-48 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={expensesByCategory} cx="50%" cy="50%" innerRadius={50} outerRadius={75} stroke="none" dataKey="value">
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#1e2433', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }} formatter={(value) => `$${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              {expensesByCategory.map((entry, index) => (
                <div key={entry.name} className="flex items-center text-xs">
                  <div className="w-2.5 h-2.5 rounded-full mr-1.5" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-gray-400">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate__animated animate__fadeInUp">
        <div className="lg:col-span-2 bg-[#151a27] p-6 rounded-xl border border-[#1e293b] shadow-sm">
          <div className="flex justify-between mb-4">
            <h3 className="text-sm text-white font-medium">Recent Transactions</h3>
          </div>
          <div className="space-y-4 text-sm mt-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center py-2 border-b border-[#2a3241] last:border-0">
                <div className="w-1/4 text-gray-500 text-xs">{tx.date}</div>
                <div className="w-1/3 text-white">{tx.description}</div>
                <div className="w-1/4">
                  <span className="px-2 py-1 rounded-full text-[10px] bg-[#1e2433] text-gray-400 border border-[#2a3241]">{tx.category}</span>
                </div>
                <div className={`w-1/6 text-right font-medium ${tx.type === 'income' ? 'text-emerald-400' : 'text-gray-200'}`}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#151a27] p-6 rounded-xl border border-[#1e293b] shadow-sm">
          <h3 className="text-sm text-white font-medium mb-4">Insights</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center text-indigo-400 mb-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="text-xs font-semibold">Top Spending Category</span>
              </div>
              <div className="flex justify-between items-center mt-1 text-sm bg-[#1e2433] p-3 rounded-lg border border-[#2a3241]">
                <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div><span className="text-white">{highestSpendingCategory.name}</span></div>
                <span className="font-bold text-white">${highestSpendingCategory.value}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center text-indigo-400 mb-2 text-xs font-semibold">
                Savings Goal
              </div>
              <div className="mt-1 text-sm bg-[#1e2433] p-3 rounded-lg border border-[#2a3241]">
                <div className="text-white font-medium mb-2">${totalIncome} / $25000</div>
                <div className="w-full bg-[#0b0f19] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${Math.min((totalIncome / 25000) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
