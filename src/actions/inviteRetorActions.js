import * as types from './actionTypes';  
import inviteRetroApi from '../api/inviteRetroAPI';
import { createNotification} from '../commonComponent/notificationbox/index';


export function doInviteRetro(data) {

  return {
    type: types.INVITE_RETRO, 
    data
  };
}

export function doInviteRetroRes(data) {  
  return {
    type: types.INVITE_RETRO_RES, 
    data
  };
}


export function submit_InviteRetro(data,sendPayloadContorl) {
    return function(dispatch) {
      inviteRetroApi.doInvite(data.payload).then(res => {
        dispatch(doInviteRetroRes(res));
       
        dispatch(SendEmailInviteUser(sendPayloadContorl)) 
      }).catch(error => {
        console.log(error);
      });
    };
}

export function  doStartedRetro(sendPayloadContorl){
  let sendRequest={
    "operationName":null,
    "variables":{},
    "query":"mutation {\n  startRetro(retroId: \""+sendPayloadContorl.retroid+"\", userId: \""+sendPayloadContorl.userid+"\") {\n    id\n  roomCode\n   inviteToJointRetros {\n      id\n    }\n    startedBy\n  }\n}\n"}
    return function(dispatch) {
      inviteRetroApi.doInviteUsers(sendRequest).then(res => {
        if(res.data){

          let data1 = localStorage.getItem('logindata');
          let values1 = JSON.parse(data1);
          let getResponse=res.data.startRetro;
         
          if(values1.id===getResponse.startedBy){
              localStorage.setItem("isAdminCheck","true")
          }else{
              localStorage.setItem("isAdminCheck","false")
          }

          window.location.href="/startretro"+"/"+getResponse.roomCode+"/"+getResponse.id;
        }

      }).catch(error => {
        console.log(error);
      });
    };
}


export function  SendEmailInviteUser(sendPayloadContorl){
  let sendRequest={
    "operationName":null,
    "variables":{},
    "query":"{\n  sendRetroInvitedUser(retroId: \""+sendPayloadContorl.retroid+"\", userId: \""+sendPayloadContorl.userid+"\") {\n    id\n    sprintNumber\n    repeatEvery\n    roomCode\n    startDate\n    startTime\n    projects {\n      id\n      projectName\n    }\n  }\n}\n"
  }
    return function(dispatch) {
      inviteRetroApi.sendMailTioInvite(sendRequest).then(res => {
        if(res.data){
          console.log('sendmail');
          if(sendPayloadContorl.pageStatus){
            window.location.href="/myretro";
          }else{
            dispatch(doStartedRetro(sendPayloadContorl))
          }    
        }
        if(res.errors){
          console.log('mailNotSend')
          createNotification("error",res.errors[0].message);
        }

      }).catch(error => {
        console.log(error);
      });
    };
}



export function doInviteUsers(data) {

  return {
    type: types.INVITE_USER_RETRO, 
    data
  };
}

export function doInviteUsersRes(data) {  
  return {
    type: types.INVITE_USER_RETRO_RES, 
    data
  };
}


export function InviteUsersRetro(data) {
    return function(dispatch) {
      inviteRetroApi.doInviteUsers(data).then(res => {
        dispatch(doInviteUsersRes(res));  
      }).catch(error => {
        console.log(error);
      });
    };
}

export function deleteUsers(data) {

  return {
    type: types.INVITE_USER_DELETE, 
    data
  };
}

export function deleteUsersRes(data) {  
  return {
    type: types.INVITE_USER_DELETE_RES, 
    data
  };
}


export function deletedUsers(data) {
    return function(dispatch) {
      inviteRetroApi.doDeleteUsers(data).then(res => {
        dispatch(deleteUsersRes(res));  
      }).catch(error => {
        console.log(error);
      });
    };
}
export function getAllInvite(data) {
  
    return {
      type: types.All_INVITE, 
      data
    };
  }
  
  export function getAllInviteRes(data) {  
    return {
      type: types.All_INVITE_RES, 
      data
    };
  }

  export function getInvite(data) {
    return function(dispatch) {
      inviteRetroApi.getAllInvitelist(data).then(res => {
        // console.log(res)
        dispatch(getAllInviteRes(res));
      }).catch(error => {
        console.log(error);
      });
    };
// }

  }

  export function updateRetroInfo(data) {
  
    return {
      type: types.DO_UPDATE_RETRO, 
      data
    };
  }

  export function updateRetro(data) {
    return function(dispatch) {
      inviteRetroApi.updateRetroInfo(data).then(res => {
        console.log(res)
        // dispatch(getAllInviteRes(res));
      }).catch(error => {
        console.log(error);
      });
    };
// }
    
  }


