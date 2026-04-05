import React from 'react';
import { LayoutDashboard, WalletCards, TrendingUp } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, role, setRole }) {
  return (
    <aside className="w-64 bg-[#0d1117] border-r border-[#1e293b] flex flex-col hidden md:flex z-10 transition-all shadow-xl animate__animated animate__fadeInLeft">
      <div className="h-16 flex items-center px-6 border-b border-[#1e293b]">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center mr-3">
          <WalletCards className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-wide text-white">
          FlowFinance
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center w-full px-4 py-3 rounded-lg transition duration-200 cursor-pointer ${
            activeTab === 'dashboard' ? 'bg-[#1e2433] text-indigo-400 font-medium' : 'text-gray-400 hover:bg-[#1e2433]/50'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('transactions')}
          className={`flex items-center w-full px-4 py-3 rounded-lg transition duration-200 cursor-pointer ${
            activeTab === 'transactions' ? 'bg-[#1e2433] text-indigo-400 font-medium' : 'text-gray-400 hover:bg-[#1e2433]/50'
          }`}
        >
          <TrendingUp className="w-5 h-5 mr-3" />
          Transactions
        </button>
      </nav>

      <div className="p-4 border-t border-[#1e293b]">
        <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 block">
          User Role
        </label>
        <div className="flex items-center space-x-2 bg-[#151a27] p-1 rounded-lg border border-[#1e293b]">
          <button 
            onClick={() => setRole('viewer')}
            className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${
              role === 'viewer' ? 'bg-[#1e2433] text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Viewer
          </button>
          <button 
            onClick={() => setRole('admin')}
            className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${
              role === 'admin' ? 'bg-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Admin
          </button>
        </div>
      </div>
    </aside>
  );
}
