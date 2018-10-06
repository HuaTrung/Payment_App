// module.exports = (req,res, nexmoConfig) => {
//   nexmoConfig.message.sendSms(
//     'Nexmo', // it just a free
//     '84932311434',
//     'hello VN',
//     {
//       type: 'unicode'
//     },
//     (err, response) => {
//       if(err) {
//         throw err;
//       } else if(response.messages[0].status != '0') {
//         console.error(response);
//         throw 'Nexmo returned back a non-zero status';
//       } else {
//         res.json({msg: 'gg'});
//         console.log(response);
//       }

//     }  
//   );
// };


module.exports = (req,res) => {

};