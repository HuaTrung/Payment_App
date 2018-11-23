import axios from 'axios';
import GLOBAL from "../config";

const rechargeMoney = (phone,money) => new Promise((resolve,reject) => {
    axios.post(GLOBAL.HostName +"/transaction/recharge", {
        phone,
        money
      },  {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => {
        resolve ({value:res.data.money});
    }) // do later
    .catch( err => reject(err));
    })
;

export {rechargeMoney};