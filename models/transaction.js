const mongoose =  require('mongoose');

const userSchema = new mongoose.Schema({
beneficiaryName: {
        type: String,
        required: true
},
accountNumber: {
        type: Number,
        required:true
},
ifscCode:{
        type: String
},
amount: {
        type: Number
},
purpose:{
        type:String
}
},{ timestamps: true }
)

module.exports = mongoose.model('Transaction', userSchema);
