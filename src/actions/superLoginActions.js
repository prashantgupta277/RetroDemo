import * as types from './actionTypes';  
import superLoginApi from '../api/superLoginApi';

export function dosuperLogin(user) {

  return {
    type: types.DO_SUPER_LOGIN, 
    user
  };
}

export function dosuperLoginRes(user) {  
  return {
    type: types.DO_SUPER_LOGIN_RES, 
    user
  };
}

export function submit_Super_login(data) {
    return function(dispatch) {
      superLoginApi.doSuperLogin(data).then(res => {
        console.log(res)
        dispatch(dosuperLoginRes(res));    
      }).catch(error => {
        //  createNotification("error",res.errors[0].message);
          console.log(error);
      });
    };
}