import * as types from './actionTypes';  
import superAdminTemplateApi from '../api/superAdminTemplateApi';
import { createNotification} from './../commonComponent/notificationbox/index';


export function doCustomTemplate(user) {
  return {
    type: types.GET_CUSTOM_TEMPLATE, 
    user
  };
}

export function doCustomTemplateRes(user) {  
  return {
    type: types.GET_CUSTOM_TEMPLATE_RES, 
    user
  };
}

export function submit_Custom_Template(data) {
    return function(dispatch) {
      superAdminTemplateApi.fetchCustomTemplate(data).then(user => {
        dispatch(doCustomTemplateRes(user)); 
      }).catch(error => {
        console.log(error);
      });
    };
}


export function deleteCustomTemplate(user) {
  return {
    type: types.DELETE_CUSTOM_TEMPLATE, 
    user
  };
}

export function deleteCustomTemplateRes(user) {  
  return {
    type: types.DELETE_CUSTOM_TEMPLATE_RES, 
    user
  };
}

export function delete_Custom_Template(data) {
    return function(dispatch) {
      superAdminTemplateApi.deleteCustomTemplate(data).then(user => {
        if(user.data){
          dispatch(deleteCustomTemplateRes(user));
          window.location.href="/super-admin-templates"
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

export function createcustomTemplate(user) {
  return {
    type: types.CREATE_CUSTOM_TEMPLATE, 
    user
  };
}

export function createcustomTemplateRes(user) {  
  return {
    type: types.CREATE_CUSTOM_TEMPLATE_RES, 
    user
  };
}


export function create_custom_template(data) {
  return function(dispatch) {
    superAdminTemplateApi.createCustomTemplateData(data).then(user => {
      if(user.data){
        dispatch(createcustomTemplateRes(user));
        alert('Add Successfully')
        window.location.href="/super-admin-templates"
        createNotification("success","Add Successfully");
      }
      if(user.errors){
          createNotification("error",user.errors[0].message);
      }
    }).catch(error => {
      console.log(error);
    });
  };
}

  export function getEditCustomTemplate(user) {
  
    return {
      type: types.GET_SINGLE_CUSTOM_TEMPLATE, 
      user
    };
  }
  
  export function getEditCustomTemplateRes(user) {  
    console.log(user)
    return {
      type: types.GET_SINGLE_CUSTOM_TEMPLATE_RES, 
      user
    };
  }
  
  export function submit_get_Template(data) {
      return function(dispatch) {
        superAdminTemplateApi.getEditTemplate(data).then(user => {
          if(user.data){
            dispatch(getEditCustomTemplateRes(user));
          }
          if(user.errors){
              createNotification("error",user.errors[0].message);
          }
        }).catch(error => {
          console.log(error);
        });
      };
  }

  export function updateEditCustomTemplate(user) {
    return {
      type: types.UPDATE_CUSTOM_TEMPLATE, 
      user
    };
  }
  
  export function updateEditCustomTemplateRes(user) {  
    console.log(user)
    return {
      type: types.UPDATE_CUSTOM_TEMPLATE_RES, 
      user
    };
  }
  
  export function submit_update_Template(data) {
      return function(dispatch) {
        superAdminTemplateApi.updateEditTemplate(data).then(user => {
          if(user.data){
            dispatch(updateEditCustomTemplateRes(user));
          }
          if(user.errors){
              createNotification("error",user.errors[0].message);
          } 
        }).catch(error => {
          console.log(error);
        });
      };
  }


export function getGlobalTemplate(user) {
  return {
    type: types.GET_GLOBAL_TEMPLATE, 
    user
  };
}

export function getGlobalTemplateRes(user) {  
  return {
    type: types.GET_GLOBAL_TEMPLATE_RES, 
    user
  };
}

export function submit_Global_Template(data) {
    return function(dispatch) {
      superAdminTemplateApi.fetchGlobalTemplate(data).then(user => {
        dispatch(getGlobalTemplateRes(user)); 
      }).catch(error => {
        console.log(error);
      });
    };
}

export function deleteGlobalTemplate(user) {
  return {
    type: types.DELETE_GLOBAL_TEMPLATE, 
    user
  };
}

export function deleteGlobalTemplateRes(user) {  
  return {
    type: types.DELETE_GLOBAL_TEMPLATE_RES, 
    user
  };
}

export function delete_Global_Template(data) {
    return function(dispatch) {
      superAdminTemplateApi.deleteGlobalTemplate(data).then(user => {
        
        console.log(user)
        // window.location.href="/super-admin-templates"
        if(user.data){
          dispatch(deleteGlobalTemplateRes(user));
          window.location.href="/super-admin-templates"
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

export function createGlobalTemplate(user) {
  return {
    type: types.CREATE_GLOBAL_TEMPLATE, 
    user
  };
}

export function createGlobalTemplateRes(user) {  
  return {
    type: types.CREATE_GLOBAL_TEMPLATE_RES, 
    user
  };
}


export function create_Global_template(data) {
  return function(dispatch) {
    superAdminTemplateApi.createGlobalTemplateData(data).then(user => {
      if(user.data){
        dispatch(createGlobalTemplateRes(user));
        alert('Add Successfully')
        window.location.href="/super-admin-templates"
        createNotification("success","Add Successfully");
      }
      if(user.errors){
          createNotification("error",user.errors[0].message);
      }
    }).catch(error => {
      console.log(error);
    });
  };
}

  export function getEditGlobalTemplate(user) {
    return {
      type: types.GET_SINGLE_GLOBAL_TEMPLATE, 
      user
    };
  }
  
  export function getEditGlobalTemplateRes(user) {  
    console.log(user)
    return {
      type: types.GET_SINGLE_GLOBAL_TEMPLATE_RES, 
      user
    };
  }
  
  export function submit_get_global_Template(data) {
    return function(dispatch) {
      superAdminTemplateApi.getEditGlobalTemplate(data).then(user => {
        if(user.data){
          dispatch(getEditGlobalTemplateRes(user));
        }
        if(user.errors){
            createNotification("error",user.errors[0].message);
        }
      }).catch(error => {
        console.log(error);
      });
    };
  }

  export function updateEditGlobalTemplate(user) {
    return {
      type: types.UPDATE_GLOBAL_TEMPLATE, 
      user
    };
  }
  
  export function updateEditGlobalTemplateRes(user) {  
    console.log(user)
    return {
      type: types.UPDATE_GLOBAL_TEMPLATE_RES, 
      user
    };
  }
  
  export function submit_update_global_Template(data) {
    return function(dispatch) {
      superAdminTemplateApi.updateEditGlobalTemplate(data).then(user => {
        if(user.data){
          dispatch(updateEditGlobalTemplateRes(user));
        }
        if(user.errors){
            createNotification("error",user.errors[0].message);
        } 
      }).catch(error => {
        console.log(error);
      });
    };
  }
