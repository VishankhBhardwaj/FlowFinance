import React from 'react';
import { ShieldAlert, Eye, Sun } from 'lucide-react';

export default function Header({ activeTab, role }) {
  return (
    <header className="h-16 bg-[#0b0f19] border-b border-[#1e293b] flex items-center justify-between px-6 md:px-8 z-10 w-full animate__animated animate__fadeInDown">
      <div className="flex items-center text-gray-400">
        <span className="text-sm font-medium">FlowFinance</span>
      </div>
      <div className="flex items-center space-x-4">
        {role === 'admin' && (
          <span className="flex items-center text-xs text-red-400 bg-red-400/10 px-3 py-1.5 rounded-md border border-red-500/20">
             <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />
             Admin
          </span>
        )}
        <div className="flex items-center px-3 py-1.5 bg-[#151a27] border border-[#1e293b] rounded-md text-xs text-gray-300">
           {role === 'viewer' ? <Eye className="w-3.5 h-3.5 mr-1.5" /> : <ShieldAlert className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />}
           <span className="capitalize">{role}</span>
        </div>
        <button className="p-1.5 rounded-md text-gray-400 hover:bg-[#1e293b] transition">
          <Sun className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
