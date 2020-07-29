const express = require('express');
const router = express.Router();

//controllers
const { payout } = require('../controllers/payout')

// validators
const { runValidation } = require('../validators');
const { transactionValidator } = require('../validators/transaction');


router.post('/payout',payout);
module.exports = router;
