import * as types from './actionTypes';  
import templateApi from '../api/templateApi';
// import { submit_profile } from '../actions/editProfileActions';
import { createNotification} from './../commonComponent/notificationbox/index';


export function doTemplate(user) {
  return {
    type: types.DO_TEMPLATE, 
    user
  };
}

export function doTemplateRes(user) {  
  return {
    type: types.DO_TEMPLATE_RES, 
    user
  };
}

export function submit_Template(data) {
    return function(dispatch) {
      templateApi.doTemplate(data).then(user => {
        dispatch(doTemplateRes(user)); 
      }).catch(error => {
        console.log(error);
      });
    };
}


export function deleteTemplate(user) {
  return {
    type: types.DELETE_TEMPLATE, 
    user
  };
}

export function deleteTemplateRes(user) {  
  return {
    type: types.DELETE_TEMPLATE_RES, 
    user
  };
}

export function delete_Template(data) {
    return function(dispatch) {
      templateApi.deleteTemplate(data).then(user => {
        dispatch(deleteTemplateRes(user));
        window.location.href="/template"
      }).catch(error => {
        console.log(error);
      });
    };
}

export function createTemplate(user) {
  return {
    type: types.CREATE_TEMPLATE, 
    user
  };
}

export function createTemplateRes(user) {  
  return {
    type: types.CREATE_TEMPLATE_RES, 
    user
  };
}


export function submit_template(data) {
  return function(dispatch) {
    templateApi.createTemplateData(data).then(user => {
      dispatch(createTemplateRes(user));
      alert('Add Successfully')
      window.location.href="/template"
    }).catch(error => {
      console.log(error);
    });
  };
}




export function archiveTemplate(user) {
  return {
    type: types.ARCHIVE_TEMPLATE, 
    user
  };
}

export function archiveTemplateRes(user) {  
  return {
    type: types.ARCHIVE_TEMPLATE_RES, 
    user
  };
}


export function doArchiveTemplate(data) {
  return function(dispatch) {
    templateApi.archiveTemplate(data).then(user => {
      dispatch(archiveTemplateRes(user));
      if(user.data){
        window.location.href="/template"
      }
      if(user.errors){
        createNotification("error",user.errors[0].message);
      }
    }).catch(error => {
      console.log(error);
    });
  };
}