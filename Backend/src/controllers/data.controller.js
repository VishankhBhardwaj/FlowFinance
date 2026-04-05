const Data = require('../../data')
exports.fetchData = (req, res) => {
    const balance = req.body.balance;
    const trendData = [
    { name: 'Oct', balance: balance * 0.6 },
    { name: 'Nov', balance: balance * 0.75 },
    { name: 'Dec', balance: balance * 0.7 },
    { name: 'Jan', balance: balance * 0.85 },
    { name: 'Feb', balance: balance * 0.95 },
    { name: 'Mar', balance: balance }
    ];

    return res.status(200).json({
        msg: "data fetched successfully",
        data: trendData
    });
}
exports.uploadData = (req, res) => {
    const { date, description, amount, category, time } = req.body;

    if (!date || !description || amount == null || !category || !time) {
        return res.status(400).json({
            msg: "All fields are required"
        });
    }

    const newTransaction = {
        date,
        description,
        amount: Number(amount),
        category,
        time
    };


    Data.initialTransactions.push(newTransaction);

    return res.status(201).json({
        msg: "data added successfully",
        data: newTransaction,
        initial_transactions: Data.initialTransactions
    });
};

exports.transactions = (req, res) => {
    return res.status(200).json({
        msg: "data fetched successfully",
        initial_transactions: Data.initialTransactions
    });
};
    
