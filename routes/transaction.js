const express = require('express');
const router = express.Router();

//controllers
const { pay } = require('../controllers/transaction')

// validators
const { runValidation } = require('../validators');
const { transactionValidator } = require('../validators/transaction');


router.get('/pay/:payment_id/:amount',pay);


module.exports = router;
