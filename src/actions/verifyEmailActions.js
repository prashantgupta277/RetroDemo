import * as types from './actionTypes';  
import verifyEmailApi from '../api/verifyEmailApi';
import { createNotification} from './../commonComponent/notificationbox/index';

export function verifyDetail(data) {
  
    return {
      type: types.DO_VERIFICATION, 
      data
    };
  }
  
  export function verifyDetailRes(user) {  
    return {
      type: types.DO_VERIFICATION_RES, 
      user
    };
  }

export function getVerifyEmail(data) {
    return function(dispatch) {
      verifyEmailApi.doLoginVerification(data).then(res => {
        console.log(res)
        if(res.data){
          dispatch(verifyDetailRes(res));
        }
        if(res.errors){
          createNotification("error",res.errors[0].message);
        }
      }).catch(error => {
        console.log(error);
      });
    };
}