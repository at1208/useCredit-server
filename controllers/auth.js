const User = require('../models/auth');

var randomstring = require("randomstring");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const client = require('twilio')(process.env.TWILLIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);

const sendSMS = (smsTo, otp) => {
  client.messages
    .create({
       body: `Do not share this one time password with anyone -${otp}`,
       from: '+12052939291',
       to: smsTo
     })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err))
}


module.exports.sendOTP = async (req,res) => {
   const { mobileNumber } = req.body
   const otp = await randomstring.generate({
                     length: 6,
                     charset: 'numeric' });

   const salt = await bcrypt.genSalt(10)
   const hashedOtp = await bcrypt.hash(otp,salt);

   const checkUserIsExisting = await User.findOne({ mobileNumber });

 if(!checkUserIsExisting){
      const newUser = User({
        mobileNumber,
        hashedOtp
      })
    await newUser.save((err,result) => {
      if(err){
        return res.status(400).json({
           message: err
        })
      }else{
        sendSMS(mobileNumber,otp)
        return res.status(200).json({
          message: `OTP has been sent to ${mobileNumber}`
        })
      }
    })
  }else{
   await User.findByIdAndUpdate(checkUserIsExisting._id, { hashedOtp: hashedOtp }).exec((err,result) => {
     if(err){
       return res.status(400).json({
         error:err
       })
     } else{
        sendSMS(mobileNumber,otp)
       return res.status(200).json({
         message:`OTP has been sent to ${mobileNumber}`
       })
     }
   });
  }
 }

 module.exports.verifyOTP = async (req,res) => {
   const { mobileNumber, otp } = req.body
   const user = await User.findOne({ mobileNumber})
   if(!user){
     return res.status(400).json({
       res: 'not ok',
       message: "Invalid OTP"
     })
   }else{
     const hashedOtp = await user.hashedOtp
     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
     res.cookie('token', token, { expiresIn: '1d' });
     await bcrypt.compare(otp, hashedOtp, (err,result) => {
        if(result==true){
          return res.status(200).json({
            token,
            user: {
              mobile: mobileNumber
            },
            message: 'Verified successfully',
            res: 'ok'
          })
        }else{
          return res.status(400).json({
            message: 'Invalid OTP',
            res: 'not ok'
          })
        }

     })
   }
 }


 exports.signout = (req, res) => {
     res.clearCookie('token');
     res.json({
         message: 'Signout success'
     });
 };

 exports.requireSignin = expressJwt({
     secret: process.env.JWT_SECRET // req.user
 });


 exports.authMiddleware = (req, res, next) => {
     const authUserId = req.user._id;
     User.findById({ _id: authUserId }).exec((err, user) => {
         if (err || !user) {
             return res.status(400).json({
                 error: 'User not found'
             });
         }
         req.profile = user;
         next();
     });
 };
