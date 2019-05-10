import * as types from './actionTypes';  
import PlanApi from '../api/planAPI';
import { createNotification} from './../commonComponent/notificationbox/index';

export function getPlanList(data) {
  return {
    type: types.GET_PLAN_LIST, 
    data
  };
}

export function getPlanListRes(data) {  
  return {
    type: types.GET_PLAN_LIST_RES, 
    data
  };
}

export function getAllPlanListing(data) {
  return function(dispatch) {
    PlanApi.getPlanList(data).then(res => {
      dispatch(getPlanListRes(res));
    }).catch(error => {
      console.log(error);
    });
  };
}

export function createplan(data) {
  return {
    type: types.CREATE_PLAN, 
    data
  };
}

export function createplanRes(data) {  
  return {
    type: types.CREATE_PLAN_RES, 
    data
  };
}


export function submit_plan(data) {
  return function(dispatch) {
    PlanApi.createPlanData(data).then(res => {
      if(res.data){
        dispatch(createplanRes(res));
        alert('Add Successfully')
        window.location.href="/plan"
      }
      if(res.errors){
          createNotification("error",res.errors[0].message);
      }
    }).catch(error => {
      console.log(error);
    });
  };
}
  
export function planDetail(id) {
  return {
    type: types.GET_PLAN_DETAIL, 
    id
  };
}

export function planDetailRes(data) {  
  return {
    type: types.GET_PLAN_DETAIL_RES, 
    data
  };
}

export function getPlanDetail(id) {
  return function(dispatch) {
    PlanApi.PlanDetail(id).then(res => {
      dispatch(planDetailRes(res));
    }).catch(error => {
      console.log(error);
    });
  };
}

export function doUpdatePlan(data) {
  
    return {
      type: types.UPDATE_PLAN, 
      data
    };
  }
  
  export function doUpdatePlanRes(data) {  
    return {
      type: types.UPDATE_PLAN_RES, 
      data
    };
  }
  
  export function updatePlanData(data) {
    return function(dispatch) {
      PlanApi.doUpdatePlan(data).then(res => {
       

        if(res.data){
          dispatch(doUpdatePlanRes(res));
          createNotification("success","Plan update successfully");
        }
        if(res.errors){
            createNotification("error",res.errors[0].message);
        }
      }).catch(error => {
        console.log(error);
      });
    };
  }


  export function deleteplan(user) {
    return {
      type: types.DELETE_PLAN, 
      user
    };
  }
  
  export function deleteplanRes(user) {  
    return {
      type: types.DELETE_PLAN_RES, 
      user
    };
  }
  
  export function delete_plan(data) {
      return function(dispatch) {
        PlanApi.deletePlan(data).then(user => {
          if(user.data){
            dispatch(deleteplanRes(user));
            window.location.href="/plan"
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





