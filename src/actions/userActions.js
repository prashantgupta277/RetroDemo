import * as types from './actionTypes';  
import userApi from '../api/usersAPI';
import { createNotification} from './../commonComponent/notificationbox/index';

export function findUsersList(data) {

  return {
    type: types.FIND_USERS_LIST, 
    data
  };
}

export function findusersListRes(data) {  
  return {
    type: types.FIND_USERS_LIST_RES, 
    data
  };
}


export function getFindUserListing(data) {
  return function(dispatch) {
    userApi.getFindUsersList(data).then(res => {
      dispatch(findusersListRes(res));
    }).catch(error => {
      console.log(error);
    });
  };
}


export function getUsersList(data) {
  
    return {
      type: types.ALL_USERS_LIST, 
      data
    };
  }
  
  export function usersListRes(data) {  
    return {
      type: types.ALL_USERS_LIST_RES, 
      data
    };
  }
  
  
  export function getAllUserListing(data) {
    return function(dispatch) {
      userApi.getUsersList(data).then(res => {
        dispatch(usersListRes(res));
      }).catch(error => {
        console.log(error);
      });
    };
  }


export function doUpdateProfile(data) {

  return {
    type: types.DO_UPDATE_USERS, 
    data
  };
}

export function doUpdateProfileRes(data) {  
  return {
    type: types.DO_UPDATE_USERS_RES, 
    data
  };
}

export function updateUserProfile(data) {
  return function(dispatch) {
    userApi.doUpdateProfile(data).then(res => {
      if(res.data){
        createNotification("success","Update Successfully");
        dispatch(doUpdateProfileRes(res));
      }else{
        createNotification("error",res.errors[0].message);
      }
      
    }).catch(error => {
      console.log(error);
    });
  };
}



export function userDetail(id) {
  return {
    type: types.GET_SINGLE_USER, 
    id
  };
}

export function userDetailRes(data) {  
  return {
    type: types.GET_SINGLE_USER_RES, 
    data
  };
}

export function getUserDetail(id) {
  return function(dispatch) {
    userApi.userDetail(id).then(res => {
      if(res.data){
        dispatch(userDetailRes(res));
      }else{
        createNotification("error",res.errors[0].message);
      }
    }).catch(error => {
      console.log(error);
    });
  };
}

export function userPageCount(id) {
  return {
    type: types.GET_USER_COUNT, 
    id
  };
}

export function userPageCountRes(data) {  
  return {
    type: types.GET_USER_COUNT_RES, 
    data
  };
}

export function getUserPageCount(id) {
  return function(dispatch) {
    userApi.getUserPageCountList(id).then(res => {
      dispatch(userPageCountRes(res));
    }).catch(error => {
      console.log(error);
    });
  };
}

export function userDelete(id) {
  return {
    type: types.DELETE_USER, 
    id
  }
}

export function userDeleteRes(data) {  
  return {
    type: types.DELETE_USER_RES, 
    data
  }
}

export function deleteUserFromList(id) {
  return function(dispatch) {
    userApi.userDelete(id).then(res => {
      if(res.data){
        window.location.href="/users";
        dispatch(userDeleteRes(res));
      }
      if(res.errors){
          createNotification("error",res.errors[0].message);
      }
    }).catch(error => {
      console.log(error);
    });
  };
}

export function createUser(user) {
  return {
    type: types.CREATE_USER, 
    user
  };
}

export function createUserRes(user) {  
  return {
    type: types.CREATE_USER_RES, 
    user
  };
}


export function submit_User(data) {
  return function(dispatch) {
    userApi.createUsersData(data).then(user => {
      if(user.data){
        dispatch(createUserRes(user));
        alert('Add Successfully')
        window.location.href="/users"
      }
      if(user.errors){
          createNotification("error",user.errors[0].message);
      }
    }).catch(error => {
      console.log(error);
    });
  };
}

export function doChangepwd(data) {
  
    return {
      type: types.CHANGE_PWD, 
      data
    };
  }
  
  export function doChangepwdRes(data) {  
    return {
      type: types.CHANGE_PWD_RES, 
      data
    };
  }
  
  export function updatePassword(data) {
    return function(dispatch) {
      userApi.ChangePassword(data).then(res => {
        if(res.data){
          createNotification("success","Update Password Successfully");
          dispatch(doChangepwdRes(res));
          window.location.href="/myprofile"
        }
        if(res.errors){
          createNotification("error",res.errors[0].message);
        }
        
      }).catch(error => {
        console.log(error);
      });
    };
  }





  export function accountInfoDetail(data) {
  
    return {
      type: types.GET_ACCOUNT_DETAIL, 
      data
    };
  }
  
  export function accountInfoDetailRes(data) {  
    return {
      type: types.GET_ACCOUNT_DETAIL_RES, 
      data
    };
  }
  
  export function getAccountInfoDetail(data) {
    return function(dispatch) {
      userApi.accountInfoDetail(data).then(res => {
        if(res.data){
          dispatch(accountInfoDetailRes(res));
        }
        if(res.errors){
          createNotification("error",res.errors[0].message);
        }
        
      }).catch(error => {
        console.log(error);
      });
    };
  }









