import { Router } from 'express';
import { createTransaction, deleteTransaction, getAllTransactions, getLoggedInUserTransactions, getTransactionById, getTransactionsByUser, updateTransaction } from '../controllers/transaction.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.get('/user',authenticate, getLoggedInUserTransactions);
router.get('/user/:id', getTransactionsByUser);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;