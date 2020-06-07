const Transaction = require('../models/transaction');
const Razorpay = require('razorpay');

var instance = new Razorpay({
 key_id: process.env.RAZORPAY_KEY_ID,
 key_secret: process.env.RAZORPAY_KEY_SECRET
});

module.exports.pay = async (req,res) => {
 const {payment_id } = req.params;
 const amount = Number(req.params.amount);
 instance.payments.capture(payment_id, amount).then((data) => {
   res.json(data);
 }).catch((error) => {
   res.json(error);
 });

    // const {beneficiaryName,
    //        accountNumber,
    //        ifscCode,
    //        amount,
    //        purpose
    // } = req.body
    // const newTransaction = new Transaction({
    //                         beneficiaryName,
    //                         accountNumber,
    //                         ifscCode,
    //                         amount,
    //                         purpose
    // })
    // await newTransaction.save((err,result) => {
    //   if(err){
    //     res.status(400).json({
    //       error: err
    //     })
    //   }else{
    //     res.status(200).json({
    //       message: "ok"
    //     })
    //   }
    // })
}
