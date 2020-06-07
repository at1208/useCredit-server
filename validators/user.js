const { check } = require('express-validator');

exports.userValidator = [
    check('mobileNumber')
        .not()
        .isEmpty()
        .withMessage('mobile number is required')
];
