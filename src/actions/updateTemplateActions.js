import * as types from './actionTypes';  
import updateTemplateApi from '../api/updateTemplateApi';

export function updateEditTemplate(user) {

  return {
    type: types.UPDATE_TEMPLATE, 
    user
  };
}

export function updateEditTemplateRes(user) { 
  return {
    type: types.UPDATE_TEMPLATE_RES, 
    user
  };
}

export function submit_update_Template(data) {
    return function(dispatch) {
      updateTemplateApi.updateEditTemplate(data).then(user => {
        dispatch(updateEditTemplateRes(user));
        // dispatch(submit_profile());     
      }).catch(error => {
        console.log(error);
      });
    };
}