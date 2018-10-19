const registerService= require('../services/register.service');
const User = require('the_root/MongoModel/app/user');


function logInfo(info, data,res) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  switch (info) {       
    case 'REGISTER_SUCCESS':
      api = { 
        status: 0,
        error: {},
        user:data
      };
      return res.status(200).json(api); 
  }
}

const verifyCodeController = (req,res) => { 
  let { phone } = req.body;
  //console.log(phone);
  registerService.beforeSendToken(phone, (info,data) => logInfo(info, data, res));
}

module.exports =  { 
  verifyCodeController
}