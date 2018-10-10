const axios= require('axios');
var store = require('../store');
const loadUser = () => dispatch => {
    axios.get('/transaction/usertouser/listUserToUser')
      .then(function (response) {
        // handle success
        let tempList = [];
        for(var i =0;i<response.data.length;i++){
            var object = {
                Name: response.data[i].Name,
                Target: response.data[i].Target,
                Money: response.data[i].Money,
                Description: response.data[i].Description,
                DateGet: response.data[i].DateGet,
                UrlFull: response.data[i].UrlFull
            };
            tempList.push(object);
        }
        // console.log(empObj);
        // var {dispatch}=this.props;
        dispatch({ // submit action => to reducer
            type: 'LOAD_LIST_USERTOUSER',
            item: tempList
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
}

export {loadUser};