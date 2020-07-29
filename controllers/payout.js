const axios = require('axios');

module.exports.payout = (req, res) => {
 axios({
   method:"POST",
   url:"https://api.razorpay.com/v1/contacts",
   headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `rzp_test_UThbRCe8RuN41P:TFpFZpP8Jb4llytteylYSTpn`
        },
   data:{
     name:"Aman",
     contact:"9140283163"
      }
  }).then(function(response){
    res.json({response})
  })
  .catch((err) => {
   console.log(err)
  })
}
