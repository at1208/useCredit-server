const express = require('express');
const router = express.Router();

//controllers
const { createTransaction, paymentVerification, getTransactions} = require('../controllers/transaction')

// validators
const { runValidation } = require('../validators');
const { transactionValidator } = require('../validators/transaction');


router.post('/create-order/:amount',createTransaction);
router.post('/payment-verification/:order_id/:payment_id/:razorpay_signature', paymentVerification);
router.get('/transactions/:mobile', getTransactions)
module.exports = router;
