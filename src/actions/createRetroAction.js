import * as types from './actionTypes';  
import createRetroApi from '../api/createRetroAPI';
// import { submit_profile } from '../actions/editProfileActions';
import { createNotification} from './../commonComponent/notificationbox/index';

export function doCreateRetro(data) {

  return {
    type: types.CREATE_RETRO, 
    data
  };
}

export function doCreateRetroRes(data) {  
  return {
    type: types.CREATE_RETRO_RES, 
    data
  };
}

export function getAllProjects(data) {

  return {
    type: types.All_RETRO_PROJECTS, 
    data
  };
}

export function getAllProjectsRes(data) {  
  return {
    type: types.All_RETRO_PROJECTS_RES, 
    data
  };
}


export function getAllSpecifictemplate(data) {

  return {
    type: types.All_SPECIFIC_TEMPLATES, 
    data
  };
}

export function getAllSpecifictemplateRes(data) {  
  return {
    type: types.All_SPECIFIC_TEMPLATES_RES, 
    data
  };
}

  

export function submit_CreteRetro(data) {
    return function(dispatch) {
      createRetroApi.submit_CreteRetro(data).then(res => {

        // if(res.data){
          dispatch(doCreateRetroRes(res));
        // }
        if(res.errors){
            createNotification("error",res.errors[0].message);
        }
         
      }).catch(error => {
        console.log(error);
      });
    };
}

export function getAllProject(data) {
  return function(dispatch) {
    createRetroApi.getAllProjects(data).then(res => {
      dispatch(getAllProjectsRes(res));
    }).catch(error => {
      console.log(error);
    });
  };
}

export function getSpecificTemplate(data) {
  return function(dispatch) {
    createRetroApi.getAllSpecifictemplate(data).then(res => {
      dispatch(getAllSpecifictemplateRes(res));
    }).catch(error => {
      console.log(error);
    });
  };
}

export function getAllMyTemplate(data) {
  return {
    type: types.All_MY_TEMPLATES, 
    data
  };
}

export function getAllMyTemplateRes(data) {  
  return {
    type: types.All_MY_TEMPLATES_RES, 
    data
  };
}



export function getMytemplate(data) {
  return function(dispatch) {
    createRetroApi.getAllMyTemplate(data).then(res => {
      dispatch(getAllMyTemplateRes(res));
    }).catch(error => {
      console.log(error);
    });
  };
}



export function deleteProject(data) {
  return {
    type: types.DELETE_PROJECT, 
    data
  };
}

export function deleteProjectRes(data) {  
  return {
    type: types.DELETE_PROJECT_RES, 
    data
  };
}



export function deleteSpecificProject(data) {
  return function(dispatch) {
    createRetroApi.deleteProject(data).then(res => {
      window.location.href="/projects";
      dispatch(deleteProjectRes(res));
    }).catch(error => {
      console.log(error);
    });
  };
}



