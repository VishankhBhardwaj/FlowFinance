import React, { useState } from 'react';
import { Plus, Search, Trash2 } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import { CSVLink } from "react-csv";
export default function Transactions({ transactions = [], setTransactions, role }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [newTx, setNewTx] = useState({ date: '', description: '', amount: '', category: 'Food', type: 'expense' });

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (newTx.description === '' || newTx.amount === '' || newTx.date === '') {
      return;
    }

    let transactionToAdd = {
      id: Date.now(),
      date: newTx.date,
      description: newTx.description,
      amount: parseFloat(newTx.amount),
      category: newTx.category,
      type: newTx.type
    };

    let newList = [...transactions, transactionToAdd];
    setTransactions(newList);

    setNewTx({ date: '', description: '', amount: '', category: 'Food', type: 'expense' });
  };

  const handleDelete = (id) => {
    let newList = transactions.filter(t => t.id !== id);
    setTransactions(newList);
  };

  const filteredTransactions = transactions.filter(t => {
    let search = searchTerm.toLowerCase();
    return t.description.toLowerCase().includes(search) || t.category.toLowerCase().includes(search) || t.type.toLowerCase().includes(search)
  });
  const handleClick = async () => {
    try {
      const payload = {
        ...newTx,
        amount: parseFloat(newTx.amount),
      };

      const response = await axios.post('http://localhost:5000/api/data/upload', payload);

      if (response?.data) {
        setTransactions([...transactions, response.data.data]);
      }

      setNewTx({ date: '', description: '', amount: '', category: 'Food', type: 'expense' });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };
  // const handleDownload = async () => {

  // }
  return (
    <div className="space-y-6 animate__animated animate__fadeIn">
      {role === 'admin' && (
        <div className="bg-[#151a27] p-6 rounded-xl border border-indigo-500/30 shadow-lg shadow-indigo-500/5 animate__animated animate__fadeInDown">
          <h3 className="text-sm font-semibold mb-4 text-white flex items-center">
            <Plus className="w-4 h-4 mr-2 text-indigo-400" />
            Add New Transaction
          </h3>
          <form onSubmit={handleAddTransaction} className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[130px]">
              <label className="block text-xs text-gray-500 mb-1">Date</label>
              <input type="date" required value={newTx.date} onChange={e => setNewTx({ ...newTx, date: e.target.value })} className="w-full bg-[#0b0f19] border border-[#2a3241] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition" />
            </div>
            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs text-gray-500 mb-1">Description</label>
              <input type="text" placeholder="e.g. Salary" required value={newTx.description} onChange={e => setNewTx({ ...newTx, description: e.target.value })} className="w-full bg-[#0b0f19] border border-[#2a3241] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition" />
            </div>
            <div className="w-full sm:w-auto min-w-[100px]">
              <label className="block text-xs text-gray-500 mb-1">Amount</label>
              <input type="number" placeholder="0.00" required value={newTx.amount} onChange={e => setNewTx({ ...newTx, amount: e.target.value })} className="w-full bg-[#0b0f19] border border-[#2a3241] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition" />
            </div>
            <div className="w-full sm:w-auto min-w-[120px]">
              <label className="block text-xs text-gray-500 mb-1">Category</label>
              <select value={newTx.category} onChange={e => setNewTx({ ...newTx, category: e.target.value })} className="w-full bg-[#0b0f19] border border-[#2a3241] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition">
                <option value="Income">Income</option>
                <option value="Food">Food</option>
                <option value="Housing">Housing</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Utilities">Utilities</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="w-full sm:w-auto min-w-[100px]">
              <label className="block text-xs text-gray-500 mb-1">Type</label>
              <select value={newTx.type} onChange={e => setNewTx({ ...newTx, type: e.target.value })} className="w-full bg-[#0b0f19] border border-[#2a3241] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <button onClick={handleClick()} type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded-lg transition shadow-md whitespace-nowrap h-[38px]">
              Add
            </button>
            <ToastContainer />
          </form>
        </div>
      )}

      <div className="bg-[#151a27] rounded-xl border border-[#1e293b] shadow-sm overflow-hidden flex flex-col animate__animated animate__fadeInUp">
        <div className="p-4 border-b border-[#1e293b] flex flex-wrap items-center justify-between gap-4 ">
          <div className='flex flex-row gap-4'>
            <h3 className="text-sm text-white font-medium">Transactions</h3>
              <CSVLink
                data={transactions}
                filename={"transactions.csv"}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-2 py-1 rounded-sm transition shadow-md whitespace-nowrap h-[28px] cursor-pointer"
              >
                Export CSV
              </CSVLink>
          </div>
          <div className="flex gap-2 ">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-[#0b0f19] border border-[#2a3241] rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 transition w-full sm:w-48"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#0b0f19] text-gray-400 font-medium text-xs">
              <tr>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium text-right">Amount</th>
                <th className="px-6 py-3 font-medium text-center">Type</th>
                {role === 'admin' && <th className="px-6 py-3 font-medium text-center">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-[#1e2433] transition group">
                    <td className="px-6 py-3.5 text-gray-400 text-xs">{tx.date}</td>
                    <td className="px-6 py-3.5 font-medium text-gray-200">{tx.description}</td>
                    <td className="px-6 py-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] bg-[#1e2433] border border-[#2a3241] text-gray-300">
                        {tx.category}
                      </span>
                    </td>
                    <td className={`px-6 py-3.5 text-right font-medium text-sm ${tx.type === 'income' ? 'text-emerald-400' : 'text-gray-200'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-semibold ${tx.type === 'income' ? 'bg-indigo-600 border border-indigo-500 text-white' : 'bg-[#1e2433] border border-[#2a3241] text-gray-400'}`}>
                        {tx.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    {role === 'admin' && (
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => handleDelete(tx.id)}
                          className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                          title="Delete Transaction"
                        >
                          <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={role === 'admin' ? 6 : 5} className="px-6 py-8 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
