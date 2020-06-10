const Transaction = require('../models/transaction');
const Order = require('../models/order');
const User = require('../models/auth');
const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

var instance = new Razorpay({
 key_id: process.env.RAZORPAY_KEY_ID,
 key_secret: process.env.RAZORPAY_KEY_SECRET
});

module.exports.createTransaction = async (req,res) => {
const {beneficiaryName,
       beneficiaryAcc,
       beneficiaryAmount,
       beneficiaryConfirmAcc,
       beneficiaryIfscCode,
       beneficiaryPurpose,
       userContactNumber } = req.body

  var options = {
    amount: req.params.amount*100,
    currency: "INR",
    receipt: await uuidv4(),
    payment_capture: '1'
  };
  instance.orders.create(options, async function(err, order) {
    if(err){
      return res.status(400).json({
        error: "Failed to create order"
      })
    }
   const newTransaction = Transaction({
              beneficiaryName,
              beneficiaryAcc,
              beneficiaryAmount,
              beneficiaryConfirmAcc,
              beneficiaryIfscCode,
              beneficiaryPurpose
            })

    await newTransaction.save(async (err, trans) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      const newOrder = Order({
                        amount: order.amount,
                        amount_due: order.amount_due,
                        currency: order.currency,
                        entity: order.entity,
                        notes: order.notes,
                        receipt: order.receipt,
                        order_id: order.id  })

      await newOrder.save(async (err, result) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }

     User.findOneAndUpdate({mobileNumber: userContactNumber}, {$push: {transactions: trans._id, orders: result._id}}, async (err, result) => {
         if(err){
           return res.status(400).json({
             error: err
           })
         }
          Transaction.findByIdAndUpdate(trans._id,{order_id: order.id}, { new: true })
           .exec((err, result) => {
             if(err){
               return res.status(400).json({
                 error: err
               })
             }
             return res.status(200).json({
                order_id: order.id,
                res: "ok",
                message: "Order created successfully"
               })
             })
         })
      });
    })
  });
}




// Verification
 module.exports.paymentVerification =  async (req,res) => {
   const {payment_id} = req.params;
   const {order_id} = req.params;
   const {razorpay_signature} = req.params;


var generatedSignature = crypto
                        .createHmac("SHA256",process.env.RAZORPAY_KEY_SECRET)
                        .update(order_id + "|" + payment_id)
                        .digest("hex");

 var isSignatureValid = generatedSignature == razorpay_signature;
 if(isSignatureValid){

 const data = await Transaction.findOne({ order_id: req.params.order_id})
   Transaction.findOneAndUpdate({ order_id: req.params.order_id }, {payment_id: req.params.payment_id, paymentStatus:"in process"},{ new: true }).exec((err, result) => {
     if(err){
       return res.status(400).json({
         error: err
       })
     }
     return res.status(200).json({
       status: "successful payment"
     })
   })
 }else{
   return res.status(400).json({
     status: "payment failed"
   })
 }
}


//FETCH ALL TRANSACTION OF USER
module.exports.getTransactions = async (req,res) => {
  const  user = await User.findOne({mobileNumber: req.params.mobile })
   .populate('transactions', 'beneficiaryName beneficiaryAcc beneficiaryIfscCode beneficiaryAmount beneficiaryPurpose createdAt paymentStatus',null, { sort: { 'createdAt': -1 } })

   .select('mobileNumber')
   .exec((err,result) => {
     if(err){
       return res.status(400).json({
         err: err
       })
     }
     res.status(200).json({
       result
     })
  })
}
