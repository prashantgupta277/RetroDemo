import * as types from './actionTypes';  
import myRetroApi from '../api/myRetroAPI';
import { createNotification} from '../commonComponent/notificationbox/index';


export function getRetroList(data) {
  return {
    type: types.RETRO_LIST, 
    data
  };
}

export function retroListRes(data) {  
  return {
    type: types.RETRO_LIST_RES, 
    data
  };
}

export function getRetroListing(data) {
  return function(dispatch) {
    myRetroApi.getRetroList(data).then(res => {
      console.log(res)
      dispatch(retroListRes(res));
    }).catch(error => {
      console.log(error);
    });
  };
}

export function retroDetail(id) {
  return {
    type: types.GET_SINGLE_RETRO, 
    id
  };
}

export function retroDetailRes(data) {  
  return {
    type: types.GET_SINGLE_RETRO_RES, 
    data
  };
}

export function getRetroDetail(id) {
  return function(dispatch) {
    myRetroApi.retroDetail(id).then(res => {
      dispatch(retroDetailRes(res));
      // console.log(res)
    }).catch(error => {
      console.log(error);
    });
  };
}

export function doUpdateRetro(data) {
  
    return {
      type: types.DO_UPDATE_RETRO, 
      data
    };
  }
  
  export function doUpdateRetroRes(data) {  
    return {
      type: types.DO_UPDATE_RETRO_RES, 
      data
    };
  }
  
  export function updateRetro(data) {
    return function(dispatch) {
      myRetroApi.doUpdateRetro(data).then(res => {
        alert("Update Successfully")
        
        dispatch(doUpdateRetroRes(res));
      }).catch(error => {
        console.log(error);
      });
    };
  }


  /* Start Retro */
  export function doStartRetro(data) {
    return {
      type: types.DO_START_RETRO, 
      data
    };
  }
  
  export function startRetroRes(data) {  
    return {
      type: types.DO_START_RETRO_RES, 
      data
    };
  }
  
  export function retroStarted(data) {
    return function(dispatch) {
      myRetroApi.doStartRetro(data).then(res => {
        console.log(res)
        if(res.data){

          let data1 = localStorage.getItem('logindata');
          let values1 = JSON.parse(data1);
          // console.log(values1.id)
          // console.log(res.data)
          let getResponse=res.data.startRetro;
          console.log(getResponse)
          console.log(values1.id==getResponse.startedBy)
          if(values1.id==getResponse.startedBy){
              localStorage.setItem("isAdminCheck","true")
          }else{
              localStorage.setItem("isAdminCheck","false")
          }

          window.location.href="/startretro"+"/"+getResponse.roomCode+"/"+getResponse.id;
        }
        // dispatch(startRetroRes(res));
        // console.log(res)
      }).catch(error => {
        console.log(error);
      });
    };
  }



   /* Start Retro */
   export function toJoinRetro(data) {
    return {
      type: types.DO_JOIN_RETRO, 
      data
    };
  }
  
  export function toJoinRetroRes(data) {  
    return {
      type: types.DO_JOIN_RETRO_RES, 
      data
    };
  }
  
  export function doJoinRetro(data) {
    return function(dispatch) {
      myRetroApi.toJoinRetro(data).then(res => {
          dispatch(toJoinRetroRes(res));
      }).catch(error => {
        console.log(error);
      });
    };
  }



  export function deleteRetro(data) {
    return {
      type: types.RETRO_DELETE, 
      data
    };
  }
  
  export function deleteRetroRes(data) {  
    return {
      type: types.RETRO_DELETE_RES, 
      data
    };
  }
  
  export function doDeleteRetro(data) {
    return function(dispatch) {
      myRetroApi.deleteRetro(data).then(res => {
        console.log(res.data)
        if(res.data){
          window.location.href="/myretro";
          dispatch(deleteRetroRes(res));
        }
        if(res.errors){
          createNotification("error",res.errors[0].message)
        }
       
      }).catch(error => {
        console.log(error);
      });
    };
  }


  




