import axios from 'axios';
import GLOBAL from "../config";

const serachUser = (key) => new Promise((resolve,reject) => {
    axios.post(GLOBAL.HostName +"/transaction/search/user", {
        key
      },  {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => {
        resolve ({value:res.data.listUser});
    }) // do later
    .catch( err => reject(err));
    })
;

export {serachUser};