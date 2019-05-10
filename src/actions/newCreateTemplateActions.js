import * as types from './actionTypes';  
import newCreateTemplateApi from '../api/newCreateTemplateAPI';
// import { submit_profile } from '../actions/editProfileActions';

export function doCreateNewTemp(data) {

  return {
    type: types.NEW_CREATE_TEMPLATE, 
    data
  };
}

export function doCreateNewTempRes(data) {  
  return {
    type: types.NEW_CREATE_TEMPLATE_RES, 
    data
  };
}

export function submit_CreateTemplate(data) {
    return function(dispatch) {
      newCreateTemplateApi.submit_newCreateTemplate(data).then(res => {
        dispatch(doCreateNewTempRes(res));
        // dispatch(submit_profile());     
      }).catch(error => {
        console.log(error);
      });
    };
}


