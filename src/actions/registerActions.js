import * as types from './actionTypes';  
import registerApi from '../api/registerApi';
// import { submit_profile } from '../actions/editProfileActions';

export function doRegister(data) {

  return {
    type: types.DO_SIGNUP, 
    data
  };
}

export function doRegisterRes(user) {  
  return {
    type: types.DO_SIGNUP_RES, 
    user
  };
}

export function submit_Register(data) {
    return function(dispatch) {
      registerApi.doRegister(data).then(user => {
        dispatch(doRegisterRes(user));
        // dispatch(submit_profile());     
      }).catch(error => {
        console.log(error);
      });
    };
}