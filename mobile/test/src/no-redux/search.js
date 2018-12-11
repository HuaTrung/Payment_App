import axios from 'axios';
import GLOBAL from "../config";

const searchUserByPhone = (phone) => new Promise((resolve,reject) => {
    axios.get(GLOBAL.HostName +"/transaction/search/user/"+phone)
    .then(res => {
        resolve ({listUser:res.data});
    }) 
    .catch( err => reject(err));
    })
;

export {searchUserByPhone};