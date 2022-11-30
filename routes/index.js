const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');

router.post('/transaction/add',TransactionController.addTransaction);
router.get('/transaction/get',TransactionController.getTransactions);
router.delete('/transaction/delete/:id',TransactionController.deleteTransaction);
router.put('/transaction/update/:id',TransactionController.updateTransaction);
module.exports = router