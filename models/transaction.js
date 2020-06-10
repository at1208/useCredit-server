const mongoose =  require('mongoose');


const transactionSchema = new mongoose.Schema({
  beneficiaryName: {
        type: String,
        required: true
  },
  beneficiaryAcc: {
        type: Number,
        required:true
  },
  beneficiaryConfirmAcc: {
        type: Number,
        required:true
  },
  beneficiaryIfscCode:{
        type: String,
        required:true
  },
  beneficiaryAmount: {
        type: Number,
        required:true
  },
  beneficiaryPurpose:{
        type:String
  },
  paymentStatus: {
    type: String,
    default: "failed"
  },
  payment_id: {
    type: String,
    default: null
  },
  order_id: {
    type: String,
    default: null
  }
  },{ timestamps: true }
)

module.exports = mongoose.model('Transaction', transactionSchema);
