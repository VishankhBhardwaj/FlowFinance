
const balance = 10000;

const trendData = [
    { name: 'Oct', balance: balance * 0.6 },
    { name: 'Nov', balance: balance * 0.75 },
    { name: 'Dec', balance: balance * 0.7 },
    { name: 'Jan', balance: balance * 0.85 },
    { name: 'Feb', balance: balance * 0.95 },
    { name: 'Mar', balance: balance }
];

const INITIAL_TRANSACTIONS = [
    { id: 1, date: '2024-03-01', description: 'Salary', amount: 4000, category: 'Income', type: 'income' },
    { id: 2, date: '2024-03-02', description: 'Groceries', amount: 150, category: 'Food', type: 'expense' },
    { id: 3, date: '2024-03-05', description: 'Netflix', amount: 15, category: 'Entertainment', type: 'expense' },
    { id: 4, date: '2024-03-10', description: 'Rent', amount: 900, category: 'Housing', type: 'expense' },
    { id: 5, date: '2024-03-12', description: 'Freelance', amount: 800, category: 'Income', type: 'income' },
    { id: 6, date: '2024-03-15', description: 'Restaurant', amount: 60, category: 'Food', type: 'expense' },
];
module.exports = {
    trendData,
    initialTransactions: INITIAL_TRANSACTIONS
};