import axios from 'axios';
import GLOBAL from "../config";
import {queryUserPhone,queryUserName} from "../realm/userQueries"
const rechargeMoney = (money) => new Promise((resolve,reject) => {
    var phone=queryUserPhone();
    var name=queryUserName();
    axios.post(GLOBAL.HostName +"/transaction/recharge", {
        name,
        phone,
        money
      },  {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => {
        resolve ({value:res.data});
    }) // do later
    .catch( err => reject(err));
    })
;

export {rechargeMoney};