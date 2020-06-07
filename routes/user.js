const express = require('express');
const router = express.Router();

//controllers
const { sendOTP, verifyOTP,signout } = require('../controllers/user')

// validators
const { runValidation } = require('../validators');
const { userValidator } = require('../validators/user');


router.post('/send-otp', sendOTP);
router.post('/verify-otp',verifyOTP);
router.get('/signout', signout)

module.exports = router;
