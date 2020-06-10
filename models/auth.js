const mongoose =  require('mongoose');
const { ObjectId } = mongoose.Schema;


const userSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
 hashedOtp: {
    type: String,
    required: true
 },
 transactions:[{ type: ObjectId, ref: 'Transaction',unique: true }],
 orders:[{ type: ObjectId, ref: 'Order',unique: true}]
},{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema);
