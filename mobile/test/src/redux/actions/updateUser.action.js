import { UPDATE_USER_MONEY_DATA} from "./types";

const updateUserMoney = data => dispatch => {
  console.log("money: ------ " + data);
  dispatch(updateMoney(data));
}

const updateMoney = (data) => {
  return {
    type: UPDATE_USER_MONEY_DATA,
    payload: data
  };
}

export {
  updateUserMoney
}