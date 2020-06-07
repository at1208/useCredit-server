const { check } = require('express-validator');

exports.transactionValidator = [
    check('beneficiaryName')
        .not()
        .isEmpty()
        .withMessage('Beneficiary name is required'),

    check('accountNumber')
        .not()
        .isEmpty()
        .withMessage('Account Number is required'),

    check('ifscCode')
        .not()
        .isEmpty()
        .withMessage('IFSC code is required'),

    check('amount')
        .not()
        .isEmpty()
        .withMessage('Amount is required'),

];
