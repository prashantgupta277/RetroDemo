import * as types from './actionTypes';  
import editTemplateApi from '../api/editTemplateApi';
// import { submit_profile } from '../actions/editProfileActions';

export function getEditTemplate(user) {
  return {
    type: types.GET_TEMPLATE, 
    user
  };
}

export function getEditTemplateRes(user) {  
  return {
    type: types.GET_TEMPLATE_RES, 
    user
  };
}

export function submit_get_Template(data) {
    return function(dispatch) {
      editTemplateApi.getEditTemplate(data).then(user => {
        dispatch(getEditTemplateRes(user));
        // dispatch(submit_profile());     
      }).catch(error => {
        console.log(error);
      });
    };
}