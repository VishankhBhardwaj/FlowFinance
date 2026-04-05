import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import axios from 'axios'
import 'animate.css';

export default function App() {
  const [initialData, setInitialData] = useState([]);
  const [role, setRole] = useState('viewer');
  const [activeTab, setActiveTab] = useState('dashboard');




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data/transactions");
        if (response?.data?.initial_transactions) {
          setInitialData(response.data.initial_transactions);
          if (!localStorage.getItem('fin_transactions') || JSON.parse(localStorage.getItem('fin_transactions') || "[]").length === 0) {
            setTransactions(response.data.initial_transactions);
          }
          console.error("failed to fetch the data");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
    
  }, []);

  let savedData = localStorage.getItem('fin_transactions');
  let defaults = savedData ? JSON.parse(savedData) : initialData;
  const [transactions, setTransactions] = useState(defaults);

  useEffect(() => {
    localStorage.setItem('fin_transactions', JSON.stringify(transactions));
  }, [transactions]);

  return (
    <div className="flex h-screen bg-[#0b0f19] text-gray-100 overflow-hidden font-sans">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        role={role}
        setRole={setRole}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative ">
        <Header activeTab={activeTab} role={role} />

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar animate__animated animate__fadeIn">
          <div className="max-w-6xl mx-auto space-y-8">
            {activeTab === 'dashboard' && (
              <Dashboard transactions={transactions} />
            )}

            {activeTab === 'transactions' && (
              <Transactions
                transactions={transactions}
                setTransactions={setTransactions}
                role={role}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
