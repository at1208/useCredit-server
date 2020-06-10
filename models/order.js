const mongoose =  require('mongoose');
const { ObjectId } = mongoose.Schema;


const orderSchema = new mongoose.Schema({
  amount: {
    type: Number
  },
  amount_due: {
    type: Number
  },
  currency: {
    type: String
  },
  entity:{
    type: String
  },
  notes:[],
  receipt: {
    type: String
  },
  order_id: {
    type: String
  },
  payment_status: {
    type: Boolean,
    default: false
  },
  payment_id: {
    type: String,
    default: null
  }
},{ timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema);
