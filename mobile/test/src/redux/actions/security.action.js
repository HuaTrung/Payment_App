import { KEY_BOARD_CLICK, KEY_BOARD_DELETE_CLICK } from "./types";


const onKeyboardButtonClick = key => dispatch => {
  dispatch (keuButton(key));
}

const onKeyboardButtonDeleteClick = () => dispatch => {
  dispatch (delButton());
};

const keuButton = key => {
  return {
    type: KEY_BOARD_CLICK,
    payload: key
  };
}

const delButton = () => {
  return {
    type: KEY_BOARD_DELETE_CLICK,
  };
}


export {
  onKeyboardButtonClick, onKeyboardButtonDeleteClick
}