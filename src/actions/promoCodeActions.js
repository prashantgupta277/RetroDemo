import * as types from './actionTypes';  
import PromocodeApi from '../api/promoCodeAPI';
import { createNotification} from './../commonComponent/notificationbox/index';

export function PromocodeList(data) {

  return {
    type: types.GET_PROMOCODE_LIST, 
    data
  };
}

export function PromocodeListRes(data) {  
  return {
    type: types.GET_PROMOCODE_LIST_RES, 
    data
  };
}

export function getAllPromoCodeListing(data) {
  return function(dispatch) {
    PromocodeApi.getPromoCodeList(data).then(res => {
      dispatch(PromocodeListRes(res));
    }).catch(error => {
      console.log(error);
    });
  };
}

export function createpromocode(data) {
  return {
    type: types.CREATE_PROMOCODE, 
    data
  };
}

export function createpromocodeRes(data) {  
  return {
    type: types.CREATE_PROMOCODE_RES, 
    data
  };
}

export function submit_promocodes(data) {
  return function(dispatch) {
    PromocodeApi.createPromocodeData(data).then(res => {
      if(res.data){
        dispatch(createpromocodeRes(res));
        alert('Add Successfully')
        window.location.href="/promocodes"
      }
      if(res.errors){
          createNotification("error",res.errors[0].message);
      }
    }).catch(error => {
      console.log(error);
    });
  };
}
  
export function PromocodeDetail(id) {
  return {
    type: types.GET_PROMOCODE_DETAIL, 
    id
  };
}

export function PromocodeDetailRes(data) {  
  return {
    type: types.GET_PROMOCODE_DETAIL_RES, 
    data
  };
}

export function getPromocodeDetail(id) {
  return function(dispatch) {
    PromocodeApi.PromocodeDetail(id).then(res => {
      dispatch(PromocodeDetailRes(res));
    }).catch(error => {
      console.log(error);
    });
  };
}

export function doUpdatePromocode(data) {
  
    return {
      type: types.UPDATE_PROMOCODE, 
      data
    };
  }
  
  export function doUpdatePromocodeRes(data) {  
    return {
      type: types.UPDATE_PROMOCODE_RES, 
      data
    };
  }
  
  export function updatePromocodeData(data) {
    return function(dispatch) {
      PromocodeApi.doUpdatePromocode(data).then(res => {
        if(res.data){
          dispatch(doUpdatePromocodeRes(res));
          createNotification("success","Promocode update successfully");
        }
        if(res.errors){
            createNotification("error",res.errors[0].message);
        }
      }).catch(error => {
        console.log(error);
      });
    };
  }

  export function deletepromo(user) {
    return {
      type: types.DELETE_PROMOCODE, 
      user
    };
  }
  
  export function deletepromoRes(user) {  
    return {
      type: types.DELETE_PROMOCODE_RES, 
      user
    };
  }
  
  export function delete_Promocode(data) {
      return function(dispatch) {
        PromocodeApi.deletePromocode(data).then(user => {
          if(user.data){
            dispatch(deletepromoRes(user));
            window.location.href="/promocodes"
            createNotification("success","Delete Successfully");
          }
          if(user.errors){
              createNotification("error",user.errors[0].message);
          }
        }).catch(error => {
          console.log(error);
        });
      };
  }








