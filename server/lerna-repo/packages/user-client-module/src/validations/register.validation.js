const isEmpty = require('./is-empty.validate');

const Validator = require('validator');

/**
 * @description Check the error when user client register accoutn
 * @param {Object} data : The response data
 */
module.exports = (data) => {
  
  // store and return all handle error
  let errors = {};

  // Check  user name is empty
  if(!Validator.isEmpty(data.username)) {

  }
  
  // Check email is invalid
  if(!Validator.isEmail(data.email)) {

  }

  // Check email is empty
  if(!Validator.isEmpty(data.email)) {

  }

  // Check phone is empty 
  if(!Validator.isEmpty(data.phone)) {

  }

  // Check 

  // Check verify number
  if(!Validator.isEmpty(data.verifyNumber)) {
  
  }



}