import axios from 'axios';
import GLOBAL from "../config";
import {queryUserPhone} from "../realm/userQueries"
const searchUserByPhone = (phone) => new Promise((resolve,reject) => {
    axios.get(GLOBAL.HostName +"/transaction/search/user/"+phone)
    .then(res => {
        resolve ({listUser:res.data});
    }) 
    .catch( err => reject(err));
    })
;
const searchTransaction = () => new Promise((resolve,reject) => {
    axios.get(GLOBAL.HostName +"/transaction/search/loadTransaction/"+queryUserPhone())
    .then(res => {
        resolve ({listTransaction:res.data});
    }) 
    .catch( err => reject(err));
    })
;
const searchPromotion = () => new Promise((resolve,reject) => {
    axios.get(GLOBAL.HostName +"/transaction/search/loadPromotion")
    .then(res => {
        resolve ({listPromotion:res.data});
    }) 
    .catch( err => reject(err));
    })
;
export {searchUserByPhone,searchTransaction,searchPromotion};