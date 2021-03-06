import axios from 'axios';
import GLOBAL from "../config";
import { insertUserLogin } from "../realm/userQueries";
import isEmpty from '../validations/is-empty.validate';

const updateInformationUser = dataInput  => new Promise((resolve, reject) => {
 
    // check data not empty and validate email / phone.
    // sent error to user

    const date = new Date(dataInput.birthday);
    const milliseconds =  date.getTime();
    dataInput = { ...dataInput, birthday: milliseconds };

    axios.post(GLOBAL.HostName +"/app/user/update-information-user", dataInput)
    .then( response => {
        const { data } = response;
        if(data.status == 0 && !isEmpty(data.user)) {

            // update in local with realm
            insertUserLogin(data.user).then(() => 
                resolve({type: true})
            ).catch((err)=> console.log(err)); 
        }
        else if (data.status == 1 &&  !isEmpty(data.errors)) {
            resolve({type: false, errors: data.errors});
        }

    })
    .catch((err) => { reject(err) });

});




export { updateInformationUser };