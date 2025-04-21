import Transaction from "../models/transaction.model.js";

// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const { user, ClaimedAmount, passedAmount, remark } = req.body;
    
    if (!user || !ClaimedAmount || !passedAmount) {
      return res.status(400).json({ 
        success: false, 
        message: "User, ClaimedAmount, and passedAmount are required fields" 
      });
    }

    const newTransaction = new Transaction({
      user,
      ClaimedAmount,
      passedAmount,
      remark: remark || "",
    });

    const savedTransaction = await newTransaction.save();
    
    res.status(201).json({
      success: true,
      data: savedTransaction,
      message: "Transaction created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create transaction",
    });
  }
};

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("user", "-password");
    
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch transactions",
    });
  }
};

// Get transactions by user ID
export const getTransactionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const transactions = await Transaction.find({ user: userId }).populate("user", "-password");
    
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch user transactions",
    });
  }
};

// Get a single transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const transaction = await Transaction.findById(id).populate("user", "name email");
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }
    
    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch transaction",
    });
  }
};

// Update a transaction
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { ClaimedAmount, passedAmount, remark } = req.body;
    
    const transaction = await Transaction.findById(id);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }
    
    // Update fields if provided
    if (ClaimedAmount !== undefined) transaction.ClaimedAmount = ClaimedAmount;
    if (passedAmount !== undefined) transaction.passedAmount = passedAmount;
    if (remark !== undefined) transaction.remark = remark;
    
    const updatedTransaction = await transaction.save();
    
    res.status(200).json({
      success: true,
      data: updatedTransaction,
      message: "Transaction updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update transaction",
    });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    
    const transaction = await Transaction.findById(id);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }
    
    await Transaction.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete transaction",
    });
  }
};

// Get transaction statistics
export const getTransactionStats = async (req, res) => {
  try {
    const totalTransactions = await Transaction.countDocuments();
    const totalClaimedAmount = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: "$ClaimedAmount" } } }
    ]);
    const totalPassedAmount = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: "$passedAmount" } } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        totalTransactions,
        totalClaimedAmount: totalClaimedAmount[0]?.total || 0,
        totalPassedAmount: totalPassedAmount[0]?.total || 0,
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch transaction statistics",
    });
  }
};