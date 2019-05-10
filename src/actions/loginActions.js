import * as types from './actionTypes';  
import loginApi from '../api/loginApi';
// import { submit_profile } from '../actions/editProfileActions';

  export function doLogin(user) {
    return {
      type: types.DO_LOGIN, 
      user
    };
  }

  export function doLoginRes(user) {  
    return {
      type: types.DO_LOGIN_RES, 
      user
    };
  }
  export function doLoginError(user) {  
    return {
      type: types.DO_LOGIN_ERROR, 
      user
    };
  }

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

export function submit_login(data) {
    return function(dispatch) {
      loginApi.doLogin(data).then(res => {
        console.log(res)
        dispatch(doLoginRes(res));
        // dispatch(submit_profile());     
      }).catch(error => {
        dispatch(doLoginError("Invalid Login Id"))
        // console.log(JSON.stringify(error));
        console.log(error);
      });
    };
}


export function submit_Register(data) {
  return function(dispatch) {
    loginApi.doRegister(data).then(user => {
      dispatch(doRegisterRes(user));
      // dispatch(submit_profile());     
    }).catch(error => {
      console.log(error);
    });
  };
}


export function getCompany(data) {
  
    return {
      type: types.COMPANY_LIST, 
      data
    };
  }
  
  export function getCompanyRes(user) {  
    return {
      type: types.COMPANY_LIST_RES, 
      user
    };
  }

export function fetch_CompanyList(data) {
    return function(dispatch) {
      loginApi.fetchCompnay(data).then(res => {
        dispatch(getCompanyRes(res));  
      }).catch(error => {
        console.log(error);
      });
    };
}


export function joinRetro(data) {  
  return {
    type: types.GUEST_JOIN_RETRO, 
    data
  };
}

export function joinRetroRes(user) {  
  return {
    type: types.GUEST_JOIN_RETRO_RES, 
    user
  };
}

export function doJoinRetro(data) {
  return function(dispatch) {
    loginApi.joinRetro(data).then(res => {
      dispatch(getCompanyRes(res));  
    }).catch(error => {
      console.log(error);
    });
  };
}