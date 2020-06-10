const { check } = require('express-validator');

exports.transactionValidator = [
    check('beneficiaryName')
        .not()
        .isEmpty()
        .withMessage('Beneficiary name is required'),

    check('beneficiaryAcc')
        .not()
        .isEmpty()
        .withMessage('Account Number is required'),

    check('beneficiaryConfirmAcc')
        .not()
        .isEmpty()
        .withMessage('Account Number is required'),

    check('beneficiaryIfscCode')
        .not()
        .isEmpty()
        .withMessage('IFSC code is required'),

    check('beneficiaryAmount')
        .not()
        .isEmpty()
        .withMessage('Amount is required'),

];
